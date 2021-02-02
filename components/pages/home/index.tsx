import MainWrapper from 'components/layout/mainWrapper';

import PostContent from 'components/posts/postContent';
import PostSection from 'components/posts/postSection';
import PostSectionSummary from 'components/posts/postSectionSummary';

import { getFullDate } from 'utils';

import { Post } from 'types/post';
import { Release } from 'types/release';

import styles from './home.module.scss';

export interface HomePassedProps {
  release: Release | null,
  releasePostMap: Record<string, Post>
}

const Home = ({ release, releasePostMap }: HomePassedProps): JSX.Element => {
  if (!release) return (<div>Loading...</div>);

  const news = release.news.map((id) => releasePostMap?.[id]);
  const announcements = release.announcements.map((id) => releasePostMap?.[id]);
  const events = release.events.map((id) => releasePostMap?.[id]);

  const featuredPost = releasePostMap?.[release.featuredPost as string];

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
          {featuredPost ? (
            <div className={styles.homeFeaturedStoryContainer}>
              <h3>Featured Story</h3>
              <PostContent content={featuredPost} />
            </div>
          ) : null}

          <div className={styles.homeItemSectionSummaryContainer}>
            <div className={styles.homeItemSectionSummaryContainerLeft}>
              <PostSectionSummary title="News" posts={news} hideFrom />
              <PostSectionSummary title="Announcements" posts={announcements} />
            </div>
            <PostSectionSummary title="Events" posts={events} />
          </div>

          <div className={styles.homeQuoteContainer}>
            <h4>Quote of the Day</h4>
            <blockquote>{release.quoteOfDay}</blockquote>
            <p>{release.quotedContext}</p>
          </div>
        </section>

        <section>
          <PostSection
            title="News"
            subtitle="from the office of communications"
            posts={news}
          />

          <PostSection
            title="Announcements"
            posts={announcements}
          />

          <PostSection
            title="Events"
            posts={events}
          />
        </section>
      </div>
    </MainWrapper>
  );
};

export default Home;
