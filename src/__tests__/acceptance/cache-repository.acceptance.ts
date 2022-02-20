import {expect} from '@loopback/testlab';
import {FashionCloudApplication} from '../..';
import {setupApplication} from './test-helper';
import {givenEmbeddedDb, givenEmptyDatabase} from '../db/database-helper';
import {CacheRepository} from '../../repositories';

describe('Cache Repository Unit Tests', () => {
  let app: FashionCloudApplication;
  let cacheRepository : CacheRepository

  before('setupApplication', async () => {
    ({app,} = await setupApplication());
    cacheRepository = new CacheRepository(await givenEmbeddedDb())
  });

  beforeEach('setupApplication', async () => {
    (await givenEmptyDatabase())
  });

  after(async () => {
    await app.stop();
  });


  it('test addOrUpdate', async () => {
    const {created, data} = await cacheRepository.addOrUpdate("key1", "TestValue1")
    expect(created).to.not.false()
    expect(data).not.empty()
    expect(data.key).to.equal("key1")
    expect(data.value).to.equal("TestValue1")

    const newData = await cacheRepository.addOrUpdate("key1", "TestValue2")
    expect(newData.created).to.false()
    expect(newData.data.value).to.equal("TestValue2")

  });

  it('test getOrCreate', async () => {
    const {created, data} = await cacheRepository.getOrCreate("key1")
    expect(created).to.not.false()
    expect(data).not.empty()
    expect(data.key).to.equal("key1")
    expect(data.value).to.not.empty()

    const value = data.value
    const newData = await cacheRepository.getOrCreate("key1")
    expect(newData.created).to.false()
    expect(data.value).to.equal(value)

  });

  it('test removeAll', async () => {
    await cacheRepository.getOrCreate("key1")
    await cacheRepository.getOrCreate("key2")
    await cacheRepository.getOrCreate("key3")

    await cacheRepository.remove()
    const data = await cacheRepository.find()
    expect(data).empty()
  });

  it('test remove with key', async () => {
    await cacheRepository.getOrCreate("key1")

    await cacheRepository.remove("key1")
    const data = await cacheRepository.find({where : {key : "key1"}})
    expect(data).empty()
  });

});
