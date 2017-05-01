import * as winston from 'winston';

const isDev: boolean = process.env.NODE_ENV === 'development';

const logger: winston.LoggerInstance = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)(isDev ? {colorize: 'all'} : {}),
    ],
});

export {logger};
