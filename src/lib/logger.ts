import * as winston from 'winston';

const isDev = process.env.NODE_ENV === 'development';

const logger = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)(isDev ? {colorize: 'all'} : {})
    ]
});

export {logger};
