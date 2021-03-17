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

# Database Controllers

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

Controllers are the interaction layer between the route handlers within the `/pages/api` directory and the database models in the `/models` directory. These controllers are responsible for the following:

- Database querying
- Field validation
- Informative error messages

The controllers within this application are all written using the [async / await promise paradigm](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) to simplify promise handling and make the application logic more intuitive.

For more information on the error handling flow within the backend of the application, see the `/errors` directory.
