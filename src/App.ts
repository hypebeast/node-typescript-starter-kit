import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import { HomeController } from './controllers/HomeController';
import { TaskController } from './controllers/TaskController';
import * as database from './lib/database';
import { logger as log } from './lib/logger';

export class App {
  public express: express.Application;

  private homeController: HomeController;
  private taskController: TaskController;

  constructor(env: string) {
    let isDev: boolean = (env === 'development');

    // Initialize database
    database.init();

    // Create express app and create all controllers
    this.express = express();
    this.homeController = new HomeController();
    this.taskController = new TaskController();

    this.middleware(isDev);
    this.routes();
    this.errorHandlers(isDev);
  }

  /**
   * Setup Express middlewares.
   *
   * @private
   * @param {boolean} isDev
   *
   * @memberOf App
   */
  private middleware(isDev: boolean): void {
    const loggerFormat: string = isDev ? 'dev' : 'common';

    this.express.use(logger(loggerFormat));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

    // Configure pug
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.set('view engine', 'pug');

    // Serve static files from "public"
    this.express.use('/static', express.static(path.join(__dirname, 'public')));
  }

  /**
   * Setup application routes.
   *
   * @private
   *
   * @memberOf App
   */
  private routes(): void {
    this.express.use('/', this.homeController.router);
    this.express.use('/task', this.taskController.router);
  }

  /**
   * Final error handlers.
   *
   * @private
   * @param {boolean} isDev
   *
   * @memberOf App
   */
  private errorHandlers(isDev: boolean): void {
    if (isDev) {
      // tslint:disable-next-line:no-any
      this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        log.error(error.stack);
        res.status(error.status || 500);
        res.send({
          message: error.message,
          error,
        });
      });
    }

    // Show no stack traces in production
    // tslint:disable-next-line:no-any
    this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        log.error(error.stack);
        res.status(error.status || 500);
        res.send({
          message: error.message,
          error: {},
        });

        return null;
    });
  }
}
