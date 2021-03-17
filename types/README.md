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

# Types

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

The `/types` directory is responsible for defining globally-used applicaition types, for example defining the shape of `Post` and `Release` objects. This is done in Typescript ([more info](https://www.typescriptlang.org/docs/handbook/2/objects.html)), and these types are then used both in the frontend and the backend. While component prop types are the one exception to this rule, all other types within the application are defined within this directory. This is to enforce good typing practice as well as to ensure that all types are held in a single source of truth.

Types can reference other type files, and this is very common within the redux types. Each reducer will have a defined state, defined actions, and defined payload shape that are all defined here. For more information see [/store/actionCreators](../store/actionCreators/README.md).
