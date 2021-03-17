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

# Database Models

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
  </ol>
</details>

<!-- OVERVIEW -->

## Overview

This application uses the [Mongoose ODM](https://mongoosejs.com/) to manage the shape of MongoDB documents within the application database. The application does this by defining [Schemas](https://mongoosejs.com/docs/guide.html#schemas) and [Models](https://mongoosejs.com/docs/models.html) to constrain the shape of database documents.

Model types from the `/types` directory are used to guide the creation of a Schema, which in turn is used to create a Model. This model can then be used to modify the database via [standard querying](https://mongoosejs.com/docs/queries.html).

> **Note:** Since this application needs to also support serverless deployment, models have to check whether or not they already exist on a valid [mongoose connection](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connection). This is shown below:

```typescript
const PostModel: Model<PostDocument> = mongoose.models.Post || mongoose.model<PostDocument>('Post', PostSchema);
export default PostModel;
```
