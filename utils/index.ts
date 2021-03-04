import { Group } from 'types/group';
import { Post, PostStatus, PostStatusColors } from 'types/post';

export const backendUrl = `${__APP_URL__}/api/`;
export const requestTimeout = 5000; // ms

export const maxContentLength = 500;

export const maxFileSize = 5242880; // 5MB

export const DragItemTypes = {
  NEWS: 'news',
  ANNOUNCEMENT: 'announcement',
  EVENT: 'event'
};

export const FormGroups: Group[] = [
  {
    name: 'All Students',
    list: [
      {
        name: 'All Undergraduates',
        list: [
          'Enrolled Undergraduates',
          'Class of 2021',
          'Class of 2022',
          'Class of 2023',
          'Class of 2024'
        ]
      },
      'Tuck Students',
      'Thayer Students',
      'Geisel Students',
      'Guarini Students'
    ]
  },

  {
    name: 'All Staff',
    list: [
      'College Staff',
      'Tuck Staff',
      'Thayer Staff',
      'Geisel Staff',
      'Sponsored Accounts'
    ]
  },

  {
    name: 'All Faculty',
    list: [
      'Arts and Sciences Faculty',
      'Tuck Faculty',
      'Thayer Faculty',
      'Geisel Faculty',
      'Emeriti / Special Faculty'
    ]
  }
];

export const getMidnightDate = (date: number): number => {
  const dateInstance = new Date(date);
  dateInstance.setUTCHours(0, 0, 0, 0);
  return dateInstance.getTime();
};

export const addNDays = (date: number, add: number): number => {
  const d = new Date(getMidnightDate(date) || Date.now());
  return d.setUTCDate(d.getUTCDate() + add);
};

export const getFullDate = (date?: number): string => {
  const currentDate = new Date(getMidnightDate(date || Date.now()));

  const day = currentDate.getUTCDate();
  const month = currentDate.getUTCMonth() + 1;
  const year = currentDate.getUTCFullYear();

  return `${month}/${day}/${year}`;
};

export const handleEncodeDate = (date: number): string => {
  const dateObject = new Date(getMidnightDate(date));

  const year = dateObject.getUTCFullYear().toString().padStart(4, '0');
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const handleDecodeDate = (dateString: string): number => {
  const newDate = new Date(dateString);
  return getMidnightDate(newDate.getTime());
};

export const HOURS_MULT = 3600;
export const MINUTES_MULT = 60;
export const SECONDS_MULT = 1;

export const handleEncodeTime = (time: number): string => { // 12,600
  const hours = Math.floor(time / HOURS_MULT);
  const _minutesInit = time % HOURS_MULT;

  const minutes = Math.floor(_minutesInit / MINUTES_MULT);
  const _secondsInit = _minutesInit % MINUTES_MULT;

  const seconds = _secondsInit % SECONDS_MULT;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const handleDecodeTime = (timeString: string): number => {
  const hours = Number(timeString.slice(0, 2));
  const minutes = Number(timeString.slice(3, 5));
  const seconds = Number(timeString.slice(6, 8) || 0);
  return (HOURS_MULT * hours) + (MINUTES_MULT * minutes) + (SECONDS_MULT * seconds);
};

export const encodeRecipientGroups = (recipientGroups: Post['recipientGroups']): Record<string, boolean> => recipientGroups
  .reduce((accum, name) => ({ ...accum, [name]: true }), {});

export const decodeRecipientGroups = (recipientGroups: Record<string, boolean>): Post['recipientGroups'] => Object.entries(recipientGroups)
  .reduce((accum, [name, state]) => (state ? [...accum, name] : accum), []);

export const getColorsForStatus = (status: PostStatus): PostStatusColors => {
  switch (status) {
    case 'draft':
      return {
        primary: '#7C7E80',
        secondary: '#B0B0B0',
        tertirary: '#E6E6E6'
      };

    case 'pending':
      return {
        primary: '#8A6996',
        secondary: '#C2AFC9',
        tertirary: '#E4D9E8'
      };

    case 'approved':
      return {
        primary: '#267ABA',
        secondary: '#A0C5E1',
        tertirary: '#D2E4F1'
      };

    case 'published':
      return {
        primary: '#424141',
        secondary: '#B0B0B0',
        tertirary: '#E6E6E6'
      };

    case 'rejected':
    default:
      return {
        primary: '#E32D1C',
        secondary: '#D7C5C5',
        tertirary: '#FFE8E8'
      };
  }
};

export const uppercaseFirstLetter = (s: string): string => (s.length ? `${s[0].toUpperCase()}${s.slice(1)}` : '');

// Reference: https://www.cambiaresearch.com/articles/46/parsing-urls-with-regular-expressions-and-the-regex-object
export const isValidUrl = (url: string): boolean => /^(?<s1>(?<s0>[^:\/\?#]+):)?(?<a1>\/\/(?<a0>[^\/\?#]*))?(?<p0>[^\?#]*)(?<q1>\?(?<q0>[^#]*))?(?<f1>#(?<f0>.*))?/.test(url);

/**
 * Middleware function to generate standard user-facing error message
 * * Note: to maintain truthiness state of message, if message is considered falsy this function will return an empty string
 * @param {*} message - Message string to render
 */
export const generateFrontendErrorMessage = (message: string): string => (message ? `Error: "${message}"` : '');
