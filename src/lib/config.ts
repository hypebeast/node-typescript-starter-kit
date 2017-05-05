import * as config from 'config';

export interface IMongoConfiguration {
  host: string;
  port: number;
  dbName: string;
  user: string;
  password: string;
}

export function getMongoConfig(): IMongoConfiguration {
  return <IMongoConfiguration>config.get('mongo');
}
