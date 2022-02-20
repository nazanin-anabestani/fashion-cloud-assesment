import {model, property} from '@loopback/repository';

@model()
export default class CreateCacheRequest {
  @property()
  value : string
}