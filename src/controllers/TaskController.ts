import { NextFunction, Request, Response } from 'express';

import { ITask, Task } from '../models/task';
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

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   *
   * @memberof TaskController
   */
  public getEdit(req: Request, res: Response, next: NextFunction): void {
    const id: string = req.params.id;

    Task.FIND_BY_ID(id)
      .then(task => this.render(req, res, 'task/edit', { task }))
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
  public postEdit(req: Request, res: Response, next: NextFunction): void {
    const id: string = req.params.id;
    const task: ITask = <ITask>req.body;
    task.id = id;

    Task.UPDATE(task)
      .then(() => res.redirect('/task'))
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
  public remove(req: Request, res: Response, next: NextFunction): void {
    const id: string = req.params.id;

    Task.REMOVE(id)
      .then(() => res.redirect('/task'))
      .catch(next);
  }

  protected routes(): void {
    this.router.get('/', (req, res, next) => {
      new TaskController().index(req, res, next);
    });

    this.router.post('/', (req, res, next) => {
      new TaskController().create(req, res, next);
    });

    this.router.get('/:id/edit', (req, res, next) => {
      new TaskController().getEdit(req, res, next);
    });

    this.router.post('/:id/edit', (req, res, next) => {
      new TaskController().postEdit(req, res, next);
    });

    this.router.post('/:id/delete', (req, res, next) => {
      new TaskController().remove(req, res, next);
    });
  }
}
