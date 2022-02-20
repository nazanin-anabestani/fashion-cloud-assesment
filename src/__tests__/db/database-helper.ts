import {CacheRepository} from '../../repositories';
import {MongodbDataSource} from '../../datasources';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function givenEmptyDatabase() {
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

  const cacheRepository = new CacheRepository(new MongodbDataSource(config));
  await cacheRepository.deleteAll();
}