import mongoose, { Schema, Model } from 'mongoose';
import { Post, PostDocument } from 'types/post';

// Reference: https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc
const postSchemaFields: Record<keyof Omit<Post, '_id'>, any> = {
  fromName: String,
  fromAddress: String,
  submitterNetId: String,

  type: String, // 'news' | 'announcement' | 'event'
  fullContent: String,
  briefContent: String,
  url: String,
  publishOrder: { type: Number, default: -1 },
  requestedPublicationDate: { type: Date, default: Date.now },
  recipientGroups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],

  status: { type: String, default: 'draft' }, // 'draft' | 'pending' | 'approved' | 'rejected' | 'published'
  dateItemCreated: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  reviewComment: { type: String, default: null }
};

const PostSchema = new Schema(postSchemaFields);

// Reference: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
const PostModel: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
