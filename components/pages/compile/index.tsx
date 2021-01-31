/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, ChangeEvent } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import MainWrapper from 'components/layout/mainWrapper';
import {
  fetchReleaseByDate as fetchReleaseByDateImport,
  updateReleaseById as updateReleaseByIdImport,
  createRelease as createReleaseImport
} from 'store/actionCreators/releaseActionCreators';

import { getFullDate } from 'utils';
import uploadImage from 'utils/s3';

import { Post } from 'types/post';
import { Release } from 'types/release';

import styles from './compile.module.scss';

export interface CompilePassedProps {

}

export interface CompileStateProps {
  posts: Post[],
  release: Release | null,
  isLoading: boolean
}

export interface CompileDispatchProps {
  fetchReleaseByDate: typeof fetchReleaseByDateImport,
  createRelease: typeof createReleaseImport,
  updateReleaseById: typeof updateReleaseByIdImport
}

export type CompileProps = CompilePassedProps & CompileStateProps & CompileDispatchProps;

// Reference: https://stackoverflow.com/questions/51585585/why-does-the-react-sortable-hoc-basic-example-fail-to-compile-with-typescript
const SortableItem = SortableElement(({ post }: { post: Post }) => <li>{post.briefContent}</li>);

const SortableList = SortableContainer(({ posts = [] }: { posts: Post[] }) => (
  <ul>
    {posts.map((post, index) => (
      <SortableItem key={post._id} index={index} post={post} />
    ))}
  </ul>
));

const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
  console.log(`Sort ended from ${oldIndex} to ${newIndex}`);
};

const Compile = ({
  posts, release, isLoading,
  fetchReleaseByDate, createRelease, updateReleaseById
}: CompileProps): JSX.Element => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const [subject, setSubject] = useState<Release['subject']>('');
  const [headerImage, setHeaderImage] = useState<Release['headerImage']>('');
  const [imageCaption, setImageCaption] = useState<Release['imageCaption']>('');
  const [quoteOfDay, setQuoteOfDay] = useState<Release['quoteOfDay']>('');
  const [quotedContext, setQuotedContext] = useState<Release['quotedContext']>('');
  const [featuredPost, setFeaturedPost] = useState<Release['featuredPost']>(null);

  useEffect(() => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    fetchReleaseByDate(nextDate.getTime());
  }, []);

  useEffect(() => {
    setSubject(release?.subject || '');
    setHeaderImage(release?.headerImage || '');
    setImageCaption(release?.imageCaption || '');
    setQuoteOfDay(release?.quoteOfDay || '');
    setQuotedContext(release?.quotedContext || '');
    setFeaturedPost(release?.featuredPost || null);
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
      featuredPost
    };

    if (release) updateReleaseById(release._id, body);
    else createRelease(body);
  };

  return (
    isLoading ? (<p>content is loading </p>) : (
      <MainWrapper>
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
                <img
                  src={headerImage}
                  alt="optional headerImage"
                />
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
            <p>TODO: Add story selector here</p>
          </section>

          <section id="compileNewsContainer">
            <h2>News</h2>
            <SortableList
              posts={release ? posts.filter(({ _id }) => release.news.includes(_id)) : []}
              onSortEnd={onSortEnd}
            />
          </section>

          <section id="compileAnnouncementsContainer">
            <h2>Announcements</h2>
            <SortableList
              posts={release ? posts.filter(({ _id }) => release.announcements.includes(_id)) : []}
              onSortEnd={onSortEnd}
            />
          </section>

          <section id="compileEventsContainer">
            <h2>Events</h2>
            <SortableList
              posts={release ? posts.filter(({ _id }) => release.events.includes(_id)) : []}
              onSortEnd={onSortEnd}
            />
          </section>

          <button type="button" onClick={handleReleaseUpdate}>Publish  (undesigned)</button>
        </div>
      </MainWrapper>
    )
  );
};

export default Compile;
