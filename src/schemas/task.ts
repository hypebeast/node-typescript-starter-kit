import * as mongoose from 'mongoose';

export interface IMongoTask extends mongoose.Document {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  completed: Boolean,
}, {
  timestamps: true,
});

// taskSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

export const taskModel: mongoose.Model<IMongoTask> = mongoose.model<IMongoTask>('Task', taskSchema);
