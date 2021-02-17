import MainWrapper from 'components/layout/mainWrapper';

import PostContent from 'components/posts/postContent';
import PostSection from 'components/posts/postSection';
import HomeNavigation from 'components/homeNavigation';

import { fetchReleaseByDate as fetchReleaseByDateImport } from 'store/actionCreators/releaseActionCreators';

import { getFullDate } from 'utils';

import { Post } from 'types/post';
import { Release } from 'types/release';
import { ConnectedThunkCreator } from 'types/state';

import styles from './home.module.scss';

export interface HomePassedProps {
  initialRelease: Release | null,
  initialPostMap: Record<string, Post>
}

export interface HomeStateProps {
  release: Release | null,
  postMap: Record<string, Post>
}

export interface HomeDispatchProps {
  fetchReleaseByDate: ConnectedThunkCreator<typeof fetchReleaseByDateImport>
}

export type HomeProps = HomePassedProps & HomeStateProps & HomeDispatchProps;

const Home = ({
  release: reduxRelease, postMap: reduxPostMap, initialRelease, initialPostMap, fetchReleaseByDate
}: HomeProps): JSX.Element => {
  const release = reduxRelease ?? initialRelease;
  const postMap = Object.values(reduxPostMap).length ? reduxPostMap : initialPostMap;

  if (!release) return (<div>Loading...</div>);

  const news = release.news.map((id) => postMap?.[id]);
  const announcements = release.announcements.map((id) => postMap?.[id]);
  const events = release.events.map((id) => postMap?.[id]);

  const featuredPost = postMap?.[release.featuredPost as string];

  return (
    <MainWrapper>
      <div className={styles.homeContainer}>
        <section className={styles.homeHeaderContentContainer}>
          <div className={styles.homeTitleContainer}>
            <div className={styles.homeHeaderTopBar} />
            <div className="section-bar" />
            <div className={styles.homeTitleTextContainer}>
              <h2>Vox Daily News</h2>
              <p>{getFullDate()}</p>
            </div>
            <div className="section-bar" />
            <div className={styles.homeHeaderBottomBar} />
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

          <div className={styles.homeQuoteContainer}>
            <h4>Quote of the Day</h4>
            <blockquote>{release.quoteOfDay}</blockquote>
            <p>{release.quotedContext}</p>
          </div>
        </section>

        <div className={styles.mobileNavContainer}>
          <HomeNavigation
            newsLength={news.length}
            announcementeLength={announcements.length}
            eventsLength={events.length}
            active="news"
          />
        </div>

        <section>
          <div id="news" className={styles.postSectionContainerActive}>
            <PostSection
              title="News"
              subtitle="from the office of communications"
              posts={news}
            />
          </div>

          <div id="announcement" className={styles.postSectionContainer}>
            <PostSection
              title="Announcements"
              posts={announcements}
            />
          </div>

          <div id="event" className={styles.postSectionContainer}>
            <PostSection
              title="Events"
              posts={events}
            />
          </div>
        </section>
      </div>
    </MainWrapper>
  );
};

export default Home;
