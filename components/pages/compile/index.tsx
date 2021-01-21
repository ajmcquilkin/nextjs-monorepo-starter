/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import MainWrapper from 'components/layout/mainWrapper';
import { fetchAllPosts as fetchAllPostsImport } from 'store/actionCreators/postActionCreators';

import styles from 'components/pages/compile/compile.module.scss';
import { Post } from 'types/post';

export interface CompilePassedProps {

}

export interface CompileStateProps {
  posts: Post[]
}

export interface CompileDispatchProps {
  fetchAllPosts: typeof fetchAllPostsImport
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

const Compile = ({ posts, fetchAllPosts }: CompileProps): JSX.Element => {
  useEffect(() => { fetchAllPosts(); }, []);

  return (
    <MainWrapper>
      <div className={styles.compileContainer}>
        <h1>Compile</h1>

        <section id="compileHeaderContainer">
          {/* <h2>{getFullDate()}</h2> */}
          <div id="compileHeaderTextContainer">
            <p>* Click on the dots on the left and drag and drop to re-order.</p>
            <p>Auto-saved</p>
          </div>
        </section>

        <section id="compileSubjectContainer">
          <label>
            <h2>Release Subject</h2>
            <input type="text" placeholder="Enter subject of current release" />
          </label>
        </section>

        <section id="compileImageContainer">
          <h2>Header Image (optional)</h2>
          <label>
            <p>Image</p>
            <input type="file" alt="Select image to upload" />
          </label>

          <label>
            <p>Image Caption</p>
            <input type="text" placeholder="Enter image caption here" />
          </label>
        </section>

        <section id="compileQodContainer">
          <h2>Quote of the Day (optional)</h2>

          <label>
            <p>Headline</p>
            <input type="text" placeholder="Enter subject of current release" />
          </label>

          <label>
            <p>Content</p>
            <input type="text" placeholder="Enter subject of current release" />
          </label>
        </section>

        <section id="compileFeaturedContainer">
          <h2>Featured Story (optional)</h2>
          <p>TODO: Add story selector here</p>
        </section>

        <section id="compileNewsContainer">
          <h2>News</h2>
          <SortableList posts={posts} onSortEnd={onSortEnd} />
        </section>

        <section id="compileAnnouncementsContainer">
          <h2>Announcements</h2>
          <SortableList posts={posts} onSortEnd={onSortEnd} />
        </section>

        <section id="compileEventsContainer">
          <h2>Events</h2>
          <SortableList posts={posts} onSortEnd={onSortEnd} />
        </section>

        {/* <button type="submit" onClick={this.publish}>Publish  (undesigned)</button> */}
      </div>
    </MainWrapper>
  );
};

export default Compile;
