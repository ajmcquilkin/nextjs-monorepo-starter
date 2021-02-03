/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, MouseEvent } from 'react';

import FormSection from 'components/form/formSection';
import ContentLength from 'components/form/contentLength';
import RichTextEditor from 'components/form/richTextEditor';
import MainWrapper from 'components/layout/mainWrapper';

import {
  createPost as createPostImport,
  fetchPostById as fetchPostByIdImport,
  fetchWithStatus as fetchWithStatusImport,
  updatePostById as updatePostByIdImport
} from 'store/actionCreators/postActionCreators';

import {
  setError as setErrorImport
} from 'store/actionCreators/requestActionCreators';

import {
  generateFrontendErrorMessage, maxContentLength, handleEncodeDate, handleDecodeDate
} from 'utils';

import { Post } from 'types/post';
import { Group } from 'types/group';
import { ConnectedThunkCreator } from 'types/state';

import styles from './form.module.scss';

export interface FormPassedProps {
  id: string,
}

export interface FormStateProps {
  groups: Group[],
  itemIsLoading: boolean,
  itemErrorMessage: string,

  post: Post,
  isAuthenticated: boolean,
  netId: string,
  isReviewer: boolean,
}

export interface FormDispatchProps {
  createPost: ConnectedThunkCreator<typeof createPostImport>,
  fetchPostById: ConnectedThunkCreator<typeof fetchPostByIdImport>,
  fetchApproved: ConnectedThunkCreator<typeof fetchWithStatusImport>,
  updatePostById: ConnectedThunkCreator<typeof updatePostByIdImport>,
  setError: ConnectedThunkCreator<typeof setErrorImport>
}

export type FormProps = FormPassedProps & FormStateProps & FormDispatchProps;

