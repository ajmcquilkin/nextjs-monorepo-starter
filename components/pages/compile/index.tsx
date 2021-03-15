/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import {
  useEffect, useState, ChangeEvent, useCallback, KeyboardEventHandler
} from 'react';
import unionWith from 'lodash.unionwith';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import SkeletonArea from 'components/helpers/skeletonArea';
import GenericDropTarget from 'components/helpers/genericDropTarget';
import GenericSkeletonWrapper from 'components/helpers/genericSkeletonWrapper';
import SubmissionSkeleton from 'components/submissions/submissionSkeleton';

import ContentLength from 'components/form/contentLength';
import CompileSection from 'components/layout/compileSection';
import DraggablePost from 'components/posts/draggablePost';
import DraggablePostTarget from 'components/posts/draggablePostTarget';
import CompileSubmission from 'components/submissions/compileSubmission';

import { openModal as openModalImport } from 'store/actionCreators/modalActionCreators';
import {
  fetchReleaseByDate as fetchReleaseByDateImport,
  updateReleaseById as updateReleaseByIdImport,
  createRelease as createReleaseImport
} from 'store/actionCreators/releaseActionCreators';
import { fetchPostsByDate as fetchPostsByDateImport } from 'store/actionCreators/postActionCreators';

import { addNDays, DragItemTypes, getFullDate } from 'utils';
import uploadImage from 'utils/s3';

import { Post } from 'types/post';
import { Release } from 'types/release';
import { ConnectedThunkCreator } from 'types/state';

import styles from './compile.module.scss';

export interface CompilePassedProps {

}

export interface CompileStateProps {
  postMap: Record<string, Post>,
  release: Release | null,
  postResults: Post[],
  isLoading: boolean
}

export interface CompileDispatchProps {
  fetchReleaseByDate: ConnectedThunkCreator<typeof fetchReleaseByDateImport>,
  createRelease: ConnectedThunkCreator<typeof createReleaseImport>,
  updateReleaseById: ConnectedThunkCreator<typeof updateReleaseByIdImport>,
  fetchPostsByDate: ConnectedThunkCreator<typeof fetchPostsByDateImport>,
  openModal: ConnectedThunkCreator<typeof openModalImport>
}

export type CompileProps = CompilePassedProps & CompileStateProps & CompileDispatchProps;

const combineIdArray = (incoming: string[], existing: string[]): string[] => unionWith(incoming, existing, (a, b) => a === b);

