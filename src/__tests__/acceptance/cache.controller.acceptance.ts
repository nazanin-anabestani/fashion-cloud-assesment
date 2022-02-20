import {Client, expect} from '@loopback/testlab';
import {FashionCloudApplication} from '../..';
import {setupApplication} from './test-helper';
import {givenEmptyDatabase} from '../db/database-helper';

describe('CacheController Integration Tests', () => {
  let app: FashionCloudApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  beforeEach('setupApplication', async () => {
    (await givenEmptyDatabase());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /caches', async () => {
    const res = await client.post('/caches/key1')
      .send({value : "TestValue"})
      .expect(201);
    expect(res.body).to.containEql({key: 'key1', value : "TestValue"});
    expect(res.body.id).to.not.empty();

    const id = res.body.id;
    const res2 = await client.post('/caches/key1')
      .send({value : "TestValue"})
      .expect(200);
    expect(res2.body.id).to.equal(id);

  });

  it('invokes GET /caches/{key}', async () => {
    const res = await client.get('/caches/key1')
      .expect(201);
    expect(res.body).to.containEql({key: 'key1'});
    expect(res.body.id).to.not.empty();

    const value = res.body.value;
    const res2 = await client.get('/caches/key1')
      .expect(200);
    console.log(res2.body.value)
    expect(res2.body.value).to.equal(value);

  });

  it('invokes GET /caches', async () => {
    await client.post('/caches/key1')
      .send({value : "TestValue"})
    await client.post('/caches/key2')
      .send({value : "TestValue2"})
    await client.post('/caches/key3')
      .send({value : "TestValue3"})

    const res = await client.get('/caches')
      .expect(200);
    expect(res.body.length).to.equal(3)

  });

  it('invokes DELETE /caches', async () => {
    await client.post('/caches/key1')
      .send({value : "TestValue"})
    await client.post('/caches/key2')
      .send({value : "TestValue2"})
    await client.post('/caches/key3')
      .send({value : "TestValue3"})

    await client.del('/caches')
      .expect(204);
  });


  it('invokes DELETE /caches/{key}', async () => {
    await client.post('/caches/key1')
      .send({value : "TestValue"})

    await client.del('/caches/key1')
      .expect(204);
  });

});