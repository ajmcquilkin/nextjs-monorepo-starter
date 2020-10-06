import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: { type: String, default: 'Untitled' },
  description: { type: String, default: '' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
});

const GroupModel = mongoose.model('Group', GroupSchema);

export default GroupModel;