const Compile = ({
  postMap, release, postResults, isLoading,
  fetchReleaseByDate, createRelease, updateReleaseById, fetchPostsByDate, openModal
}: CompileProps): JSX.Element => {
  const router = useRouter();

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const [subject, setSubject] = useState<Release['subject']>('');
  const [headerImage, setHeaderImage] = useState<Release['headerImage']>('');
  const [headerImageCaption, setHeaderImageCaption] = useState<Release['headerImageCaption']>('');
  const [headerImageAlt, setHeaderImageAlt] = useState<Release['headerImageAlt']>('');

  const [quoteOfDay, setQuoteOfDay] = useState<Release['quoteOfDay']>('');
  const [quotedContext, setQuotedContext] = useState<Release['quotedContext']>('');

  const [featuredPost, setFeaturedPost] = useState<Release['featuredPost']>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const [news, setNews] = useState<string[]>(release?.news || []);
  const [announcements, setAnnouncements] = useState<string[]>(release?.announcements || []);
  const [events, setEvents] = useState<string[]>(release?.events || []);

  const releaseDate = addNDays(Date.now(), 1);

  // * Required fields
  const [subjectError, setSubjectError] = useState<string>('');
  const [headerImageAltError, setHeaderImageAltError] = useState<string>(''); // validated

  // * Validated fields

  useEffect(() => {
    fetchReleaseByDate(releaseDate, { failureCallback: () => ({}) });
    fetchPostsByDate(releaseDate, { failureCallback: () => ({}) });
  }, []);

  useEffect(() => {
    setSubject(release?.subject || '');
    setHeaderImage(release?.headerImage || '');
    setHeaderImageCaption(release?.headerImageCaption || '');
    setHeaderImageAlt(release?.headerImageAlt || '');

    setQuoteOfDay(release?.quoteOfDay || '');
    setQuotedContext(release?.quotedContext || '');
    setFeaturedPost(release?.featuredPost || null);

    setNews(combineIdArray(release?.news || [], news));
    setAnnouncements(combineIdArray(release?.announcements || [], announcements));
    setEvents(combineIdArray(release?.events || [], events));
  }, [release]);

  useEffect(() => {
    setNews(combineIdArray(postResults.filter((post) => post.type === 'news').map((post) => post._id), news));
    setAnnouncements(combineIdArray(postResults.filter((post) => post.type === 'announcement').map((post) => post._id), announcements));
    setEvents(combineIdArray(postResults.filter((post) => post.type === 'event').map((post) => post._id), events));
  }, [postResults]);

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) throw new Error('file not found');

    try {
      setImageUploading(true);
      const url = await uploadImage(file);
      setImageUploading(false);
      setHeaderImage(url);
      if (release) { updateReleaseById(release._id, { headerImage: url }); }
    } catch (error) {
      console.error(error.message);
    }
  };

  const clearErrors = () => {
    setSubjectError('');
    setHeaderImageAltError('');
  };

  const submissionIsValid = (): boolean => {
    let isValid = true;

    if (!subject) {
      setSubjectError('Subject is a required field');
      isValid = false;
    }

    if (headerImage && !headerImageAlt) {
      setHeaderImageAltError('Image description is a required field');
      isValid = false;
    }

    if (headerImage && headerImageAlt.length > 50) {
      setHeaderImageAltError(`Image description has a max length of 50 characters, current length is ${headerImageAlt.length} characters`);
      isValid = false;
    }

    if (!isValid) openModal('ERROR_MODAL', { title: 'Missing Required Information', content: 'Please fill in all required fields within the form to save a release.' });
    return isValid;
  };

  const handleReleaseUpdate = async () => {
    if (!submissionIsValid()) return;
    clearErrors();

    const body = {
      subject,
      headerImage,
      headerImageCaption,
      headerImageAlt,

      quoteOfDay,
      quotedContext,
      featuredPost,
      date: releaseDate,

      news,
      announcements,
      events
    };

    if (release) updateReleaseById(release._id, body);
    else createRelease(body);
  };

  const handleArrowReorder = (list: string[], setter: (value: string[]) => void) => (id: string, idx: number): KeyboardEventHandler<HTMLLIElement> => (e) => {
    let newIdx = idx;
    if (e.key === 'ArrowDown') {
      newIdx = idx + 1;
    } else if (e.key === 'ArrowUp') {
      newIdx = idx - 1;
    } else if (e.key === ' ') {
      if (selectedPost === id) setSelectedPost(null);
      else setSelectedPost(id);
    } else {
      return; // Don't block other keys
    }

    e.preventDefault();
    if (selectedPost !== id) return;

    const immutableArray = [...list];
    if (newIdx < 0 || list.length <= newIdx) {
      newIdx = idx;
    } else {
      [immutableArray[idx], immutableArray[newIdx]] = [immutableArray[newIdx], immutableArray[idx]];
    }

    setter(immutableArray);
  };

  const movePostByHover = useCallback((list: string[], setter: (value: string[]) => void) => (dragIndex: number, hoverIndex: number) => {
    const immutableArray = [...list];
    [immutableArray[dragIndex], immutableArray[hoverIndex]] = [immutableArray[hoverIndex], immutableArray[dragIndex]];
    setter(immutableArray);
  }, [news, announcements, events]);

  const handleEdit = (_id: string) => router.push(`/form/${_id}`);
  const handleReject = (_id: string) => openModal('REJECTION_MODAL', { postId: _id });

  return (
    <DndProvider backend={HTML5Backend}>
      <SkeletonArea name="compile page" isLoading={isLoading}>
        <div className={styles.compileContainer}>
          <h1>Compile</h1>

          <section>
            <h2>{getFullDate(releaseDate)}</h2>
            <p className={styles.subtitle}>Click on the dots on the left and drag and drop to re-order.</p>
          </section>

          <CompileSection title="General">
            <div className="formInputContainer">
              <label>
                <p className="labelText">
                  Release Headline
                  {' '}
                  <span className="required">*</span>
                </p>

                <GenericSkeletonWrapper>
                  <input
                    placeholder="Enter subject line for email"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </GenericSkeletonWrapper>

                <p className="formInputError">{subjectError}</p>
              </label>
            </div>

            <div className="formInputContainer">
              <label>
                <p className="labelText">Header Image</p>

                <GenericSkeletonWrapper>
                  <input
                    type="file"
                    alt="Select image to upload"
                    accept="image/*"
                    id="headerImage"
                    onChange={(e) => { upload(e); }}
                  />

                  <div>
                    {imageUploading === true ? <p>Uploading...</p> : null}
                    {headerImage ? (
                      <>
                        <img
                          src={headerImage}
                          alt={headerImageAlt}
                          width={400}
                        />
                        <p>Uploaded Image</p>
                      </>
                    ) : null}
                  </div>
                </GenericSkeletonWrapper>
              </label>
            </div>

            {headerImage && (
              <div className="formInputContainer">
                <label>
                  <p className="labelText">Image Caption</p>

                  <GenericSkeletonWrapper>
                    <input
                      type="text"
                      placeholder="Give a caption for the featured image"
                      value={headerImageCaption}
                      onChange={(e) => setHeaderImageCaption(e.target.value)}
                    />
                  </GenericSkeletonWrapper>
                </label>
              </div>
            )}

            <GenericSkeletonWrapper>
              {headerImage && (
                <div className="formInputContainer">
                  <label className="large">
                    <p className="labelText">
                      Image Description
                      {' '}
                      <span className="required">*</span>
                    </p>

                    <GenericSkeletonWrapper>
                      <input
                        type="text"
                        required
                        placeholder="Briefly describe the featured image"
                        value={headerImageAlt}
                        onChange={(e) => setHeaderImageAlt(e.target.value)}
                      />
                    </GenericSkeletonWrapper>
                  </label>

                  <ContentLength
                    contentLength={headerImageAlt.length}
                    maxContentLength={50}
                  />

                  <p className="formInputError">{headerImageAltError}</p>
                </div>
              )}
            </GenericSkeletonWrapper>
          </CompileSection>

          <CompileSection title="Quote of the Day (optional)">
            <div className="formInputContainer">
              <label>
                <p className="labelText">Quote Text</p>
                <GenericSkeletonWrapper>
                  <input
                    type="text"
                    placeholder="Enter quote of the day"
                    value={quoteOfDay}
                    onChange={(e) => setQuoteOfDay(e.target.value)}
                  />
                </GenericSkeletonWrapper>
              </label>
            </div>

            <div className="formInputContainer">

              <GenericSkeletonWrapper>
                <label>
                  <p className="labelText">Quote Attribution</p>
                  <input
                    type="text"
                    placeholder="Give context about the quoted individual"
                    value={quotedContext}
                    onChange={(e) => setQuotedContext(e.target.value)}
                  />
                </label>
              </GenericSkeletonWrapper>
            </div>
          </CompileSection>

          <CompileSection title="Featured Story (optional)">
            <DraggablePostTarget
              acceptType={[DragItemTypes.NEWS, DragItemTypes.ANNOUNCEMENT, DragItemTypes.EVENT]}
              onDrop={(item) => setFeaturedPost(item.id)}
            >
              {isLoading
                ? <SubmissionSkeleton status="approved" />
                : (
                  <div className={styles.featuredPostContainer}>
                    {featuredPost
                      ? (
                        <div>
                          <CompileSubmission
                            postContent={postMap[featuredPost]}
                            handleEdit={handleEdit}
                            handleReject={handleReject}
                          />

                          <button
                            className={styles.featuredPostClear}
                            type="button"
                            onClick={() => setFeaturedPost(null)}
                          >
                            Clear Featured Post
                          </button>
                        </div>
                      )
                      : (
                        <GenericDropTarget
                          className={styles.featuredPostEmpty}
                          hoveredClassName={styles.hovered}
                          validClassName={styles.valid}
                        >
                          Drag featured post here
                        </GenericDropTarget>
                      )}
                  </div>
                )}
            </DraggablePostTarget>
          </CompileSection>

          <span
            id="compile-drag-description"
            className="visually-hidden"
          >
            Select a post with the tab key then use
            the arrow keys to reorder within the list
          </span>

          <CompileSection title="News">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {news.length ? (
                    <ol role="listbox" className={styles.postListContainer}>
                      {news.map((id, idx) => (
                        <li
                          role="option"
                          aria-selected={selectedPost === id}
                          draggable="true"
                          aria-describedby="compile-drag-description"
                          onKeyDown={handleArrowReorder(news, setNews)(id, idx)}
                          tabIndex={0}
                          key={id}
                        >
                          <DraggablePost
                            postContent={postMap?.[id]}
                            type={DragItemTypes.NEWS}
                            index={idx}
                            movePost={movePostByHover(news, setNews)}
                            handleEdit={handleEdit}
                            handleReject={handleReject}
                            className={styles.compilePost}
                          />
                        </li>
                      ))}
                    </ol>
                  ) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <CompileSection title="Announcements">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {announcements.length ? (
                    <ol role="listbox" className={styles.postListContainer}>
                      {announcements.map((id, idx) => (
                        <li
                          role="option"
                          aria-selected={selectedPost === id}
                          draggable="true"
                          aria-describedby="compile-drag-description"
                          onKeyDown={handleArrowReorder(announcements, setAnnouncements)(id, idx)}
                          tabIndex={0}
                          key={id}
                        >
                          <DraggablePost
                            postContent={postMap?.[id]}
                            type={DragItemTypes.ANNOUNCEMENT}
                            index={idx}
                            movePost={movePostByHover(announcements, setAnnouncements)}
                            handleEdit={handleEdit}
                            handleReject={handleReject}
                            className={styles.compilePost}
                          />
                        </li>
                      ))}
                    </ol>
                  ) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <CompileSection title="Events">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {events.length ? (
                    <ol role="listbox" className={styles.postListContainer}>
                      {events.map((id, idx) => (
                        <li
                          role="option"
                          aria-selected={selectedPost === id}
                          draggable="true"
                          aria-describedby="compile-drag-description"
                          onKeyDown={handleArrowReorder(events, setEvents)(id, idx)}
                          tabIndex={0}
                          key={id}
                        >
                          <DraggablePost
                            postContent={postMap?.[id]}
                            type={DragItemTypes.EVENT}
                            index={idx}
                            movePost={movePostByHover(events, setEvents)}
                            handleEdit={handleEdit}
                            handleReject={handleReject}
                            className={styles.compilePost}
                          />
                        </li>
                      ))}
                    </ol>
                  ) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <div className={styles.buttonContainer}>
            <button
              className={styles.confirm}
              type="button"
              onClick={handleReleaseUpdate}
            >
              <p>Save</p>
            </button>

            <button
              className={styles.reject}
              type="button"
              onClick={() => router.push('/')}
            >
              <p>Discard Changes</p>
            </button>
          </div>
        </div>
      </SkeletonArea>
    </DndProvider>
  );
};

export default Compile;
