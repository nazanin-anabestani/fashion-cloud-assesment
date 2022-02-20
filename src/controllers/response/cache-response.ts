
export class CacheResponse {
  id : string
  key : string
  value : string
  expirationDate : Date


  constructor(id: string, key: string, value: string, expirationDate: Date) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.expirationDate = expirationDate;
  }
}