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

# Route Handlers

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#frontend-overview">Frontend Overview</a></li>
    <li><a href="#backend-overview">Backend Overview</a></li>
    <li>
      <a href="#backend-routes">Backend Routes</a>
      <ul>
        <li><a href="#response-payload-standardization">Response Payload Standardization</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

Within NextJS, all application routes are handled within the `/pages/` directory. This includes all frontend routes ([see here](../README.md)) as well as all API endpoint routes. NextJS designates the `/pages/api` directory as always handling any backend functionality associated with the application, and as such no frontend routes are located within this directory.

## Frontend Overview

NextJS allows for the application to render content to the end user in any of the following three methods:

- **Client-side rendered (CSR)** - content is rendered in the browser
- **Server-side rendered (SSR)** - content is rendered by the server
- **Static site generated (SSG)** - content is pre-rendered and cached for future requests

This application primarily uses CSR to render the frontend in conjunction with SSG. The server will pre-render as much as possible at build time and then use this as the basis for the rendering the remaining content using CSR. Initially this application used SSG completely for the homepage (`/`) but due to the required site authentication wall this no longer optimized site loading since all that could be generated at build time was the "authenticating" screen.

For more information on how to implement these rendering methods within NextJS, [see here](https://nextjs.org/docs/basic-features/pages).

## Backend Overview

As mentioned, the backend of this application is located within the `/pages/api` directory. Each file or subdirectory within this directory corresponds to a new route, which can each contain multiple endpoints.

This application uses a custom framework based on the [next-connect](https://www.npmjs.com/package/next-connect) NPM package which implements the [connect middleware paradigm](https://github.com/senchalabs/connect) within NextJS. This is done with the custom `createDefaultHandler` function, which allows an express-like experience within NextJS.

## Backend Routes

A basic endpoint will have the following structure:

```typescript
// Imports

const handler = createDefaultHandler()
  // Attach middleware
  .use(/* ... */)

  .get(async (req, res) => {
    // Handle GET method
  })

  .put(async (req, res) => {
    // Handle PUT method
  })

  .delete(async (req, res) => {
    // Handle DELETE method
  });

export default handler;
```

This application defines the following custom middleware functions that can be reused across the backend:

- **useDB** - ensures the handler is connected to the database before any route handlers run
- **requireUrlParam** - requires the specified URL parameter before continuing to route handlers

**Note:** `requireUrlParam` is a doubly-executed function (a.k.a. "thunk") that will return a middleware handler after being called with the required url parameter:

```typescript
// Imports

const handler = createDefaultHandler()
  .use(requireUrlParam("id"))

  .get(async (req, res) => {
    // Handle GET method
  });

export default handler;
```

Additional information on the specific requests being made can be found [here](https://www.figma.com/file/Jl9VxFfWZWHOkE1L8o2DJ4/ITC-Vox-21W?node-id=244%3A150).

### Response Payload Standardization

All backend routes are expected to return data in the following form:

```typescript
export interface ServerPayload<D> {
  data: D,
  meta?: {
    success: boolean,
    message?: string,
    isAuthenticated?: boolean
  }
}
```

Response data will be contained within the `data` field, and meta information is contained within the `meta` field. This `meta` field is currently used within the frontend `requests` handlers, and can be expanded to include more relevant site information.

To enforce this payload shape, use the `createSuccessPayload` as shown below:

```typescript
const { id } = req.query;
const foundPost = await postController.read(id as string);
return res.status(200).json(createSuccessPayload<FetchPostData>({ post: foundPost }));
```
