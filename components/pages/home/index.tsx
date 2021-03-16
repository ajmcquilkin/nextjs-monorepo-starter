import { useEffect, useState } from 'react';

import LoadingScreen from 'components/layout/loadingScreen';
import HomeSubmission from 'components/submissions/homeSubmission';

import { dispatchAnnouncement as dispatchAnnouncementImport } from 'store/actionCreators/announcementActionCreators';
import { openModal as openModalImport } from 'store/actionCreators/modalActionCreators';
import { fetchReleaseByDate as fetchReleaseByDateImport } from 'store/actionCreators/releaseActionCreators';

import { getFullDate, addNDays } from 'utils';

import { Post, PostPublishType } from 'types/post';
import { Release } from 'types/release';
import { ConnectedThunkCreator, Code } from 'types/state';

import styles from './home.module.scss';

export interface HomePassedProps {

}

export interface HomeStateProps {
  release: Release | null,
  postMap: Record<string, Post>,
  releaseIsLoading: boolean
}

export interface HomeDispatchProps {
  dispatchAnnouncement: ConnectedThunkCreator<typeof dispatchAnnouncementImport>,
  openModal: ConnectedThunkCreator<typeof openModalImport>,
  fetchReleaseByDate: ConnectedThunkCreator<typeof fetchReleaseByDateImport>
}

export type HomeProps = HomePassedProps & HomeStateProps & HomeDispatchProps;

const Home = ({
  release, postMap, releaseIsLoading,
  dispatchAnnouncement, openModal, fetchReleaseByDate
}: HomeProps): JSX.Element => {
  const [active, setActive] = useState<PostPublishType>('news');
  const [code, setCode] = useState<Code>(null);

  useEffect(() => {
    fetchReleaseByDate(Date.now(), {
      failureCallback: (res) => { setCode(res.response?.status || null); }
    });
  }, []);

  if (!release && code) {
    return (
      <LoadingScreen
        title="No release exists for today"
        subtitle="Check back soon for an upcoming release."
      />
    );
  }

  if (releaseIsLoading || !release) {
    return (
      <LoadingScreen
        title="Loading release..."
        subtitle="Please wait while we fetch the requested release."
      />
    );
  }

  dispatchAnnouncement('Release loaded');

  const news = release.news.map((id) => postMap?.[id]);
  const announcements = release.announcements.map((id) => postMap?.[id]);
  const events = release.events.map((id) => postMap?.[id]);

  const featuredPost = release.featuredPost ? postMap?.[release.featuredPost] : null;

  const previousDate = addNDays(release.date, -1);
  const nextDate = addNDays(release.date, 1);

  const getActiveStyleClass = (): string => {
    switch (active) {
      case 'news':
        return styles.news;

      case 'announcement':
        return styles.announcements;

      case 'event':
      default:
        return styles.events;
    }
  };

  return (
    <div className={styles.homeContainer}>
      <section className={styles.homeHeaderContentContainer}>
        <div className={styles.homeHeaderContainer}>
          <div className={styles.homeDateSelectorContainer}>
            <div className={[styles.homeDateSelector, styles.left].join(' ')}>
              <button
                aria-label={`view previous release for ${getFullDate(previousDate)}`}
                type="button"
                onClick={() => {
                  fetchReleaseByDate(previousDate, {
                    failureCallback: () => openModal('ERROR_MODAL', { content: 'There are no articles for this selected date.', bgColor: '#E7E7E7' })
                  });
                }}
              >
                <img src="/icons/left.svg" alt="left arrow - previous release" aria-hidden="true" />
                <p>{getFullDate(previousDate)}</p>
              </button>
            </div>

            {nextDate < Date.now() ? (
              <div className={[styles.homeDateSelector, styles.right].join(' ')}>
                <button
                  type="button"
                  onClick={() => { fetchReleaseByDate(nextDate); }}
                >
                  <p>{getFullDate(nextDate)}</p>
                  <img src="/icons/right.svg" alt="right arrow - next release" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>

          <div className={styles.homeTitleContainer}>
            <div className={styles.homeHeaderTopBar} />

            <div className={styles.homeTitleTextContainer}>
              <h1>{release.subject || 'Vox Daily News'}</h1>
              <p>{getFullDate(release.date)}</p>
            </div>

            <div className={styles.homeHeaderBottomBar} />
          </div>
        </div>

        {release.headerImage && (
          <div className={styles.featuredImageContainer}>
            <img
              src={release.headerImage}
              alt={release.headerImageAlt}
            />
            <p>{release.headerImageCaption}</p>
          </div>
        )}
      </section>

      <section className={styles.homeMainContentContainer}>
        {featuredPost ? (
          <div className={styles.homeFeaturedStoryContainer}>
            <h2>Featured Story</h2>
            <HomeSubmission content={featuredPost} />
          </div>
        ) : null}

        {release.quoteOfDay ? (
          <div className={styles.homeQuoteContainer}>
            <h2>QUOTE OF THE DAY</h2>
            <blockquote>{release.quoteOfDay}</blockquote>
            <p>{release.quotedContext}</p>
          </div>
        ) : <div />}

        <div className={styles.postTypeSelector}>
          <div
            role="tablist"
            aria-label="Post Type"
            className={styles.postTypeTabContainer}
          >
            <button
              role="tab"
              aria-controls="news-content"
              aria-selected={active === 'news'}
              onClick={() => setActive('news')}
              type="button"
              id="news-tab"
            >
              NEWS
            </button>

            <button
              role="tab"
              aria-controls="announcements-content"
              aria-selected={active === 'announcement'}
              onClick={() => setActive('announcement')}
              type="button"
              id="announcements-tab"
            >
              ANNOUNCEMENTS
            </button>

            <button
              role="tab"
              aria-controls="events-content"
              aria-selected={active === 'event'}
              onClick={() => setActive('event')}
              type="button"
              id="events-tab"
            >
              EVENTS
            </button>
          </div>

          <div className={styles.tabUnderlineContainer}>
            <div className={[styles.tabUnderline, getActiveStyleClass()].join(' ')} />
          </div>
        </div>

        <div
          role="tabpanel"
          aria-hidden={active !== 'news'}
          aria-labelledby="news-tab"
          aria-live="assertive"
          aria-atomic="true"
          aria-relevant="additions removals"
          style={{ display: active === 'news' ? 'block' : 'none' }}
          className={styles.postListContainer}
          id="news-content"
        >
          {news.length
            ? news.map((post) => <HomeSubmission key={post._id} content={post} />)
            : <p className={styles.noContent}>No news items within this release.</p>}
        </div>

        <div
          role="tabpanel"
          aria-hidden={active !== 'announcement'}
          aria-labelledby="announcements-tab"
          aria-live="assertive"
          aria-atomic="true"
          aria-relevant="additions removals"
          id="announcements-content"
        >
          <div
            style={{ display: active === 'announcement' ? 'block' : 'none' }}
            className={styles.postListContainer}
          >
            {announcements.length
              ? announcements.map((post) => <HomeSubmission key={post._id} content={post} />)
              : <p className={styles.noContent}>No announcements within this release.</p>}
          </div>
        </div>

        <div
          role="tabpanel"
          aria-hidden={active !== 'event'}
          aria-labelledby="events-tab"
          aria-live="assertive"
          aria-atomic="true"
          aria-relevant="additions removals"
          style={{ display: active === 'event' ? 'block' : 'none' }}
          className={styles.postListContainer}
          id="events-content"
        >
          {events.length
            ? events.map((post) => <HomeSubmission key={post._id} content={post} />)
            : <p className={styles.noContent}>No events within this release.</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