const Form = ({
  groups, itemIsLoading, itemErrorMessage, id,
  post, isAuthenticated, netId, isReviewer,
  createPost, fetchPostById, fetchApproved, updatePostById, setError,
}: FormProps): JSX.Element => {
  const [fromName, setFromName] = useState<Post['fromName']>('');
  const [requestedPublicationDate, setRequestedPublicationDate] = useState<Post['requestedPublicationDate']>(Date.now());
  const [postType, setPostType] = useState<Post['type']>('announcement');
  const [briefContent, setBriefContent] = useState<Post['briefContent']>('');
  const [fullContent, setFullContent] = useState<string>('');
  const [url, setUrl] = useState<Post['url']>('');

  const [postTypeError, setPostTypeError] = useState<string>('');
  const [briefContentError, setBriefContentError] = useState<string>('');
  const [fullContentError, setFullContentError] = useState<string>('');

  useEffect(() => { fetchPostById(id); }, []);
  useEffect(() => { console.log(fullContent); }, [fullContent]);

  const isNew = false;
  const editable = false;

  const submissionIsValid = (content: any): boolean => { // TODO: remove any
    let isValid = true;
    const contentNoTags = content.toString('html').replace(/(<([^>]+)>)/ig, '');

    if (!contentNoTags.length) { setFullContentError('Content is a required field'); isValid = false; }
    if (contentNoTags.length > maxContentLength) {
      setFullContentError(`Content has a max length of ${maxContentLength} characters, current length is ${contentNoTags.length} characters`);
      isValid = false;
    }
    // if (!this.state.(recipients)) { this.setState({ toError: 'please select recipients' }) } // TODO: Update and save "to" field
    if (!postType) { setPostTypeError('Type is a required field'); isValid = false; }
    if (!briefContent) { setBriefContentError('Brief content is a required field'); isValid = false; }

    return isValid;
  };

  const handleSave = (e: MouseEvent<HTMLElement>) => {
    console.log('saved');

  //   if (submissionIsValid(fullContent)) {
  //     const createdPost: Post = {
  //       fromName,
  //       requestedPublicationDate,
  //       briefContent,
  //       fullContent: fullContent.toString('html'),
  //       type: postType,
  //       url,
  //     };
  //   }
  };

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    console.log('submitted');
  };

  const handleCancel = (e: MouseEvent<HTMLElement>) => {
    console.log('cancelled');
  };

  return (
    <MainWrapper>
      <div className={styles.formContainer}>
        <h1>{isNew ? 'New Submission' : 'Edit Submission'}</h1>
        <form>
          <FormSection title="Recipients">
            <div className={styles.formFromContainer}>
              <label className={styles.formLabelLarge}>
                From
                <span className={styles.formRequiredField}>*</span>
                <input
                  placeholder="Type department or division name here"
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                />
              </label>
            </div>

            <div className={styles.formToContainer}>
              <div className={styles.formLabelLarge}>
                To
                <span className={styles.formRequiredField}>*</span>
              </div>

              <div className={styles.formListsCheckboxContainer}>
                {groups.map(({ name, list }) => (
                  <div key={name} className={styles.formListsCheckboxContainer}>
                    <h3>{name}</h3>
                    {list.map((e) => <p key={e}>{JSON.stringify(e)}</p>)}
                    <button type="button">All</button>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <FormSection title="Publish Date">
            <label className={[styles.formPublishContainer, styles.formLabelLarge].join(' ')}>
              Select Publish Date
              {/* <input
                type="date"
                value={handleEncodeDate(requestedPublicationDate)}
                onChange={(e) => setRequestedPublicationDate(handleDecodeDate(e.target.value))}
              /> */}
            </label>
          </FormSection>

          <FormSection title="Type">
            <div className={styles.formTypeRadioContainer}>

              {/* TODO: Limit post options based on scopes */}

              <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
                <input
                  type="radio"
                  name="form-type"
                  value="news"
                  onChange={() => setPostType('news')}
                />
                News
              </label>

              <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
                <input
                  type="radio"
                  name="form-type"
                  value="announcement"
                  onChange={() => setPostType('announcement')}
                />
                Announcement
              </label>

              <label className={[styles.formTypeContainer, styles.formLabelSmall].join(' ')}>
                <input
                  type="radio"
                  name="form-type"
                  value="event"
                  onChange={() => setPostType('event')}
                />
                Event
              </label>
            </div>
            <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(postTypeError)}</div>

            {/* <label className={styles.formLabelLarge}>
            Event Date
            <input
            type="date"
            value={this.state.eventDate}
            onChange={(e) => this.setState({ eventDate: e.target.value })}
            />
          </label> */}
          </FormSection>

          <FormSection title="Body">
            <div className={styles.formContentContainer}>
              <label className={styles.formLabelSmall}>
                Headline
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
              <div className={styles.formEditorContainer}>
                <RichTextEditor
                  incomingState={fullContent}
                  onChange={(value) => setFullContent(value)}
                />
                <ContentLength contentLength={fullContent.length} maxContentLength={maxContentLength} />
                <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(fullContentError)}</div>
              </div>

              <label className={styles.formLabelSmall}>
                URL
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

          {/* <FormSection title="Graphics">
            <div className={styles.formContentContainer}>
              <label className={styles.formLabelSmall}>
                <p>Attach Image</p>
                <input
                  type="file"
                  alt="Select image to upload"
                  id="headerImage"
                  onChange={(e) => { upload(e); }}
                />
                <div className={styles.formErrorContainer}>{generateFrontendErrorMessage(briefContentError)}</div>
              </label>
              <div>
                <div className="imagePreview">
                  {imageUploading === true ? <div>Image is uploading</div> : <span />}
                  {imageUrl ? <img src={imageUrl} alt="optional headerImage" /> : <div>No image uploaded yet</div>}
                </div>
              </div>
            </div>
          </FormSection> */}

          <section className={styles.formButtonsContainer}>
            {editable
              ? (
                <>
                  <button type="button" className={styles.formSubmitButton} onClick={handleSubmit}>Submit</button>
                  <button type="button" className={styles.formSaveButton} onClick={handleSave}>Save Draft</button>
                  <button type="button" className={styles.formCancelButton} onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <p>Submitted, not editable</p>
              )}
          </section>
        </form>
      </div>
    </MainWrapper>
  );
};

export default Form;
