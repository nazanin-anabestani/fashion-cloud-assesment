export const config = {
  name: 'mongodb',
  connector: 'mongodb',
  host: process.env.DATA_STORE_MONGODB_HOST ?? '127.0.0.1',
  port: process.env.DATA_STORE_MONGODB_PORT  ?? 27017,
  user: '',
  password: '',
  database: 'fashion_cloud',
  useNewUrlParser: true
};

