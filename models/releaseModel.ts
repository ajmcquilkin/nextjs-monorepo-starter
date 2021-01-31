import mongoose, { Schema, Model } from 'mongoose';
import { Release, ReleaseDocument } from 'types/release';

const releaseSchemaFields: Record<keyof Omit<Release, '_id'>, any> = {
  date: Number,
  subject: { type: String, default: '' },
  headerImage: { type: String, default: '' },
  imageCaption: { type: String, default: '' },
  quoteOfDay: { type: String, default: '' },
  quotedContext: { type: String, default: '' },
  featuredPost: { type: Schema.Types.ObjectId, ref: 'Post', default: '' },

  news: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  announcements: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Post' }],

  // ?? Maybe add lastedited Date?
};

const ReleaseSchema = new Schema(releaseSchemaFields);

const ReleaseModel: Model<ReleaseDocument> = mongoose.models.Release || mongoose.model<ReleaseDocument>('Release', ReleaseSchema);
export default ReleaseModel;
