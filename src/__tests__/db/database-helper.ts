import {CacheRepository} from '../../repositories';
import {config} from './mongodb.config';
import {MongodbDataSource} from '../../datasources';

export async function givenEmptyDatabase() {
  const cacheRepository = new CacheRepository(new MongodbDataSource(config));
  await cacheRepository.deleteAll();
}