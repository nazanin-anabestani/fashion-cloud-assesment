import {CacheRepository} from '../../repositories';
import {MongodbDataSource} from '../../datasources';
import {MongoMemoryServer} from 'mongodb-memory-server';

export async function givenEmptyDatabase() {

  const cacheRepository = new CacheRepository(await givenEmbeddedDb());
  await cacheRepository.deleteAll();
}

export async function givenEmbeddedDb(){
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const config = {
    name: 'mongodb',
    connector: 'mongodb',
    uri : uri,
    user: '',
    password: '',
    database: 'fashion_cloud',
    useNewUrlParser: true
  };
  return new MongodbDataSource(config)

}