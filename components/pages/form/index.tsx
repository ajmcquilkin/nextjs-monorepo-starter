/* eslint-disable jsx-a11y/label-has-associated-control */

import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent } from 'react';

import { EditorState, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML, Options as DraftJSExportOptions } from 'draft-js-export-html';

import FormSection from 'components/form/formSection';
import ContentLength from 'components/form/contentLength';
import RichTextEditor from 'components/form/richTextEditor';
import FormGroup from 'components/layout/formGroup';

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
  maxContentLength, generateFrontendErrorMessage, addNDays,
  handleEncodeDate, handleDecodeDate, encodeRecipientGroups, decodeRecipientGroups
} from 'utils';
import uploadImage from 'utils/s3';

import { HTML } from 'types/email';
import { Group } from 'types/group';
import { Post, PostStatus } from 'types/post';
import { ConnectedThunkCreator } from 'types/state';

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

  setError: ConnectedThunkCreator<typeof setErrorImport>
}

export type FormProps = FormPassedProps & FormStateProps & FormDispatchProps;

const exportOptions: DraftJSExportOptions = {
  inlineStyles: { BOLD: { element: 'b' } }
};

const Form = ({
  groups, postIsLoading, postErrorMessage,
  id, post, netId,
  createPost, fetchPostById, updatePostById, deletePostById, setError,
}: FormProps): JSX.Element => {
  const router = useRouter();

  const [fromName, setFromName] = useState<Post['fromName']>('');
  const [fromAddress, setFromAddress] = useState<Post['fromAddress']>('');
  const [requestedPublicationDate, setRequestedPublicationDate] = useState<Post['requestedPublicationDate']>(addNDays(Date.now(), 1));
  const [postType, setPostType] = useState<Post['type']>('announcement');

  const [briefContent, setBriefContent] = useState<Post['briefContent']>('');
  const [featuredImage, setFeaturedImage] = useState<Post['featuredImage']>('');
  const [eventDate, setEventDate] = useState<Post['eventDate']>(null);
  const [url, setUrl] = useState<Post['url']>('');

  const [recipientGroups, setRecipientGroups] = useState<Record<Group['name'], boolean>>({});
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const [postTypeError, setPostTypeError] = useState<string>('');
  const [briefContentError, setBriefContentError] = useState<string>('');
  const [fullContentError, setFullContentError] = useState<string>('');

  useEffect(() => { if (id !== 'new') fetchPostById(id); }, []);
  useEffect(() => { setEditorState(EditorState.createWithContent(ContentState.createFromText(''))); }, []);

  useEffect(() => {
    setFromName(post?.fromName || '');
    setFromAddress(post?.fromAddress || '');
    setRequestedPublicationDate(post?.requestedPublicationDate || addNDays(Date.now(), 1));
    setPostType(post?.type || 'announcement');

    setBriefContent(post?.briefContent || '');
    setFeaturedImage(post?.featuredImage || '');
    setEventDate(post?.eventDate || null);
    setUrl(post?.url || '');

    setRecipientGroups(post?.recipientGroups ? encodeRecipientGroups(post.recipientGroups) : {});
    setEditorState(post?.fullContent ? EditorState.createWithContent(stateFromHTML(post.fullContent)) : EditorState.createEmpty());
  }, [post]);

  const getFullContent = (state: EditorState): HTML => stateToHTML(state.getCurrentContent(), exportOptions);

  const submissionIsValid = (state: EditorState): boolean => {
    let isValid = true;
    const plainContent = state.getCurrentContent().getPlainText();

    if (!plainContent.length) { setFullContentError('Content is a required field'); isValid = false; }
    if (plainContent.length > maxContentLength) {
      setFullContentError(`Content has a max length of ${maxContentLength} characters, current length is ${plainContent.length} characters`);
      isValid = false;
    }

    if (!postType) { setPostTypeError('Type is a required field'); isValid = false; }
    if (!briefContent) { setBriefContentError('Brief content is a required field'); isValid = false; }

    return isValid;
  };

  const handleUpdate = (status: PostStatus) => (): void => {
    if (!submissionIsValid(editorState)) return;

    const payload = {
      fromName,
      fromAddress,
      requestedPublicationDate,
      briefContent,
      url,
      featuredImage,
      type: postType,
      fullContent: getFullContent(editorState),
      status,

      submitterNetId: netId,
      recipientGroups: decodeRecipientGroups(recipientGroups),
      eventDate
    };

    if (post) updatePostById(post._id, payload);

    else {
      createPost(payload, {
        successCallback: (res) => { router.push(`/form/${res?.data?.data?.post?._id || ''}`); }
      });
    }
  };

  const handleDiscard = () => {
    if (post) deletePostById(id, { successCallback: () => { router.push('/'); } });
    else router.push('/');
  };

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) throw new Error('file not found');

    try {
      setImageUploading(true);
      const imageURL = await uploadImage(file);
      setImageUploading(false);
      setFeaturedImage(imageURL);
      if (post) { updatePostById(post._id, { featuredImage: imageURL }); }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (postIsLoading) return (<div>Loading...</div>);

  return (
    <div className={styles.formContainer}>
      <h1>{post ? 'Edit Submission' : 'New Submission'}</h1>
      <form>
        <FormSection title="Recipients">
          <div className={styles.formFromContainer}>
            <label className={styles.formLabelLarge}>
              <p>
                From Name
                <span className={styles.formRequiredField}>*</span>
              </p>
              <input
                placeholder="Type department or division name here"
                type="text"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.formFromContainer}>
            <label className={styles.formLabelLarge}>
              <p>
                From Address
                <span className={styles.formRequiredField}>*</span>
              </p>
              <input
                placeholder="Type email of sending individual or department"
                type="email"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.formToContainer}>
            <div className={styles.formLabelLarge}>
              To
              <span className={styles.formRequiredField}>*</span>
            </div>

            <ul className={styles.formListsCheckboxContainer}>
              {groups.map((group) => (
                <li key={group.name} className={styles.formListsCheckboxContainer}>
                  <FormGroup
                    group={group}
                    headerDepth={3}
                    selectedElements={recipientGroups}
                    setSelectedState={(groupName, newState) => setRecipientGroups({ ...recipientGroups, [groupName]: newState })}
                  />
                </li>
              ))}
              {/* <button type="button">All</button> */}
            </ul>
          </div>
        </FormSection>

        <FormSection title="Publish Date">
          <label className={[styles.formPublishContainer, styles.formLabelLarge].join(' ')}>
            <p>Select Publish Date</p>
            <input
              type="date"
              value={handleEncodeDate(requestedPublicationDate)}
              min={handleEncodeDate(addNDays(Date.now(), 1))}
              onChange={(e) => setRequestedPublicationDate(handleDecodeDate(e.target.value))}
            />
          </label>
        </FormSection>

        <FormSection title="Type">
          <div className={styles.formTypeRadioContainer}>
            <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
              <input
                type="radio"
                name="form-type"
                value="news"
                checked={postType === 'news'}
                onChange={() => setPostType('news')}
              />
              News
            </label>

            <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
              <input
                type="radio"
                name="form-type"
                value="announcement"
                checked={postType === 'announcement'}
                onChange={() => setPostType('announcement')}
              />
              Announcement
            </label>

            <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
              <input
                type="radio"
                name="form-type"
                value="event"
                checked={postType === 'event'}
                onChange={() => setPostType('event')}
              />
              Event
            </label>
          </div>
          <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(postTypeError)}</div>
        </FormSection>

        {postType === 'event' ? (
          <FormSection title="Event Date">
            <label className={[styles.formPublishContainer, styles.formLabelLarge].join(' ')}>
              <p>Select Event Date</p>
              <input
                type="date"
                value={handleEncodeDate(eventDate || Date.now())}
                min={handleEncodeDate(addNDays(Date.now(), 1))}
                onChange={(e) => setEventDate(handleDecodeDate(e.target.value))}
              />
            </label>
          </FormSection>
        ) : null}

        <FormSection title="Body">
          <div className={styles.formContentContainer}>
            <label className={styles.formLabelSmall}>
              <p>Headline</p>
              <input
                type="text"
                placeholder="Enter headline text"
                value={briefContent}
                onChange={(e) => setBriefContent(e.target.value)}
              />
              <ContentLength contentLength={briefContent.length} maxContentLength={50} />
              <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(briefContentError)}</div>
            </label>

            <label className={styles.formLabelSmall} htmlFor="form-editor-container">Summary</label>
            <div id="form-editor-container" className={styles.formEditorContainer}>
              <RichTextEditor
                incomingState={editorState}
                onChange={(state) => setEditorState(state)}
              />

              <ContentLength
                contentLength={editorState.getCurrentContent()?.getPlainText()?.length || 0}
                maxContentLength={maxContentLength}
              />

              <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(fullContentError)}</div>
            </div>

            <label className={styles.formLabelSmall}>
              <p>URL</p>
              {' '}
              <input
                type="text"
                placeholder="Enter post URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
        </FormSection>

        <FormSection title="Graphics">
          <div className={styles.formContentContainer}>
            <label className={styles.formLabelSmall}>
              <p>Attach Image</p>
              <input
                type="file"
                alt="Select image to upload"
                id="headerImage"
                onChange={(e) => { upload(e); }}
              />
              <div className={styles.formErrorContainer}>{generateFrontendErrorMessage('')}</div>
            </label>
            <div>
              <div className="imagePreview">
                {/* eslint-disable-next-line no-nested-ternary */}
                {imageUploading ? <div>Image is uploading...</div> : (featuredImage ? <img src={featuredImage} alt="optional headerImage" /> : <div>No image uploaded yet</div>)}
              </div>
            </div>
          </div>
        </FormSection>

        <section className={styles.formButtonsContainer}>
          <button type="button" className={styles.formSubmitButton} onClick={handleUpdate('pending')}>Submit</button>
          <button type="button" className={styles.formSaveButton} onClick={handleUpdate('draft')}>Save Draft</button>
          <button type="button" className={styles.formCancelButton} onClick={handleDiscard}>Discard Post</button>
        </section>
      </form>
    </div>
  );
};

export default Form;
