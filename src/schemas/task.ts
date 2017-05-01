import * as mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const taskSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  completed: Boolean,
}, {
  timestamps: true,
});

// tslint:disable-next-line:variable-name
export const TaskSchemaModel: mongoose.Model<ITask> = mongoose.model<ITask>('Task', taskSchema);
