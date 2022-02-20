import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cache} from '../models';

const TTL = 12;
const LIMIT = 100;

export class CacheRepository extends DefaultCrudRepository<
  Cache,
  typeof Cache.prototype.id
  > {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Cache, dataSource);
  }

  async addOrUpdate(key: string, value: string) {
    let created = false
    let cache = await this.findOne({where: {key: key}})
    if (!cache) {
      this.removeOldestIfNeeded()
      cache = new Cache()
      cache.key = key
      created = true
    }
    cache.value = value
    cache.expirationDate = new Date(new Date().getTime() + TTL)
    let toRet = await this.save(cache)
    return {created : created, data : toRet}
  }

  async getOrCreate(key : string){
    let created = false
    let cache = await this.findOne({where : {key : key}})
    if (!cache) {
      console.log("Cache Miss")
      this.removeOldestIfNeeded()
      cache = new Cache()
      cache.key = key
      cache.value = Buffer.from(Math.random().toString()).toString("base64").substring(0, 24)
      created = true
    }
    else console.log("Cache Hit")
    cache.expirationDate = new Date(new Date().getTime() + TTL)
    return {created : created, data : await this.save(cache)}
  }

  async getAllData(){
    return await this.find()
  }

  async remove(key? : string){
    if (key)
      await this.deleteAll({key : key})
    else await this.deleteAll()
  }

  async removeOldestIfNeeded(){
    let count = (await this.count()).count
    if (count >= LIMIT) {
      let toDelete = await this.find({order: ['expirationDate ASC'], limit: 1})
      await this.delete(toDelete[0])
    }
  }
}
