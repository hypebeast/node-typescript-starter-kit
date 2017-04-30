import * as http from 'http';

import {App} from './App';
import {logger as log} from './lib/logger';

const port: number|string|boolean = normalizePort(process.env.PORT || 3000);
const env: string = process.env.NODE_ENV || 'development';
const app: App = new App(env);

const server: http.Server = http.createServer(app.express);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {*} val
 * @returns {(number|string|boolean)}
 */
function normalizePort(val: number|string): number|string|boolean {
  let serverPort: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (isNaN(serverPort)) {
    return val;
  }

  if (serverPort >= 0) {
    return serverPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {any} err
 */
function onError(err: {syscall: string, code: string}): void {
  if (err.syscall !== 'listen') {
    throw err;
  }

  let bind: string = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (err.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw err;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 *
 */
function onListening(): void {
  let addr: string|{port: number} = server.address();
  let bind: string = typeof addr === 'string'
    ? `pipe ${addr}`
    : `${addr.port}`;

  log.info(`Listening on ${bind}`);
}
