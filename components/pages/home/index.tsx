import { useEffect, useState } from 'react';

import PostContent from 'components/posts/postContent';
import PostSection from 'components/posts/postSection';
import HomeNavigation from 'components/layout/homeNavigation';

import { openModal as openModalImport } from 'store/actionCreators/modalActionCreators';
import { fetchReleaseByDate as fetchReleaseByDateImport } from 'store/actionCreators/releaseActionCreators';

import { getFullDate, addNDays } from 'utils';

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
  postMap: Record<string, Post>,
  releaseIsLoading: boolean
}

export interface HomeDispatchProps {
  openModal: ConnectedThunkCreator<typeof openModalImport>,
  fetchReleaseByDate: ConnectedThunkCreator<typeof fetchReleaseByDateImport>
}

export type HomeProps = HomePassedProps & HomeStateProps & HomeDispatchProps;

const Home = ({
  release: reduxRelease, postMap: reduxPostMap, releaseIsLoading,
  initialRelease, initialPostMap, openModal, fetchReleaseByDate
}: HomeProps): JSX.Element => {
  const [release, setRelease] = useState<Release | null>(initialRelease);
  const [postMap, setPostMap] = useState<Record<string, Post>>(initialPostMap);

  useEffect(() => {
    if (reduxRelease) setRelease(reduxRelease);
    if (Object.values(reduxPostMap).length) setPostMap(reduxPostMap);
  }, [reduxRelease, reduxPostMap]);

  if (!release || releaseIsLoading) return (<div>Loading...</div>);

  const news = release.news.map((id) => postMap?.[id]);
  const announcements = release.announcements.map((id) => postMap?.[id]);
  const events = release.events.map((id) => postMap?.[id]);

  const featuredPost = release.featuredPost ? postMap?.[release.featuredPost] : null;

  const previousDate = addNDays(release.date, -1);
  const nextDate = addNDays(release.date, 1);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.homeHeaderContentContainer}>

        <div className={styles.homeHeaderContainer}>
          <div className={[styles.homeDateSelector, styles.left].join(' ')}>
            <button
              type="button"
              onClick={() => {
                fetchReleaseByDate(previousDate, {
                  failureCallback: () => openModal('ERROR_MODAL', { content: 'There are no articles for this selected date.', bgColor: '#E7E7E7' })
                });
              }}
            >
              <img src="/left.svg" alt="left arrow" />
              <p>{getFullDate(previousDate)}</p>
            </button>
          </div>

          <div className={styles.homeTitleContainer}>
            <div className={styles.homeHeaderTopBar} />

            <div className={styles.homeTitleTextContainer}>
              <h2>Vox Daily News</h2>
              <p>{getFullDate(release.date)}</p>
            </div>

            <div className={styles.homeHeaderBottomBar} />
          </div>

          {nextDate < Date.now() ? (
            <div className={[styles.homeDateSelector, styles.right].join(' ')}>
              <button
                type="button"
                onClick={() => { fetchReleaseByDate(nextDate); }}
              >
                <p>{getFullDate(nextDate)}</p>
                <img src="/right.svg" alt="right arrow - next release" />
              </button>
            </div>
          ) : null}
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
  );
};

export default Home;
