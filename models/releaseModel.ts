import mongoose, { Schema, Model } from 'mongoose';
import { Release, ReleaseDocument } from 'types/release';

const releaseSchemaFields: Record<keyof Omit<Release, '_id'>, any> = {
  date: { type: Number, required: true, unique: true },

  subject: { type: String, default: '' },
  headerImage: { type: String, default: '' },
  headerImageCaption: { type: String, default: '' },
  headerImageAlt: { type: String, default: '' },

  quoteOfDay: { type: String, default: '' },
  quotedContext: { type: String, default: '' },
  featuredPost: { type: Schema.Types.ObjectId, ref: 'Post', default: null },

  news: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  announcements: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Post' }],

  lastEdited: { type: Date, default: Date.now }
};

const ReleaseSchema = new Schema(releaseSchemaFields);

ReleaseSchema.index({ date: -1 });
ReleaseSchema.on('index', (error) => console.error(error.message));

const ReleaseModel: Model<ReleaseDocument> = mongoose.models.Release || mongoose.model<ReleaseDocument>('Release', ReleaseSchema);
export default ReleaseModel;
