import { IMongoTask, taskModel } from '../schemas/task';

export interface ITask {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Task implements ITask {
  private document: IMongoTask;

  constructor(task: IMongoTask) {
    this.document = task;
  }

  get id(): string {
    return this.document._id;
  }

  get name(): string {
    return this.document.name;
  }

  get completed(): boolean {
    return this.document.completed;
  }

  get createdAt(): Date {
    return this.document.createdAt;
  }

  get updatedAt(): Date {
    return this.document.updatedAt;
  }

  public static CREATE(task: IMongoTask): Promise<ITask> {
    return taskModel.create(task)
      .then((mongoTask) => {
        return new Task(mongoTask);
      });
  }

  public static FIND_ALL(): Promise<ITask[]> {
    return taskModel.find()
      .then(mongoTasks => {
        return mongoTasks.map(mongoTask => new Task(mongoTask));
      });
  }

  public static FIND_BY_ID(): Promise<ITask> {
    throw new Error('not implemented');
  }
}
