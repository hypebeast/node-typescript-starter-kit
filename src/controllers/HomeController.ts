import {NextFunction, Request, Response} from 'express';

import {BaseController} from './BaseController';

/**
 * Home Controller.
 *
 * @class HomeController
 * @extends {BaseController}
 */
export class HomeController extends BaseController {
  /**
   * Creates an instance of HomeController.
   *
   * @memberof HomeController
   */
  constructor() {
    super();
  }

  /**
   * Home page controller.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   *
   * @memberof HomeController
   */
  public home(req: Request, res: Response, next: NextFunction): void {
    this.title = 'Home';
    this.render(req, res, 'home');
  }

  protected routes(): void {
    this.router.get('/', (req, res, next) => {
      new HomeController().home(req, res, next);
    });
  }
}
