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

# Requests

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

Requests within the frontend of the application are handled with the [axios] NPM package within the `/store/requests` directory. Each request takes any required configuration necessary to make the request and calls the `createBackendAxiosRequest` which sets default parameters on the request (i.e. `timeout` and `baseUrl`) and dispatches the request. The `createBackendAxiosRequest` takes an [axios configuration object](https://github.com/axios/axios#axios-api) as the only parameter and returns the request object being made. Below is a sample request method:

```typescript
export const createReleaseRequest = (
  fields: Partial<Release>
): Promise<RequestReturnType<FetchReleaseData>> => createBackendAxiosRequest({
  method: 'POST',
  url: '/release',
  data: fields
});
```
