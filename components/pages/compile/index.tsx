/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  useEffect, useState, ChangeEvent, useCallback
} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MainWrapper from 'components/layout/mainWrapper';

import PostContent from 'components/posts/postContent';
import DraggablePost from 'components/posts/draggablePost';
import DraggablePostList from 'components/posts/draggablePostList';

import {
  fetchReleaseByDate as fetchReleaseByDateImport,
  updateReleaseById as updateReleaseByIdImport,
  createRelease as createReleaseImport
} from 'store/actionCreators/releaseActionCreators';

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
  isLoading: boolean
}

export interface CompileDispatchProps {
  fetchReleaseByDate: ConnectedThunkCreator<typeof fetchReleaseByDateImport>,
  createRelease: ConnectedThunkCreator<typeof createReleaseImport>,
  updateReleaseById: ConnectedThunkCreator<typeof updateReleaseByIdImport>
}

export type CompileProps = CompilePassedProps & CompileStateProps & CompileDispatchProps;

const Compile = ({
  postMap, release, isLoading,
  fetchReleaseByDate, createRelease, updateReleaseById
}: CompileProps): JSX.Element => {
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

  useEffect(() => { fetchReleaseByDate(addNDays(Date.now(), 1)); }, []);

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <MainWrapper>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.compileContainer}>
          <h1>Compile</h1>

          <section id="compileHeaderContainer">
            <h2>{getFullDate()}</h2>
            <div id="compileHeaderTextContainer">
              <p>* Click on the dots on the left and drag and drop to re-order.</p>
              <p>Auto-saved</p>
            </div>
          </section>

          <section id="compileSubjectContainer">
            <label>
              <h2>Release Subject</h2>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>
          </section>

          <section id="compileImageContainer">
            <h2>Header Image (optional)</h2>
            <label>
              <p>Image</p>
              <input
                type="file"
                alt="Select image to upload"
                id="headerImage"
                onChange={(e) => { upload(e); }}
              />

              <div className="imagePreview">
                {imageUploading === true ? <div>Image is uploading</div> : <span />}
                {headerImage ? (
                  <img
                    src={headerImage}
                    alt="optional headerImage"
                  />
                ) : <div />}
              </div>
            </label>

            <label>
              <p>Image Caption</p>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
            </label>
          </section>

          <section id="compileQodContainer">
            <h2>Quote of the Day (optional)</h2>

            <label>
              <p>Headline</p>
              <input
                type="text"
                value={quoteOfDay}
                onChange={(e) => setQuoteOfDay(e.target.value)}
              />
            </label>

            <label>
              <p>Context</p>
              <input
                type="text"
                value={quotedContext}
                onChange={(e) => setQuotedContext(e.target.value)}
              />
            </label>
          </section>

          <section id="compileFeaturedContainer">
            <h2>Featured Story (optional)</h2>
            <DraggablePostList
              acceptType={[DragItemTypes.NEWS, DragItemTypes.ANNOUNCEMENT, DragItemTypes.EVENT]}
              onDrop={(item) => setFeaturedPost(item.id)}
            >
              {featuredPost ? <PostContent content={postMap?.[featuredPost]} /> : <div>No featured post</div>}
            </DraggablePostList>
          </section>

          <section id="compileNewsContainer">
            <h2>News</h2>
            <div>
              {news.map((id, idx) => (
                <DraggablePost
                  postContent={postMap?.[id]}
                  type={DragItemTypes.NEWS}
                  index={idx}
                  movePost={movePost(news, setNews)}
                  key={id}
                />
              ))}
            </div>
          </section>

          <section id="compileAnnouncementsContainer">
            <h2>Announcements</h2>
            <div>
              {announcements.map((id, idx) => (
                <DraggablePost
                  postContent={postMap?.[id]}
                  type={DragItemTypes.ANNOUNCEMENT}
                  index={idx}
                  movePost={movePost(announcements, setAnnouncements)}
                  key={id}
                />
              ))}
            </div>
          </section>

          <section id="compileEventsContainer">
            <h2>Events</h2>
            <div>
              {events.map((id, idx) => (
                <DraggablePost
                  postContent={postMap?.[id]}
                  type={DragItemTypes.EVENT}
                  index={idx}
                  movePost={movePost(events, setEvents)}
                  key={id}
                />
              ))}
            </div>
          </section>

          <button type="button" onClick={handleReleaseUpdate}>Publish  (undesigned)</button>
        </div>
      </DndProvider>
    </MainWrapper>
  );
};

export default Compile;
