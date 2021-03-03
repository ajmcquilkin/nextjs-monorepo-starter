/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import {
  useEffect, useState, ChangeEvent, useCallback
} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import SkeletonArea from 'components/helpers/skeletonArea';
import GenericSkeletonWrapper from 'components/helpers/genericSkeletonWrapper';
import SubmissionSkeleton from 'components/submissions/submissionSkeleton';

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

const Compile = ({
  postMap, release, postResults, isLoading,
  fetchReleaseByDate, createRelease, updateReleaseById, fetchPostsByDate, openModal
}: CompileProps): JSX.Element => {
  const router = useRouter();

  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const [subject, setSubject] = useState<Release['subject']>('');
  const [headerImage, setHeaderImage] = useState<Release['headerImage']>('');
  const [imageCaption, setImageCaption] = useState<Release['imageCaption']>('');
  const [quoteOfDay, setQuoteOfDay] = useState<Release['quoteOfDay']>('');
  const [quotedContext, setQuotedContext] = useState<Release['quotedContext']>('');
  const [featuredPost, setFeaturedPost] = useState<Release['featuredPost']>(null);

  const [news, setNews] = useState<string[]>(release?.news || []);
  const [announcements, setAnnouncements] = useState<string[]>(release?.announcements || []);
  const [events, setEvents] = useState<string[]>(release?.events || []);

  const releaseDate = addNDays(Date.now(), 1);

  useEffect(() => {
    fetchReleaseByDate(releaseDate);
    fetchPostsByDate(releaseDate);
  }, []);

  useEffect(() => {
    setSubject(release?.subject || '');
    setHeaderImage(release?.headerImage || '');
    setImageCaption(release?.imageCaption || '');
    setQuoteOfDay(release?.quoteOfDay || '');
    setQuotedContext(release?.quotedContext || '');
    setFeaturedPost(release?.featuredPost || null);

    setNews(release?.news || []);
    setAnnouncements(release?.announcements || []);
    setEvents(release?.events || []);
  }, [release]);

  useEffect(() => {
    if (!release) {
      setNews(postResults.filter((post) => post.type === 'news').map((post) => post._id));
      setAnnouncements(postResults.filter((post) => post.type === 'announcement').map((post) => post._id));
      setEvents(postResults.filter((post) => post.type === 'event').map((post) => post._id));
    }
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

  const handleReleaseUpdate = async () => {
    const body = {
      subject,
      headerImage,
      imageCaption,
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

  const movePost = useCallback((list: string[], setter: (value: string[]) => void) => (dragIndex: number, hoverIndex: number) => {
    const immutableArray = [...list];
    [immutableArray[dragIndex], immutableArray[hoverIndex]] = [immutableArray[hoverIndex], immutableArray[dragIndex]];
    setter(immutableArray);
  }, [news, announcements, events]);

  const handleEdit = (_id: string) => router.push(`/form/${_id}`);
  const handleReject = (_id: string) => openModal('REJECTION_MODAL', { postId: _id });

  return (
    <DndProvider backend={HTML5Backend}>
      <SkeletonArea isLoading={isLoading}>
        <div className={styles.compileContainer}>
          <h1>Compile</h1>

          <section>
            <h2>{getFullDate(releaseDate)}</h2>
            <div id="compileHeaderTextContainer">
              <p>* Click on the dots on the left and drag and drop to re-order.</p>
            </div>
          </section>

          <CompileSection title="Release Subject">
            <GenericSkeletonWrapper>
              <label>
                <input
                  type="text"
                  placeholder="Enter subject line for email"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </label>
            </GenericSkeletonWrapper>
          </CompileSection>

          <CompileSection title="Header Image (optional)">
            <GenericSkeletonWrapper>
              <label>
                <input
                  type="file"
                  alt="Select image to upload"
                  id="headerImage"
                  onChange={(e) => { upload(e); }}
                />

                <div>
                  {imageUploading === true ? <p>Uploading...</p> : <span />}
                  {headerImage ? (
                    <>
                      <p>Uploaded Image</p>
                      <img
                        src={headerImage}
                        alt="optional headerImage"
                        width={400}
                      />
                    </>
                  ) : <div />}
                </div>
              </label>
            </GenericSkeletonWrapper>

            <GenericSkeletonWrapper>
              <label>
                <p>Image Caption</p>
                <input
                  type="text"
                  placeholder="Give a caption for the featured image"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                />
              </label>
            </GenericSkeletonWrapper>
          </CompileSection>

          <CompileSection title="Quote of the Day (optional)">
            <GenericSkeletonWrapper>
              <label>
                <p>Headline</p>
                <input
                  type="text"
                  placeholder="Enter quote of the day"
                  value={quoteOfDay}
                  onChange={(e) => setQuoteOfDay(e.target.value)}
                />
              </label>
            </GenericSkeletonWrapper>

            <GenericSkeletonWrapper>
              <label>
                <p>Context</p>
                <input
                  type="text"
                  placeholder="Give context about the quoted individual"
                  value={quotedContext}
                  onChange={(e) => setQuotedContext(e.target.value)}
                />
              </label>
            </GenericSkeletonWrapper>
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
                      : <div className={styles.featuredPostEmpty}>Drag featured post here</div>}
                  </div>
                )}
            </DraggablePostTarget>
          </CompileSection>

          <CompileSection title="News">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {news.length ? news.map((id, idx) => (
                    <DraggablePost
                      postContent={postMap?.[id]}
                      type={DragItemTypes.NEWS}
                      index={idx}
                      movePost={movePost(news, setNews)}
                      handleEdit={handleEdit}
                      handleReject={handleReject}
                      className={styles.compilePost}
                      key={id}
                    />
                  )) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <CompileSection title="Announcements">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {announcements.length ? announcements.map((id, idx) => (
                    <DraggablePost
                      postContent={postMap?.[id]}
                      type={DragItemTypes.ANNOUNCEMENT}
                      index={idx}
                      movePost={movePost(announcements, setAnnouncements)}
                      handleEdit={handleEdit}
                      handleReject={handleReject}
                      className={styles.compilePost}
                      key={id}
                    />
                  )) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <CompileSection title="Events">
            {isLoading
              ? <SubmissionSkeleton status="approved" />
              : (
                <>
                  {events.length ? events.map((id, idx) => (
                    <DraggablePost
                      postContent={postMap?.[id]}
                      type={DragItemTypes.EVENT}
                      index={idx}
                      movePost={movePost(events, setEvents)}
                      handleEdit={handleEdit}
                      handleReject={handleReject}
                      className={styles.compilePost}
                      key={id}
                    />
                  )) : <p className={styles.noContent}>No content.</p>}
                </>
              )}
          </CompileSection>

          <div className={styles.buttonContainer}>
            <button className={styles.confirm} type="button" onClick={handleReleaseUpdate}>Save Release</button>
            <button className={styles.reject} type="button" onClick={() => router.push('/')}>Discard Changes</button>
          </div>
        </div>
      </SkeletonArea>
    </DndProvider>
  );
};

export default Compile;
