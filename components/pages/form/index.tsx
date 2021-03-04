/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { validate } from 'email-validator';

import { EditorState, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML, Options as DraftJSExportOptions } from 'draft-js-export-html';

import SkeletonArea from 'components/helpers/skeletonArea';
import GenericSkeletonWrapper from 'components/helpers/genericSkeletonWrapper';

import FormSection from 'components/form/formSection';
import ContentLength from 'components/form/contentLength';
import RadioSelector from 'components/form/radioSelector';
import RichTextEditor from 'components/form/richTextEditor';
import FormGroup from 'components/layout/formGroup';

import {
  openModal as openModalImport
} from 'store/actionCreators/modalActionCreators';

import {
  createPost as createPostImport,
  fetchPostById as fetchPostByIdImport,
  updatePostById as updatePostByIdImport,
  deletePostById as deletePostByIdImport,
} from 'store/actionCreators/postActionCreators';

import {
  setError as setErrorImport
} from 'store/actionCreators/requestActionCreators';

import {
  maxContentLength, addNDays, isValidUrl, maxFileSize,
  handleEncodeDate, handleDecodeDate, handleEncodeTime, handleDecodeTime,
  encodeRecipientGroups, decodeRecipientGroups
} from 'utils';
import uploadImage from 'utils/s3';

import { HTML } from 'types/email';
import { Group } from 'types/group';
import { Post, PostStatus } from 'types/post';
import { ConnectedThunkCreator, GlobalDispatch } from 'types/state';

import styles from './form.module.scss';

export interface FormPassedProps {
  id: string,
}

export interface FormStateProps {
  groups: Group[],
  postIsLoading: boolean,
  postErrorMessage: string,

  post: Post | null,
  isAuthenticated: boolean,
  netId: string,
  isReviewer: boolean,
}

export interface FormDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  fetchPostById: ConnectedThunkCreator<typeof fetchPostByIdImport>,
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>,
  deletePostById: ConnectedThunkCreator<typeof deletePostByIdImport>,

  openModal: ConnectedThunkCreator<typeof openModalImport>,
  setError: ConnectedThunkCreator<typeof setErrorImport>
}

export type FormProps = FormPassedProps & FormStateProps & FormDispatchProps;

const exportOptions: DraftJSExportOptions = {
  inlineStyles: { BOLD: { element: 'b' } }
};

