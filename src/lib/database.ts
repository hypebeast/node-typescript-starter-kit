import * as mongoose from 'mongoose';

import { getMongoConfig, IMongoConfiguration } from './config';
import { logger as log } from './logger';

export function init(): void {
  const databaseConfig: IMongoConfiguration = getMongoConfig();
  const credentials: string = (databaseConfig.user && databaseConfig.password)
                        ? `${databaseConfig.user}:${databaseConfig.password}`
                        : '';
  const connectionString: string = `mongodb://${credentials}@${databaseConfig.host}/${databaseConfig.dbName}`;

  // tslint:disable-next-line:no-any
  (<any>mongoose).Promise = Promise;
  mongoose.connect(connectionString);

  let mongoDb: mongoose.Connection = mongoose.connection;

  mongoDb.on('error', () => {
    log.error(`Unable to connect to database: ${connectionString}`);
  });

  mongoDb.once('open', () => {
    log.info(`Connected to database: ${connectionString}`);
  });
}
