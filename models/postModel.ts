import mongoose, { Schema, Model } from 'mongoose';
import { Post, PostDocument } from 'types/post';

// Reference: https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc
const postSchemaFields: Record<keyof Omit<Post, '_id'>, any> = {
  type: { type: String, required: true }, // 'news' | 'announcement' | 'event'
  requestedPublicationDate: { type: Number, required: true },
  submitterNetId: { type: String, required: true },

  fromName: { type: String, default: '' },
  fromAddress: { type: String, default: '' },
  fullContent: { type: String, default: '' },
  briefContent: { type: String, default: '' },
  url: { type: String, default: '' },
  recipientGroups: { type: [String], default: [] },
  featuredImage: { type: String, default: '' },
  eventDate: { type: Number, default: null },

  status: { type: String, default: 'draft' }, // 'draft' | 'pending' | 'approved' | 'rejected' | 'published'
  dateItemCreated: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },

  rejectionComment: { type: String, default: null },
  rejectionReason: { type: String, default: null }
};

const PostSchema = new Schema(postSchemaFields);

// Reference: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js
const PostModel: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
