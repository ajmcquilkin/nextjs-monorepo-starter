import { Empty } from 'types/generic';
import { Action } from 'types/state';

/* -------- Generic -------- */

export type Announcement = string;

/* -------- State -------- */

export interface AnnouncementState {
  activeAnnouncement: Announcement,
}

/* -------- Action Types -------- */

export const SET_ANNOUNCEMENT = 'SET_ANNOUNCEMENT';
export const CLEAR_ANNOUNCEMENT = 'CLEAR_ANNOUNCEMENT';

export type SetAnnouncementData = { announcement: string };
export type ClearAnnouncementData = Empty;

type SetAnnouncementAction = Action<typeof SET_ANNOUNCEMENT, SetAnnouncementData>;
type ClearAnnouncementAction = Action<typeof CLEAR_ANNOUNCEMENT, ClearAnnouncementData>;

export type AnnouncementActions = SetAnnouncementAction | ClearAnnouncementAction;
export type AnnouncementActionTypes = typeof SET_ANNOUNCEMENT | typeof CLEAR_ANNOUNCEMENT;
