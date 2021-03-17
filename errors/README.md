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
      <img src="../public/banner.png" alt="Vox Daily Banner" height="180">
    </a>
  </p>
</p>

# Custom Application Errors

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#global-error-handling-flow">Global Error Handling Flow</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

This application uses a custom error handling paradigm to handle backend errors intuitively and in a standard way. This solution is based on the `BaseError` class which extends the builtin `Error` class. This directory also includes custom error classes corresponding to HTTP status codes that extend `BaseError`. Below is an example of a basic custom error class:

```typescript
// /errors/baseError.ts

import { Code } from 'types/state';

class BaseError extends Error {
  code: Code;

  name: string;

  message: string;

  constructor(message: string, code: Code) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

export default BaseError;

// /errors/documentNotFoundError.ts

import BaseError from './BaseError';

class DocumentNotFoundError extends BaseError {
  id: string;

  info: string;

  constructor(id: string, info = '') {
    super(`Document with id "${id}" not found${info ? ` (${info})` : ''}`, 404);

    this.id = id;
    this.info = info;
  }
}

export default DocumentNotFoundError;
```

## Global Error Handling Flow

The error shown above would be thrown within a controller in the event that a document is not found per a given query. The controller method could choose to handle it, but if it doesn't the error is passed up to the calling router. If the calling router chooses not to handle the error, the error is passed up to the `createDefaultHandler` method. Since this function is the "top" of the error chain within NextJS, it is required to handle all unhandled errors within the routers.

This is done with a custom `controllers/errorController` method which determines if the thrown error is an instance of the `BaseError` class. If it is, the server returns a status code and message based on that error instance. If not, the server responds with a default `500` message and the builtin `error.message` field. This handler also sets the `meta.success` field to `false`. Below is this custom error handler:

```typescript
export const handleError = (
  error: Error, req: ServerRequestType, res: ServerResponseType<ServerFailurePayload>
): void => {
  const responsePayload: ServerFailurePayload = { meta: { message: error.message, success: false, isAuthenticated: !!req?.session?.info } };
  return res.status(error instanceof BaseError ? (Number(error.code) || 500) : 500).json(responsePayload);
};
```
