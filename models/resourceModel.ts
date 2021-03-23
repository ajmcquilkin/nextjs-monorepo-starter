import mongoose, { Schema, Model } from 'mongoose';
import { Resource, ResourceDocument } from 'types/resource';

// TODO: Check dates for validity
const resourceSchemaFields: Record<keyof Omit<Resource, '_id'>, any> = {
  content: { type: String, required: true, default: '' },
  link: { type: String, default: null },
  dateItemCreated: { type: Date, default: new Date() },
  lastEdited: { type: Date, default: new Date() }
};

const ResourceSchema = new Schema(resourceSchemaFields);

const ResourceModel: Model<ResourceDocument> = mongoose.models.Resource || mongoose.model<ResourceDocument>('Resource', ResourceSchema);
export default ResourceModel;
