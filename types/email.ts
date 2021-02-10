/* -------- Generic -------- */

import { Post } from './post';
import { Release } from './release';

export type HTML = string;
export type Email = HTML;

/* -------- State -------- */

/* -------- Action Types -------- */

export type GenerateEmailData = { html: Email };
export type CurateGroupPostsData = { release: Release, posts: Post[] };
