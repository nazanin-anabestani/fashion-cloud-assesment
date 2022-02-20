import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CacheRepository} from '../repositories';
import {CacheResponse} from '../controllers/response/cache-response';

@injectable({scope: BindingScope.TRANSIENT})
export class CacheService {
  constructor(@repository(CacheRepository)
              public cacheRepository : CacheRepository) {}

  async getItem(key : string) {
    let {created, data} = await this.cacheRepository.getOrCreate(key)
    return {created : created, data : new CacheResponse(data.id, data.key, data.value, data.expirationDate)}
  }

  async getAllKeys() : Promise<string[]> {
    let data = await this.cacheRepository.getAllData()
    return data.map(cache =>  cache.key)
  }

  async addOrUpdate(key : string, value : string){
    let {created, data} = await this.cacheRepository.addOrUpdate(key, value)
    return {created : created, data : new CacheResponse(data.id, data.key, data.value, data.expirationDate)}
  }

  async remove(key? : string){
    await this.cacheRepository.remove(key)
  }
}
