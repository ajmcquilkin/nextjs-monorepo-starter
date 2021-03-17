<!-- PROJECT HEADER -->
<br />
<p align="center">
  <a href="https://github.com/dali-lab/itc-vox">
    <img src="../../public/favicon.png" alt="Logo" width="80" height="80">
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
      <img src="../../public/banner.png" alt="Vox Daily Banner"  height="180">
    </a>
  </p>
</p>

# Reducers

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#posts-and-releases">Posts and Releases</a></li>
    <li><a href="#requests">Requests</a></li>
    <li><a href="#modals">Modals</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

Reducers within this application are defined within this directory and manage the direct updating of the redux store. These reducers take actions dispatched from action creators and use them to modify the held state within the application. Each reducer manages a subset of the main state, shown below:

```typescript
export interface RootState {
  announcement: AnnouncementState,
  modal: ModalState,
  post: PostState,
  release: ReleaseState
  request: RequestState,
  user: UserState,
}
```

These reducers are combined within `/store/reducers/index.ts` and connected to the redux state within the `/pages/_app.tsx` file. Reducer state definitions are held within the corresponding `/types` file.

> Remember: reducers return state modified **immutably**.

## Posts and Releases

Since the `post` and `release` routers handle dynamic data coming from the backend, they are set up to maintain a single source of truth within their respective redux stores, as shown below:

```typescript
// /types/post.ts

export interface PostState {
  posts: Record<string, Post>,
  results: string[],
  numResults: number
}

// /store/reducers/postReducer.ts

const initialState: PostState = {
  posts: {},
  results: [],
  numResults: 0,
};
```

Note that the `results` array contains an array of strings (document ids) instead of holding documents themselves. This is because the `posts` map is the single source of truth on the frontend for all `post` documents, which means that if the `results` array is holding an array of post references those posts would automatically be updated if a `FETCH_POST` request is handled by the reducer. Because of this, the server will return arrays of posts separately from any fetched `release` objects, which will be handled separately from the main `release` object.

## Requests

The redux state tracks the loading and error states of all outgoing requests associated with an action type (i.e. dispatched by the `createAsyncActionCreator` function). 

```typescript
export interface SingleRequestState {
  isLoading: boolean,
  message: string,
  code: Code
}

export interface RequestState {
  [type: string]: SingleRequestState
}
```

This information can be accessed either by manually polling the `state.requests[actionType]` field or by using the methods discussed within the [request action creators](../actionCreators/README.md) document.

## Modals

Modals are handled within the `store/reducers/modalReducer.ts` file. This file allows for custom modals to be implemented with the following configurable data fields, accessed using the `useModal` hook within the `/components/modals/**` files:

```typescript
export type ModalType = 'ERROR_MODAL' | 'REJECTION_MODAL' | 'REJECTION_REASONING_MODAL' | 'SUBMIT_POST_MODAL' | 'DISCARD_POST_MODAL';

export interface ModalConfig {
  title: string,
  content: string,

  confirm: string,
  reject: string,
  cancel: string,

  bgColor: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE' | null,
  redirect: string,
}

export type Modal = ModalConfig & {
  type: ModalType | null,
}

export type ModalState = {
  type: Modal['type'],

  title: Modal['title'],
  content: Modal['content'],

  bgColor: Modal['bgColor'],
  postId: string | null,
  action: Modal['action'],
  redirect: Modal['redirect']
}
```
