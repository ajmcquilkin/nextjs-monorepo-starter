interface Post {
  fromName: string,
  subject: string,
  submitterNetId: string,

  postType: string,
  fullContent: string,
  briefContent: string,
  url: string,
  requestedPublicationDate: Date,
  recipientGroups: string[],

  publishOrder: number,
  postStatus: string,
  dateItemCreated: Date,
  lastEdited: Date,
  reviewComment: string
}

export default Post;
