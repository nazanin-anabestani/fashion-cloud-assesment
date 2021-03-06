import {del, get, param, post, requestBody, response, Response, RestBindings} from '@loopback/rest';
import {CacheService} from '../services';
import {inject, service} from '@loopback/core';
import CreateCacheRequest from './request/create-cache-request';
import {CacheResponse} from './response/cache-response';

export class CacheController {

  constructor(
    @inject(RestBindings.Http.RESPONSE) private res: Response,
    @service(CacheService) private cacheService : CacheService,
  ) {}

  @post('/caches/{key}')
  async addOrUpdate(
    @param.path.string('key') key: string,
    @requestBody(CreateCacheRequest) request : CreateCacheRequest
  ): Promise<CacheResponse> {
    const {created, data } = await this.cacheService.addOrUpdate(key, request.value);
    if (created)
      this.res.status(201)
    return data
  }

  @get('/caches')
  async getAll(
  ): Promise<string[]> {
    return this.cacheService.getAllKeys()
  }


  @get('/caches/{key}')
  async findByKey(
    @param.path.string('key') key: string,
  ): Promise<CacheResponse> {
    const {created, data } = await this.cacheService.getItem(key)
    if (created)
      this.res.status(201)
    return data
  }


  @del('/caches/{key}')
  @response(204)
  async deleteByKey(@param.path.string('key') key: string): Promise<void> {
    await this.cacheService.remove(key)
  }

  @del('/caches')
  @response(204)
  async deleteAll(): Promise<void> {
    await this.cacheService.remove()
  }

}
