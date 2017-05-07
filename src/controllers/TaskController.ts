import { NextFunction, Request, Response } from 'express';

import { Task } from '../models/task';
import { IMongoTask } from '../schemas/task';
import { BaseController } from './BaseController';

export class TaskController extends BaseController {
  /**
   * Creates an instance of TaskController.
   *
   * @memberof TaskController
   */
  constructor() {
    super();
  }

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   *
   * @memberof TaskController
   */
  public index(req: Request, res: Response, next: NextFunction): void {
    Task.FIND_ALL()
      .then(tasks => this.render(req, res, 'task/index', { tasks }))
      .catch(next);
  }

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   *
   * @memberof TaskController
   */
  public create(req: Request, res: Response, next: NextFunction): void {
    const mongoTask: IMongoTask = <IMongoTask>req.body;

    Task.CREATE(mongoTask)
      .then(task => Promise.all([Task.FIND_ALL(), task]))
      .then(([tasks]) => this.render(req, res, 'task/index', { tasks }))
      .catch(next);
  }

  public update(req: Request, res: Response, next: NextFunction): void {
    throw new Error('Method not implemented.');
  }

  public remove(req: Request, res: Response, next: NextFunction): void {
    throw new Error('Method not implemented.');
  }

  protected routes(): void {
    this.router.get('/', (req, res, next) => {
      new TaskController().index(req, res, next);
    });

    this.router.post('/', (req, res, next) => {
      new TaskController().create(req, res, next);
    });

    this.router.put('/:id', (req, res, next) => {
      new TaskController().update(req, res, next);
    });

    this.router.delete('/:id', (req, res, next) => {
      new TaskController().remove(req, res, next);
    });
  }
}
