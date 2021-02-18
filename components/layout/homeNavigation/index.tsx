import { useState } from 'react';
import { PostPublishType } from 'types/post';

import homeStyles from 'components/pages/home/home.module.scss';
import styles from './homeNavigation.module.scss';

export interface MobileNavigationProps {
  newsLength: number,
  announcementeLength: number,
  eventsLength: number,
  active: PostPublishType
}

const HomeNavigation = ({
  newsLength, announcementeLength, eventsLength, active = 'news'
}: MobileNavigationProps): JSX.Element => {
  const [clicked, setClicked] = useState<PostPublishType | ''>(active);

  const update = (clickType: PostPublishType) => {
    document.getElementById(clicked)?.classList.replace(homeStyles.postSectionContainerActive, homeStyles.postSectionContainer);
    setClicked(clickType);
    document.getElementById(clickType)?.classList.replace(homeStyles.postSectionContainer, homeStyles.postSectionContainerActive);
  };

  return (
    <nav className={styles.mobileNavigationContainer}>
      <ul className={styles.buttonList}>
        <li className={[styles.buttonListItem, clicked === 'news' ? styles.active : ''].join(' ')}>
          <button onClick={() => { update('news'); }} type="button">
            News (
            {newsLength}
            )
          </button>
        </li>
        <li className={[styles.buttonListItem, clicked === 'announcement' ? styles.active : ''].join(' ')}>
          <button onClick={() => { update('announcement'); }} type="button">
            Announcements (
            {announcementeLength}
            )
          </button>
        </li>
        <li className={[styles.buttonListItem, clicked === 'event' ? styles.active : ''].join(' ')}>
          <button onClick={() => { update('event'); }} type="button">
            Events (
            {eventsLength}
            )
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavigation;
