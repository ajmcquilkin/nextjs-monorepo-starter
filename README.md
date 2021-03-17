<!-- PROJECT HEADER -->
<br />
<p align="center">
  <a href="https://github.com/dali-lab/itc-vox">
    <img src="public/favicon.png" alt="Logo" width="80" height="80">
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
      <img src="public/banner.png" alt="Vox Daily Banner"  height="180">
    </a>
  </p>
</p>

# Overview

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#building">Building</a></li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#general-usage">General Usage</a></li>
        <li><a href="#site-pages">Site Pages</a></li>
      </ul>
    </li>
    <li><a href="#environment-variables">Required Environment Variables</a></li>
    <li><a href="#data-models">Data Models</a></li>
    <li>
      <a href="#usage">Core Functionality</a>
      <ul>
        <li><a href="#general-functional-groups">General Functional Groups</a></li>
        <li><a href="#frontend-functional-groups">Frontend Functional Groups</a></li>
        <li><a href="#backend-functional-groups">Backend Functional Groups</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![ITC Vox Overview 1](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bbdcfb3e-2006-4310-9362-5bb5608cce94/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210317T014244Z&X-Amz-Expires=86400&X-Amz-Signature=3b58b4579eb21886c5660bfff859c4d4683285b93a2541c3328506d4f7d8bded&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
![ITC Vox Overview 2](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3e4c3b72-0e88-4f37-965e-6f8aa2672601%2FUntitled.png?table=block&id=b7154621-c05a-4446-a23c-c805f03578ec&name=Untitled.png&userId=7411db3c-7d46-4831-82b4-33cbdb6cea83&cache=v2)
![ITC Vox Overview 3](https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa6376dad-29d3-4626-928d-ee73e57d6a3b%2FUntitled.png?table=block&id=9a4d1b25-4b7e-4a84-90e0-f4601e0a083c&name=Untitled.png&userId=7411db3c-7d46-4831-82b4-33cbdb6cea83&cache=v2)

### Built With

- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

The following pieces of software are required to run this application:

- **nodejs** - download and install [here](https://nodejs.org/en/).

- **npm** - installed with nodejs, updated with the following command:

  ```sh
  npm install npm@latest -g
  ```

- **yarn** - requires npm, install with the following command:

  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/dali-lab/itc-vox.git
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

3. Configure Environment Variables

   The repository is expecting certain variables to be defined within NodeJS' `process.env` object. NextJS automatically loads variables into `process.env` from an `.env.local` file at the root of the project. More information can be found below in the [Environment Variables](#environment-variables) section.

<!-- BUILDING -->

## Building

To use the application in development mode, run the following command:

```shell
yarn dev
```

The application can be deployed either as a collection of serverless functions corresponding to each route in the `/pages` directory, or as a single NodeJS server. To build the application as serverless functions, run the following command:

```shell
yarn export
```

To build the application as a single NodeJS server, run the following command:

```shell
yarn build
```

After either build method, the server can be started with the following command:

```shell
yarn start
```

<!-- USAGE EXAMPLES -->

## Usage

### General Usage

Users of the application will need to authenticate with the application using the CAS protocol. The returned payload from this service will need the following fields:

```typescript
{
  'cas:netid': netId,
  'cas:isReviewer': isReviewer,
  'cas:isStaff': isStaff,
}
```

If a user successfully authenticates, they will be automatically provided an `authenticated` scope (internally `isAuthenticated`). If the user is a staff member, they will gain the `staff` scope (internally `isStaff`). The highest level of authorization is the `reviewer` scope (internally `isReviewer`), which is only held by members of the Office of Communications.

Students will not be able to create, edit, or delete any posts, nor interact with releases in any way.

Staff will only be able to create, edit, and delete their own posts, but not interact with releases in any way.

Reviewers will be able to create their own posts, but will also be able to edit and delete the posts of other users. Additionally, they are able to approve all posts **except their own**. They will also be able to create and edit releases.

### Site Pages

This project is split into the following major pages:

- **Home** (`/`) - Allows users to view the current release (min. `authenticated` scope)
- **Submissions** (`/submissions`) - Allows staff and faculty to view the status of their posts (min. `staff` scope)
- **Form** (`/form/[id]`) - Allows staff and faculty to create and edit posts (min. `staff` scope)
- **Review** (`/review`) - Allows reviewers to approve and deny posts for publication (min. `reviewer` scope)
- **Compile** (`/compile`) - Allows reviewers to curate the next pending release (min. `reviewer` scope)

Users will only be shown the pages they are authorized to access, and even if they enter the URL manually will not be able to interact meaningfully with the page.

<!-- ENV VARIABLES -->

## Environment Variables

The following variables are expected to be defined by the application when starting the server. More information on environment variables in NextJS can be found [here](https://nextjs.org/docs/basic-features/environment-variables).

- **AUTH_SECRET** - used to encrypt traffic within the application (e.g. `"asdflkjasdlkfjkj452438u978ha97y&(089U(*j8Y*&T76GDIHHBkjshd786Hsuhjadkj"`)
- **SESSION_SECRET** - used to encrypt session ids within the application (e.g. `"asdflkjasdlkfjkj452438u978ha97y&(089U(*j8Y*&T76GDIHHBkjshd786Hsuhjadkj"`)
- **MONGODB_URI** - MongoDB connection URI to the application database

- **S3_BUCKET** - S3 bucket name
- **AWS_SECRET_KEY_ID** - Secret AWS key id (provided by AWS)
- **AWS_SECRET_ACCESS_KEY** - Secret AWS access key (provided by AWS)

- **MODE** - `"dev"` or `"production"`, defaults to `"production"`
- **SERVICE_URL** - CAS service URL (e.g. `"http://localhost:3000"`)
- **APP_URL** - Location of application hosting (e.g. `"http://localhost:3000"`)
- **ENABLE_CAS_DEV_MODE** - bypasses CAS server when processing requests (e.g. `true`, defaults to `false`)
- **EMAIL_API_KEY** - API key protecting email generation, data return, and release publishing endpoints (e.g. `"test"`)

These environment variables are loaded into the application via the [Webpack Define Plugin](https://webpack.js.org/plugins/define-plugin/) within the `next.config.js` file, which guarantees there will be a defined value for each of the variables. These defined variables are then given types in the `/types/moudles/global.d.ts` file, after which they can be used within the application as normal variables. Note that there are some variables exposed to the frontend and some that are not within this configuration file.

<!-- DATA MODELS -->

## Data Models

The application uses two data models when interacting with the database:

- **PostModel** - Manages the shape of all documents within the `posts` collection
- **ReleaseModel** - Manages the shape of all documents within the `releases` collection

These models are created with the [mongoose ODM](https://www.npmjs.com/package/mongoose) NPM package.

<!-- CORE FUNCTIONALITY -->

## Core Functionality

This application is split into the following major functional components. Each of the following groups is organized into a respective directory with additional documentation as needed.

### General Functional Groups

- **Types** ([/types](/types/README.md)) - Typescript types governing data flow and type security throughout the appliation
- **Utils** ([/utils](/utils/README.md)) - General utility functions for standardizing application logic

### Frontend Functional Groups

- **Components** ([/components](/components/README.md)) - ReactJS components for rendering the frontend logic to the user
- **Action Creators** ([/store/actionCreators](/store/actionCreators/README.md)) - Redux helpers for dispatching data to the frontend data store
- **Reducers** ([/store/reducers](/store/reducers/README.md)) - Redux helpers for updating the frontend data store based on dispatched information
- **Requests** ([/store/requests](/store/requests/README.md)) - General HTTP request helpers for fetching data from backend data sources

### Backend Functional Groups

- **Controllers** ([/controllers](/controllers/README.md)) - Functions _solely_ responsible for interacting with the database
- **Errors** ([/errors](/errors/README.md)) - Custom error classes responsible for transferring custom error information within the backend
- **Models** ([/models](/models/README.md)) - Helpers determining and enforcing the shape of stored database data, referenced by the controllers
- **Route Handlers** ([/pages](/pages/README.md)) - Endpoints responsible for serving site functionality (data or frontend routes), using controllers (backend) or components (frontend)

<!-- ACCESSIBILITY -->

## Accessibility

This application is fully keyboard accessible and has strong screen reader accessibility. This has been validated on all application pages, and was validated using the open-source [NVDA screen reader](https://www.nvaccess.org/download/).

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/dali-lab/itc-vox/issues) for a list of proposed features (and known issues).

<!-- LICENSE -->

## License

All rights reserved.

<!-- CONTACT -->

## Contact

Dartmouth Applied Learning and Innovation Lab - [@dartmouth_dali_lab](https://dali.dartmouth.edu/)

Project Link: [https://github.com/dali-lab/itc-vox](https://github.com/dali-lab/itc-vox)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
