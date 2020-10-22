import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  submitter_netid: String,
  from_name: String,
  subject: String,
  from_address: String,
  brief_content: String,
  full_content: String,
  type: String,
  url: String,
  requested_publication_date: { type: Date, default: Date.now() },
  recipient_groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  status: { type: String, default: 'draft' },
  date_item_created: { type: Date, default: Date.now() },
});

const ItemModel = mongoose.model('Item', ItemSchema);

export default ItemModel;
