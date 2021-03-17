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

# Action Creators

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#requests">Requests</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

This application uses [redux](https://redux.js.org/) to manage frontend global error state, and the action creators defined within this directory allow components to communicate with this store using the [react-redux](https://react-redux.js.org/) package. Additionally, this application uses the [redux-thunk](https://www.npmjs.com/package/redux-thunk) package to enable asyncronous action creators, in turn allowing action creators to handle API loading and error states within the application.

This application features the following types of action creators:

- **announcements** - handles accessibility global announcements for screen readers
- **modals** - handles the dispatching of modals within the application
- **posts** - handles the management of posts
- **releases** - handles the management of releases
- **requests** - handles the state of outgoing API requests (loading, error)
- **users** - handles authentication and CAS information

Asynchronous action creators within this application are built on a helper function known as `createAsyncActionCreator`. This helper function automatically handles outgoing API requests and tracks their loading and error states. A typical usage of this function looks like this:

```typescript
export const fetchPostById = (
  id: string,
  additionalConfig: AsyncActionCreatorConfig<FetchPostData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST',
  () => postRequests.fetchPostByIdRequest(id),
  additionalConfig
);
```

Note that `createAsyncActionCreator` is returned from `fetchPostById`, which itself is a double function ("thunk"). This is a pattern used by the redux-thunk package to allow for the dispatching of functions as actions. The first call of the function configures the action creator, with an `id` and `additionalConfig` parameter in this case, and the second call (called internally by redux) will pass the redux `dispatch` function to the thunk, which then passes it along with other config information to `createAsyncActionCreator`, which internally dispatches the data resulting from the request to the redux store.

Note that this action creator doesn't call the `axios` package itself but instead delegegates this role to a request function. This abstraction allows increased flexibility with interacting with the backend in the event that a request will not be dispatched to the redux store.

To summarize, the `createAsyncActionCreator` function takes the following parameters:

```typescript
{
  dispatch: GlobalDispatch,
  type: ActionTypes,
  axiosFetchCallback: () => Promise<RequestReturnType<Data>>,
  config: AsyncActionCreatorConfig<Data, AddlPayload> = {}
}
```

- **dispatch** - redux `dispatch` funtion
- **type** - action type to include in dispatched actions
- **axiosFetchCallback** - request callback to fetch data with
- **config** - additional config with the following parameters:

```typescript
{
  successCallback?: (res: RequestReturnType<Data>) => void,
  failureCallback?: (error: AxiosError<ServerPayload<Data>>) => void,
  additionalPayloadFields?: AddlPayload
}
```

- **successCallback** - callback function called after a successful request
- **failureCallback** - callback function called after a failed request
- **additionalPayloadFields** - user-defined additional payload fields to attach to the `action.payload` field

These action creators can be used within components in the standard way using `mapDispatchToProps` and the `connect` function from `react-redux`.

## Requests

The action creators in the `/store/actionCreators/requestActionCreators.ts` file function differently from other action creators. Since the `requestReducer` manages only internal data, the methods within this file focus on interacting with that data. Besides setting and clearing errors based on action types, this function exposts the following functions:

```typescript
const createLoadingSelector: (watchActionTypes: ActionTypes[]) => (state: RootState) => boolean;
const createErrorSelector: (watchActionTypes: ActionTypes[]) => (state: RootState) => string;
const createErrorCodeSelector: (watchActionTypes: ActionTypes[]) => (state: RootState) => Code;
```

All of these functions take an array of action types to "watch", and will return values corresponding to the state of these actions within the `requests` reducer.

- The `createLoadingSelector` polls the passed `ActionType` variables and returns whether _any_ of them are marked as loading within the `requests` reducer.

- The `createErrorSelector` polls the passed `ActionType` variables and returns the _first_ found error message (if any), based on the order of the `watchActionTypes` array (default: `''`).

- The `createErrorCodeSelector` polls the passed `ActionType` variables and returns the _first_ found error code (code < 200 || code >= 400), if any (default: `null`)

These functions are doubly-executed functions ("thunks") intended to be configured then used within a `mapStateToProps` function. Multiple selectors can be used within a single `mapStateToProps` function.

```typescript
const postLoadingSelector = createLoadingSelector(['FETCH_POST', 'DELETE_POST']);

const mapStateToProps = (state: RootState, ownProps: FormProps): FormStateProps => ({
  postIsLoading: postLoadingSelector(state)
});
```
