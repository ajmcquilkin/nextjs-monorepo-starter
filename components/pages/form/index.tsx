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
import FormError from 'components/form/formError';
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
import { serverTimeZone } from 'utils/time';

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
  const [submitError, setSubmitError] = useState<string>('');

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

    setSubmitError('Cannot submit, missing required form fields');
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
        openModal('ERROR_MODAL', { title: 'Image Upload Error', content: error.message });
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <SkeletonArea name="form page" isLoading={postIsLoading}>
        <div className={styles.titleContainer}>
          <button
            aria-label="back to submissions"
            type="button"
            onClick={() => router.push('/submissions')}
          >
            <img src="/icons/left.svg" alt="back to submissions" aria-hidden="true" />
            <p>Submissions</p>
          </button>

          <h1>{post ? 'Edit Submission' : 'New Submission'}</h1>
          <p>
            View Vox Submission Guidelines
            {' '}
            <Link href="https://communications.dartmouth.edu/faculty-and-staff/vox-daily-guidelines">
              <a>here</a>
            </Link>
            .
          </p>
        </div>

        <form>
          <FormSection title="Sender Information">
            <div className="formInputContainer">
              <label>
                From Name
                {' '}
                <span className="required" aria-hidden="true">*</span>

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      placeholder="Type department or division name here"
                      required
                      type="text"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <FormError message={fromNameError} />
            </div>

            <div className="formInputContainer">
              <label>
                From Address
                {' '}
                <span className="required" aria-hidden="true">*</span>

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      placeholder="Type email of sending individual or department"
                      required
                      type="email"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <FormError message={fromAddressError} />
            </div>
          </FormSection>

          <FormSection title="Recipient Information">
            <span className="visually-hidden">
              Use the tab key to focus groups.
              Use the space key to select and deselect groups.
            </span>

            <div className="formInputContainer">
              <div className={['label', 'large'].join(' ')}>
                <p className="labelText" id="groups-label">Recipient Groups</p>
              </div>

              <GenericSkeletonWrapper>
                <ul
                  aria-labelledby="groups-label"
                  className={styles.formGroupListContainer}
                >
                  {groups.map((group) => (
                    <li
                      className={styles.formGroupList}
                      key={group.name}
                    >
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
            <div className="formInputContainer">
              <label>
                Select Publish Date
                {' '}
                <span className="required" aria-hidden="true">*</span>

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      type="date"
                      required
                      value={handleEncodeDate(requestedPublicationDate)}
                      min={handleEncodeDate(addNDays(Date.now(), 1))}
                      onChange={(e) => setRequestedPublicationDate(handleDecodeDate(e.target.value))}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <FormError message={requestedPublicationDateError} />
            </div>
          </FormSection>

          <FormSection title="Post Type">
            <GenericSkeletonWrapper>
              <div
                aria-label="select post type"
                className={['formInputContainer', 'row'].join(' ')}
              >
                {isReviewer && (
                  <RadioSelector
                    name="form-type"
                    value="news"
                    label="News"
                    isChecked={postType === 'news'}
                    onClick={() => setPostType('news')}
                    className={['small', styles.formTypeSelector].join(' ')}
                  />
                )}

                <RadioSelector
                  name="form-type"
                  value="announcement"
                  label="Announcement"
                  isChecked={postType === 'announcement'}
                  onClick={() => setPostType('announcement')}
                  className={['small', styles.formTypeSelector].join(' ')}
                />

                <RadioSelector
                  name="form-type"
                  value="event"
                  label="Event"
                  isChecked={postType === 'event'}
                  onClick={() => setPostType('event')}
                  className={['small', styles.formTypeSelector].join(' ')}
                />

              </div>
            </GenericSkeletonWrapper>
          </FormSection>

          {postType === 'event' ? (
            <FormSection title="Event Information">
              <div className="formInputContainer">
                <label>
                  Select Event Date
                  {' '}
                  <span className="required" aria-hidden="true">*</span>

                  <div className="labelContent">
                    <GenericSkeletonWrapper>
                      <input
                        type="date"
                        required
                        value={handleEncodeDate(eventDate ?? addNDays(Date.now(), 1))}
                        min={handleEncodeDate(addNDays(Date.now(), 1))}
                        onChange={(e) => setEventDate(handleDecodeDate(e.target.value))}
                      />
                    </GenericSkeletonWrapper>
                  </div>
                </label>

                <FormError message={eventDateError} />
              </div>

              <div className="formInputContainer">
                <label>
                  Select Event Time
                  {' '}
                  <span className="required" aria-hidden="true">*</span>

                  <div className="labelContent">
                    <GenericSkeletonWrapper>
                      <input
                        type="time"
                        required
                        value={handleEncodeTime(eventTime ?? 0)}
                        onChange={(e) => setEventTime(handleDecodeTime(e.target.value))}
                      />
                    </GenericSkeletonWrapper>
                  </div>
                </label>

                <p className={styles.additionalInformation}>
                  Enter time in the &quot;US/Eastern&quot; timezone
                  {' '}
                  (&quot;
                  {serverTimeZone}
                  &quot;)
                </p>

                <FormError message={eventTimeError} />
              </div>
            </FormSection>
          ) : null}

          <FormSection title="Post Content">
            <div className="formInputContainer">
              <label>
                Headline
                {' '}
                <span className="required" aria-hidden="true">*</span>

                <p className={styles.additionalInformation}>Please refrain from using all caps in the title.</p>

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      type="text"
                      required
                      placeholder="Enter headline text"
                      value={briefContent}
                      onChange={(e) => setBriefContent(e.target.value)}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <ContentLength
                contentLength={briefContent.length}
                maxContentLength={50}
              />

              <FormError message={briefContentError} />
            </div>

            <div className="formInputContainer">
              <p className="label" id="rte-label">Post Content</p>

              <GenericSkeletonWrapper>
                <RichTextEditor
                  incomingState={editorState}
                  onChange={(state) => setEditorState(state)}
                />

                <ContentLength
                  contentLength={editorState.getCurrentContent()?.getPlainText()?.length || 0}
                  maxContentLength={maxContentLength}
                />

                <FormError message={fullContentError} />
              </GenericSkeletonWrapper>
            </div>

            <div className="formInputContainer">
              <label>
                URL

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      type="text"
                      placeholder="Enter post URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className={!url || isValidUrl(url) ? '' : 'invalid'}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <FormError message={urlError} />
            </div>
          </FormSection>

          <FormSection title="Post Graphics">
            <div className="formInputContainer">
              <label>
                Attach Image

                <div className="labelContent">
                  <GenericSkeletonWrapper>
                    <input
                      type="file"
                      alt="Select image to upload"
                      id="headerImage"
                      onChange={(e) => { upload(e); }}
                    />
                  </GenericSkeletonWrapper>
                </div>
              </label>

              <GenericSkeletonWrapper>
                <div className={styles.formImageStatus}>
                  {imageUploading
                    ? <p>Image is uploading...</p>
                    : (
                      <>
                        {featuredImage
                          ? <img src={featuredImage} alt="optional header preview" />
                          : <p>No uploaded image.</p>}
                      </>
                    )}
                </div>
              </GenericSkeletonWrapper>

              <FormError message={featuredImageError} />
            </div>

            {featuredImage && (
              <div className="formInputContainer">
                <label>
                  Image Description
                  {' '}
                  <span className="required" aria-hidden="true">*</span>

                  <div className="labelContent">
                    <GenericSkeletonWrapper>
                      <input
                        type="text"
                        required
                        placeholder="Briefly describe the featured image for this post"
                        value={featuredImageAlt}
                        onChange={(e) => setFeaturedImageAlt(e.target.value)}
                      />
                    </GenericSkeletonWrapper>
                  </div>
                </label>

                <ContentLength
                  contentLength={featuredImageAlt.length}
                  maxContentLength={50}
                />

                <FormError message={featuredImageAltError} />
              </div>
            )}
          </FormSection>

          <section>
            <GenericSkeletonWrapper>
              <div className={styles.actionButtonsContainer}>
                <button
                  type="button"
                  className={styles.formSubmitButton}
                  onClick={handleUpdate('pending')}
                >
                  <p>Submit for Review</p>
                </button>

                <button
                  type="button"
                  className={styles.formSaveButton}
                  onClick={handleUpdate('draft')}
                >
                  <p>Save as Draft</p>
                </button>

                <button
                  type="button"
                  className={styles.formCancelButton}
                  onClick={handleDiscard}
                >
                  <p>Discard Post</p>
                </button>
              </div>

              <FormError message={submitError} />
            </GenericSkeletonWrapper>
          </section>
        </form>
      </SkeletonArea>
    </div>
  );
};

export default Form;
