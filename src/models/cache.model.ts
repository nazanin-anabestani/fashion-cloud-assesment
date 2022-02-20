import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Cache extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }
  })
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'date',
    required: true,
    index: {
      expireAfterSeconds : 0
    }
  })
  expirationDate: Date;

}
