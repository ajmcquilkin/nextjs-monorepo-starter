import { useEffect } from 'react';

import MainWrapper from 'components/layout/mainWrapper';
import PostSection from 'components/posts/postSection';
import PostSectionSummary from 'components/posts/postSectionSummary';

import { getFullDate } from 'utils';
import { Post } from 'types/post';
import { GenericActionCreator } from 'types/state';

import styles from './home.module.scss';

export interface HomePassedProps {

}

export interface HomeStateProps {
  posts: Post[],
}

export interface HomeDispatchProps {
  fetchPosts: GenericActionCreator;
}

export type HomeProps = HomePassedProps & HomeStateProps & HomeDispatchProps;

const Home = ({ posts, fetchPosts }: HomeProps): JSX.Element => {
  useEffect(() => { fetchPosts(); }, []);

  const itemArray: Post[] = JSON.parse(JSON.stringify(posts));
  itemArray.sort((a, b) => a.publishOrder - b.publishOrder);

  return (
    <MainWrapper>
      <div className={styles.homeContainer}>
        <section className={styles.homeHeaderContentContainer}>
          <div className={styles.homeTitleContainer}>
            <div className="section-bar" />
            <div className={styles.homeTitleTextContainer}>
              <h2>Vox Daily News</h2>
              <p>{getFullDate()}</p>
            </div>
            <div className="section-bar" />
          </div>

          <img
            src="https://www.insubuy.com/assets/img/schools/dartmouth-college.jpg"
            alt="dartmouth college in the fall"
          />
        </section>

        <section className={styles.homeMainContentContainer}>
          <div className={styles.homeFeaturedStoryContainer}>
            <h3>Featured Story</h3>
            <p>
              Dartmouth College is committed to providing a safe, equitable, and respectful environment for all
              members of the Dartmouth Community. The College&apos;s goal is to integrate these values into all we do
              at Dartmouth -- teaching, research, public service, student activities, and business operations.
              To guide us toward this goal, the College has developed programs and tools, which are described on our
              Compliance Resources web page. More text to reach 500 words. This is how much 500 characters looks like.
            </p>
          </div>

          <div className={styles.homeItemSectionSummaryContainer}>
            <div className={styles.homeItemSectionSummaryContainerLeft}>
              <PostSectionSummary title="News" posts={itemArray.filter((post) => post.type === 'news')} hideFrom />
              <PostSectionSummary title="Announcements" posts={itemArray.filter((post) => post.type === 'announcement')} />
            </div>
            <PostSectionSummary title="Events" posts={itemArray.filter((post) => post.type === 'event')} />
          </div>

          <div className={styles.homeQuoteContainer}>
            <h4>QUOTE OF THE DAY</h4>
            <blockquote>
              Both political parties are thinking tactically at a time when we need a
              strategy for rebuilding a governing coalition capable of passing legislation
              without using a narrow majority to bludgeon the other side into submission.
            </blockquote>
            <div>
              <p>Charles Wheelan &apos;88</p>
              <p>
                Senior lecturer and policy fellow and his co-author, Judd Gregg,
                former N.H. governor and senator, in a CNN opinion piece.
              </p>
            </div>
          </div>
        </section>

        <section>
          <PostSection
            title="news"
            subtitle="from the office of communications"
            posts={itemArray.filter((item) => item.type === 'news')}
          />

          <PostSection
            title="announcements"
            posts={itemArray.filter((item) => item.type === 'announcement')}
          />

          <PostSection
            title="events"
            posts={itemArray.filter((item) => item.type === 'event')}
          />
        </section>
      </div>
    </MainWrapper>
  );
};

export default Home;
