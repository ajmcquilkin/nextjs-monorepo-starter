<!-- PROJECT HEADER -->
<br />
<p align="center">
  <a href="https://github.com/dali-lab/itc-vox">
    <img src="../public/favicon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ITC Vox</h3>

  <p align="center">
    Redesigning the experience of the Vox Daily email announcement system at Dartmouth College.
    <br />
    <a href="https://github.com/dali-lab/itc-vox"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dali-lab/itc-vox">View Repo</a>
    ·
    <a href="https://github.com/dali-lab/itc-vox/issues">Report Bug</a>
    ·
    <a href="https://github.com/dali-lab/itc-vox/issues">Request Feature</a>
  </p>

  <br />

  <p align="center">
    <a href="https://github.com/dali-lab/itc-vox">
      <img src="../public/banner.png" alt="Vox Daily Banner"  height="180">
    </a>
  </p>
</p>

# Frontend Components

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#pages">Pages</a></li>
    <li><a href="#styling">Styling</a></li>
    <li><a href="#layout">Layout</a></li>
    <li><a href="#modals">Modals</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

This route contains all UI elements for displaying to the end user of the application. These components are organized into directories based on functionality, and each component directory is of the following form:

```text
/componentNameLowerCamel
  index.tsx
  componentNameLowerCamel.module.scss
  [componentNameLowerCamel.tsx]
```

The main layout is _always_ expored from the `index.tsx` file, either directly or indirectly through the react-redux `connect` function. If a component is purely presentational all of its JSX will be contained within the `index.tsx` file and directly exported. If a component is connected to the redux store, its JSX will be contained within the `componentNameLowerCamel.tsx` file and imported into the `index.tsx` file. This is to maintain separation between passing redux props into a component and the component itself, since there are use cases within this application in which a component will both use redux props (exported from `index.tsx`) and have these props passed via other components (exported from `componentNameLowerCamel.tsx`).

Styling will always be present within the `componentNameLowerCamel.module.scss` file and imported into the main JSX file.

> **Note:** this project uses SCSS modules (SCSS with CSS modules), which mean styles are imported in the following manner:

```typescript
import styles from "./form.module.scss";

/* ... */

return <div className={styles.container}>Content</div>;
```

Components must _always_ export their prop types along with the component JSX. These prop types will always be defined alongside the component's JSX. Below is an example of a redux-independent component layout:

```typescript
import { PostPublishType, PostStatus } from "types/post";
import styles from "./filterBar.module.scss";

export interface FilterBarProps {
  status: PostStatus;
}

const FilterBar = ({ status }: FilterBarProps): JSX.Element => (
  <div className={styles.filterBarContainer}>{/* ... */}</div>
);

export default FilterBar;
```

> **Note:** This project uses absolute imports for typescript files, but uses relative imports for component-specific styling files. This is to allow support for [SCSS module intellisense plugins](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules) within VSCode.

Below is an example of a redux-connected component:

`componentNameLowerCamel.tsx`

```typescript
import { useState, useEffect } from "react";

export interface AnnouncementLiveTextStateProps {
  content: string;
}

export interface AnnouncementLiveTextDispatchProps {}

export interface AnnouncementLiveTextPassedProps {}

export type AnnouncementLiveTextProps = AnnouncementLiveTextStateProps &
  AnnouncementLiveTextDispatchProps &
  AnnouncementLiveTextPassedProps;

const AnnouncementLiveText = ({
  content,
}: AnnouncementLiveTextProps): JSX.Element => {
  const [displayContent, setDisplayContent] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      setDisplayContent(content);
      const timeout = setTimeout(() => setDisplayContent(null), 5000);
      return clearTimeout(timeout);
    }
  }, [content]);

  return (
    <span
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="text"
      className="visually-hidden"
    >
      {displayContent}
    </span>
  );
};

export default AnnouncementLiveText;
```

`index.tsx`

```typescript
import { connect } from "react-redux";
import AnnouncementLiveText, {
  AnnouncementLiveTextStateProps,
  AnnouncementLiveTextDispatchProps,
  AnnouncementLiveTextPassedProps,
} from "components/helpers/announcementLiveText/announcementLiveText";
import { RootState } from "types/state";

const mapStateToProps = (state: RootState): AnnouncementLiveTextStateProps => ({
  content: state.announcement.activeAnnouncement,
});

const connector = connect<
  AnnouncementLiveTextStateProps,
  AnnouncementLiveTextDispatchProps,
  AnnouncementLiveTextPassedProps
>(mapStateToProps, {});

export default connector(AnnouncementLiveText);
```

The `index.tsx` file imports the component JSX as well as its required props (organized into redux state props, redux dispatch props, and redux passed props) from `componentNameLowerCamel.tsx`. This pattern allows for type safety within redux as well as within the component as a whole.

## Pages

Pages are the one exception to the above directory layout rules, since NextJS requires pages to be managed within the `/pages` directory. This means that pages are connected to the redux store within the `/pages` directory, while the `/components/pages` directory only holds JSX, prop types, and styling.

## Styling

Styling is managed within the application using the [SCSS language](https://sass-lang.com/) as well as [CSS Modules](https://github.com/css-modules/css-modules). Global styles are stored in functionally-separated files within the root `/styles` directory, and are imported with the `@use` [SCSS directive](https://sass-lang.com/documentation/at-rules/use).

## Layout

Global application layout is standardized with the `components/layout/mainWrapper` component. This component wraps its passed children with site-standard components, such as the site header and footer.

## Modals

Modals are standardized using the `ModalWrapper` and `ModalContainer` components. These components render modals based on the `modal` reducer state and provide standard buttons, titles, and close icons, respectively. This flow is managed with redux and the [react-modal](https://www.npmjs.com/package/react-modal) plugin, chosen for ease of use and proven accessibility.
