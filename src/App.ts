import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';


class App {
  public express: express.Express;

  constructor(env: string) {
    let isDev: boolean = env === 'dev';

    this.express = express();

    this.middleware(isDev);
    this.routes();
    this.errorHandlers(isDev);
  }

  /**
   * Setup Express middlewares.
   *
   * @private
   * @param {string} env
   *
   * @memberOf App
   */
  private middleware(isDev: boolean): void {
    const loggerFormat: string = isDev ? 'dev' : 'common';

    this.express.use(logger(loggerFormat));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /**
   * Setup application routes.
   *
   * @private
   *
   * @memberOf App
   */
  private routes(): void {
    this.express.use('/', (req, res) => {
      res.send("Hello, World!");
    });

    // this.express.use('/', HomeController);
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
      this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(error['status'] || 500);
        res.send({
          message: error.message,
          error
        });
      });
    }

    // Show no stack traces in production
    this.express.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(error['status'] || 500);
        res.send({
          message: error.message,
          error: {}
        });

        return null;
    });
  }
}

export default App;
