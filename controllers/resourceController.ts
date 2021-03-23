import { Types } from 'mongoose';

import { BaseError, DocumentNotFoundError } from 'errors';
import { ResourceModel } from 'models';

import { Resource, EditableResource, ResourceDocument } from 'types/resource';

export const create = async (fields: EditableResource): Promise<ResourceDocument> => {
  const { content, link } = fields;

  const resource = new ResourceModel();

  resource.content = content;
  resource.link = link;
  resource.dateItemCreated = new Date();
  resource.lastEdited = new Date();

  return resource.save();
};

export const read = async (id: string): Promise<ResourceDocument> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundResource: ResourceDocument = await ResourceModel.findOne({ _id: id });
  if (!foundResource) throw new DocumentNotFoundError(id);
  return foundResource;
};

export const update = async (id: string, fields: EditableResource): Promise<ResourceDocument> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const { content, link } = fields;

  const foundResource: ResourceDocument = await ResourceModel.findOne({ _id: id });
  if (!foundResource) throw new DocumentNotFoundError(id);

  if (content) foundResource.content = content;
  if (link !== undefined) foundResource.link = link;

  foundResource.lastEdited = new Date();
  return foundResource.save();
};

export const remove = async (id: string): Promise<void> => {
  if (!Types.ObjectId.isValid(id)) throw new BaseError(`Passed id "${id}" is not a valid ObjectId`, 400);

  const foundResource: ResourceDocument = await ResourceModel.findOne({ _id: id });
  if (!foundResource) throw new DocumentNotFoundError(id);
  return foundResource.remove();
};

/* Other functionality-specific controllers here */
