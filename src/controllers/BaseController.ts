import {Request, Response, Router} from 'express';

export abstract class BaseController {
  public router: Router;
  protected title: string;

  /**
   * Creates an instance of BaseController.
   *
   * @memberof BaseController
   */
  constructor() {
    this.router = Router();
    this.routes();
    this.title = 'node-typescript-starter-kit';
  }

  /**
   * Render a page.
   *
   * @param {Request} req The request object.
   * @param {Response} res The response object.
   * @param {string} view The view to render.
   * @param {Object} [options] Additional options
   *
   * @memberof BaseController
   */
  public render(req: Request, res: Response, view: string, options?: Object): void {
    res.locals.title = this.title;

    res.render(view, options);
  }

  /**
   * Setup routes for the controller.
   *
   * @protected
   * @abstract
   *
   * @memberof BaseController
   */
  protected abstract routes(): void;
}