const Form = ({
  groups, postIsLoading,
  id, post, netId, isReviewer,
  fetchPostById, updatePostById, openModal,
}: FormProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch<GlobalDispatch>();

  const [fromName, setFromName] = useState<Post['fromName']>('');
  const [fromAddress, setFromAddress] = useState<Post['fromAddress']>('');
  const [requestedPublicationDate, setRequestedPublicationDate] = useState<Post['requestedPublicationDate']>(addNDays(Date.now(), 1));
  const [postType, setPostType] = useState<Post['type']>('announcement');

  const [briefContent, setBriefContent] = useState<Post['briefContent']>('');
  const [url, setUrl] = useState<Post['url']>('');

  const [featuredImage, setFeaturedImage] = useState<Post['featuredImage']>('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState<Post['featuredImageAlt']>('');
  const [eventDate, setEventDate] = useState<Post['eventDate']>(null);
  const [eventTime, setEventTime] = useState<Post['eventTime']>(null);

  const [recipientGroups, setRecipientGroups] = useState<Record<Group['name'], boolean>>({});
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  // * Required fields
  const [fromNameError, setFromNameError] = useState<string>('');
  const [fromAddressError, setFromAddressError] = useState<string>(''); // validated
  const [requestedPublicationDateError, setRequestedPublicationDateError] = useState<string>(''); // validated
  const [briefContentError, setBriefContentError] = useState<string>('');

  const [eventDateError, setEventDateError] = useState<string>(''); // validated
  const [eventTimeError, setEventTimeError] = useState<string>('');

  // * Validated fields
  const [fullContentError, setFullContentError] = useState<string>(''); // length
  const [featuredImageError, setFeaturedImageError] = useState<string>(''); // size
  const [featuredImageAltError, setFeaturedImageAltError] = useState<string>(''); // exists
  const [urlError, setUrlError] = useState<string>(''); // valid or nonexistant

  useEffect(() => { if (id !== 'new') fetchPostById(id); }, []);
  useEffect(() => { setEditorState(EditorState.createWithContent(ContentState.createFromText(''))); }, []);

  useEffect(() => {
    setFromName(post?.fromName || '');
    setFromAddress(post?.fromAddress || '');
    setRequestedPublicationDate(post?.requestedPublicationDate || addNDays(Date.now(), 1));

    setPostType(post?.type || 'announcement');
    setBriefContent(post?.briefContent || '');
    setUrl(post?.url || '');

    setFeaturedImage(post?.featuredImage || '');
    setFeaturedImageAlt(post?.featuredImageAlt || '');
    setEventDate(post?.eventDate || null);
    setEventTime(post?.eventTime ?? 0);

    setRecipientGroups(post?.recipientGroups ? encodeRecipientGroups(post.recipientGroups) : {});
    setEditorState(post?.fullContent ? EditorState.createWithContent(stateFromHTML(post.fullContent)) : EditorState.createEmpty());
  }, [post]);

  const getFullContent = (state: EditorState): HTML => stateToHTML(state.getCurrentContent(), exportOptions);

  const clearErrors = () => {
    setFromNameError('');
    setFromAddressError('');
    setRequestedPublicationDateError('');
    setBriefContentError('');

    setEventDateError('');
    setEventTimeError('');

    setFullContentError('');
    setFeaturedImageError('');
    setFeaturedImageAltError('');
    setUrlError('');
  };

  const submissionIsValid = (state: EditorState): boolean => {
    let isValid = true;
    const plainContent = state.getCurrentContent().getPlainText();

    if (!fromName) {
      setFromNameError('"From Name" is a required field');
      isValid = false;
    }

    if (!fromAddress) {
      setFromAddressError('"From Address" is a required field');
      isValid = false;
    }

    if (fromAddress && !validate(fromAddress)) {
      setFromAddressError(`"${fromAddress}" is not a valid email`);
      isValid = false;
    }

    if (requestedPublicationDate < addNDays(Date.now(), 1)) {
      setRequestedPublicationDateError('Publication date must be at least one day in the future');
      isValid = false;
    }

    if (plainContent.length > maxContentLength) {
      setFullContentError(`Content has a max length of ${maxContentLength} characters, current length is ${plainContent.length} characters`);
      isValid = false;
    }

    if (!briefContent) {
      setBriefContentError('Brief content is a required field');
      isValid = false;
    }

    if (briefContent.length > 50) {
      setBriefContentError(`Headline has a max length of 50 characters, current length is ${briefContent.length} characters`);
      isValid = false;
    }

    if (url && !isValidUrl(url)) {
      setUrlError(`"${url}" is not a valid url`);
      isValid = false;
    }

    if (postType === 'event') {
      if ((eventDate ?? 0) < addNDays(Date.now(), 1)) {
        setEventDateError('Event date must be at least one day in the future');
        isValid = false;
      }

      if (eventTime == null) {
        setEventTimeError('Event time is a required field');
        isValid = false;
      }
    }

    if (featuredImage) {
      if (featuredImageAlt.length > 50) {
        setFeaturedImageAltError(`Featured image description has a max length of 50 characters, current length is ${featuredImageAlt.length} characters`);
        isValid = false;
      }

      if (!featuredImageAlt) {
        setFeaturedImageAltError('Featured image description is a required field');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleUpdate = (status: PostStatus) => (): void => {
    if (!submissionIsValid(editorState)) return;
    clearErrors();

    const payload = {
      fromName,
      fromAddress,
      requestedPublicationDate,
      fullContent: getFullContent(editorState),
      briefContent,

      type: postType,
      url,
      status,

      featuredImage,
      featuredImageAlt,
      eventDate,
      eventTime,

      submitterNetId: netId,
      recipientGroups: decodeRecipientGroups(recipientGroups),
    };

    dispatch({
      type: 'FETCH_POST',
      status: 'SUCCESS',
      payload: { data: { post: { _id: post?._id || 'form', ...payload } as Post } }
    });

    openModal('SUBMIT_POST_MODAL', { postId: post?._id || 'form', action: post?._id ? 'UPDATE' : 'CREATE' });
  };

  const handleDiscard = () => {
    openModal('DISCARD_POST_MODAL', { postId: post?._id || 'form', action: 'DELETE' });
  };

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) throw new Error('file not found');

    if (file.size > maxFileSize) {
      setFeaturedImageError(`File size too large (${file.size / 1024 / 1024}MB > 5MB)`);
    } else {
      try {
        setImageUploading(true);
        const imageURL = await uploadImage(file);
        setImageUploading(false);
        setFeaturedImage(imageURL);
        if (post) { updatePostById(post._id, { featuredImage: imageURL }); }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <SkeletonArea isLoading={postIsLoading}>
        <div className={styles.titleContainer}>
          <button type="button" onClick={() => router.push('/submissions')}>
            <img src="/icons/left.svg" alt="back to submissions" />
            <p>Submissions</p>
          </button>

          <h1>{post ? 'Edit Submission' : 'New Submission'}</h1>
          <p>
            View Vox Submission Guidelines
            {' '}
            <Link href="https://communications.dartmouth.edu/faculty-and-staff/vox-daily-guidelines"><a>here</a></Link>
            .
          </p>
        </div>

        <form>
          <FormSection title="Sender Information">
            <div className={styles.formInputContainer}>
              <label className={styles.large}>
                <p>
                  From Name
                  {' '}
                  <span className={styles.required}>*</span>
                </p>

                <GenericSkeletonWrapper>
                  <input
                    placeholder="Type department or division name here"
                    required
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                  />

                </GenericSkeletonWrapper>
              </label>

              <p className={styles.formInputError}>{fromNameError}</p>
            </div>

            <div className={styles.formInputContainer}>
              <label className={styles.large}>
                <p>
                  From Address
                  {' '}
                  <span className={styles.required}>*</span>
                </p>

                <GenericSkeletonWrapper>
                  <input
                    placeholder="Type email of sending individual or department"
                    required
                    type="email"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                  />
                </GenericSkeletonWrapper>
              </label>

              <p className={styles.formInputError}>{fromAddressError}</p>
            </div>
          </FormSection>

          <FormSection title="Recipient Information">
            <div className={styles.formInputContainer}>
              <div className={[styles.label, styles.large].join(' ')}>
                <p>To</p>
              </div>

              <GenericSkeletonWrapper>
                <ul className={styles.formGroupListContainer}>
                  {groups.map((group) => (
                    <li key={group.name} className={styles.formGroupList}>
                      <FormGroup
                        group={group}
                        headerDepth={3}
                        selectedElements={recipientGroups}
                        setSelectedState={(groupName, newState) => setRecipientGroups({ ...recipientGroups, [groupName]: newState })}
                      />
                    </li>
                  ))}
                </ul>
              </GenericSkeletonWrapper>
            </div>
          </FormSection>

          <FormSection title="Post Information">
            <div className={styles.formInputContainer}>
              <label className={styles.large}>
                <p>
                  Select Publish Date
                  {' '}
                  <span className={styles.required}>*</span>
                </p>

                <GenericSkeletonWrapper>
                  <input
                    type="date"
                    required
                    value={handleEncodeDate(requestedPublicationDate)}
                    min={handleEncodeDate(addNDays(Date.now(), 1))}
                    onChange={(e) => setRequestedPublicationDate(handleDecodeDate(e.target.value))}
                  />
                </GenericSkeletonWrapper>
              </label>

              <p className={styles.formInputError}>{requestedPublicationDateError}</p>
            </div>
          </FormSection>

          <FormSection title="Post Type">
            <GenericSkeletonWrapper>
              <div className={[styles.formInputContainer, styles.row].join(' ')}>
                <RadioSelector
                  name="form-type"
                  value="news"
                  label="News"
                  isChecked={postType === 'news'}
                  onClick={() => setPostType('news')}
                  className={[styles.small, styles.formTypeSelector].join(' ')}
                />

                <RadioSelector
                  name="form-type"
                  value="announcement"
                  label="Announcement"
                  isChecked={postType === 'announcement'}
                  onClick={() => setPostType('announcement')}
                  className={[styles.small, styles.formTypeSelector].join(' ')}
                />

                {isReviewer && (
                  <RadioSelector
                    name="form-type"
                    value="event"
                    label="Event"
                    isChecked={postType === 'event'}
                    onClick={() => setPostType('event')}
                    className={[styles.small, styles.formTypeSelector].join(' ')}
                  />
                )}
              </div>
            </GenericSkeletonWrapper>
          </FormSection>

          {postType === 'event' ? (
            <FormSection title="Event Information">
              <div className={styles.formInputContainer}>
                <label className={styles.large}>
                  <p>
                    Select Event Date
                    {' '}
                    <span className={styles.required}>*</span>
                  </p>

                  <GenericSkeletonWrapper>
                    <input
                      type="date"
                      required
                      value={handleEncodeDate(eventDate ?? addNDays(Date.now(), 1))}
                      min={handleEncodeDate(addNDays(Date.now(), 1))}
                      onChange={(e) => setEventDate(handleDecodeDate(e.target.value))}
                    />
                  </GenericSkeletonWrapper>
                </label>

                <p className={styles.formInputError}>{eventDateError}</p>
              </div>

              <div className={styles.formInputContainer}>
                <label className={styles.large}>
                  <p>
                    Select Event Time
                    {' '}
                    <span className={styles.required}>*</span>
                  </p>

                  <GenericSkeletonWrapper>
                    <input
                      type="time"
                      required
                      value={handleEncodeTime(eventTime ?? 0)}
                      onChange={(e) => setEventTime(handleDecodeTime(e.target.value))}
                    />
                  </GenericSkeletonWrapper>
                </label>

                <p className={styles.formInputError}>{eventTimeError}</p>
              </div>
            </FormSection>
          ) : null}

          <FormSection title="Post Content">
            <div className={styles.formInputContainer}>
              <label className={styles.large}>
                <p>
                  Headline
                  {' '}
                  <span className={styles.required}>*</span>
                </p>

                <GenericSkeletonWrapper>
                  <input
                    type="text"
                    required
                    placeholder="Enter headline text"
                    value={briefContent}
                    onChange={(e) => setBriefContent(e.target.value)}
                  />
                </GenericSkeletonWrapper>
              </label>

              <ContentLength
                contentLength={briefContent.length}
                maxContentLength={50}
              />

              <p className={styles.formInputError}>{briefContentError}</p>
            </div>

            <div className={styles.formInputContainer}>
              <div className={styles.formInputContainer}>
                <label
                  className={styles.large}
                  htmlFor="form-editor-container"
                >
                  <p>Post Content</p>
                </label>

                <GenericSkeletonWrapper>
                  <div id="form-editor-container">
                    <RichTextEditor
                      incomingState={editorState}
                      onChange={(state) => setEditorState(state)}
                    />
                  </div>

                  <ContentLength
                    contentLength={editorState.getCurrentContent()?.getPlainText()?.length || 0}
                    maxContentLength={maxContentLength}
                  />

                  <p className={styles.formInputError}>{fullContentError}</p>
                </GenericSkeletonWrapper>
              </div>

              <div className={styles.formInputContainer}>
                <label className={styles.large}>
                  <p>URL</p>
                  <GenericSkeletonWrapper>
                    <input
                      type="text"
                      placeholder="Enter post URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className={!url || isValidUrl(url) ? '' : styles.invalid}
                    />
                  </GenericSkeletonWrapper>
                </label>

                <p className={styles.formInputError}>{urlError}</p>
              </div>
            </div>
          </FormSection>

          <FormSection title="Post Graphics">
            <div className={styles.formInputContainer}>
              <label className={styles.large}>
                <p>Attach Image</p>
                <GenericSkeletonWrapper>
                  <input
                    type="file"
                    alt="Select image to upload"
                    id="headerImage"
                    onChange={(e) => { upload(e); }}
                  />
                </GenericSkeletonWrapper>
              </label>

              <GenericSkeletonWrapper>
                <div className={styles.formImageStatus}>
                  {imageUploading
                    ? <div>Image is uploading...</div>
                    : (
                      <>
                        {featuredImage
                          ? <img src={featuredImage} alt="optional header preview" />
                          : <div>No uploaded image.</div>}
                      </>
                    )}
                </div>
              </GenericSkeletonWrapper>

              <p className={styles.formInputError}>{featuredImageError}</p>
            </div>

            {featuredImage && (
              <div className={styles.formInputContainer}>
                <label className={styles.large}>
                  <p>
                    Image Description
                    {' '}
                    <span className={styles.required}>*</span>
                  </p>

                  <GenericSkeletonWrapper>
                    <input
                      type="text"
                      required
                      placeholder="Briefly describe the featured image for this post"
                      value={featuredImageAlt}
                      onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    />
                  </GenericSkeletonWrapper>
                </label>

                <ContentLength
                  contentLength={featuredImageAlt.length}
                  maxContentLength={50}
                />

                <p className={styles.formInputError}>{featuredImageAltError}</p>
              </div>
            )}
          </FormSection>

          <section className={styles.actionButtonsContainer}>
            <GenericSkeletonWrapper>
              <button type="button" className={styles.formSubmitButton} onClick={handleUpdate('pending')}>Submit for Review</button>
              {post?.status === 'draft' && <button type="button" className={styles.formSaveButton} onClick={handleUpdate('draft')}>Save as Draft</button>}
              <button type="button" className={styles.formCancelButton} onClick={handleDiscard}>Discard Post</button>
            </GenericSkeletonWrapper>
          </section>
        </form>
      </SkeletonArea>
    </div>
  );
};

export default Form;
