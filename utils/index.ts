import { Group } from 'types/group';
import { PostStatus, PostStatusColors } from 'types/post';

export const backendUrl = `${__APP_URL__}/api/`;
export const requestTimeout = 5000; // ms

export const maxContentLength = 500;

export const DragItemTypes = {
  NEWS: 'news',
  ANNOUNCEMENT: 'announcement',
  EVENT: 'event'
};

export const FormGroups: Group[] = [
  {
    name: 'All Students',
    list: [
      { name: 'All Undergraduates', list: [] },
      'Tuck Students',
      'Thayer Students',
      'Geisel Students',
      'Guarini Students'
    ]
  },

  {
    name: 'All Staff',
    list: [
      'Arts and Sciences Faculty',
      'Tuck Faculty',
      'Thayer Faculty',
      'Geisel Faculty',
      'Emeriti / Special Faculty'
    ]
  },

  {
    name: 'All Faculty',
    list: [
      'College Staff',
      'Tuck Staff',
      'Thayer Staff',
      'Geisel Staff',
      'Sponsored Accounts'
    ]
  }
];

export const addNDays = (date: number, add: number): number => {
  const d = new Date(date || Date.now());
  return d.setDate(d.getDate() + add);
};

export const getFullDate = (date?: number): string => {
  const currentDate = new Date(date || Date.now());
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${month}/${day}/${year}`;
};

export const handleEncodeDate = (date: number): string => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear().toString().padStart(4, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const handleDecodeDate = (date: string): number => {
  const newDate = new Date(date);
  return newDate.getTime();
};

export const getMidnightDate = (date: number): number => {
  const dateInstance = new Date(date);
  dateInstance.setUTCHours(0, 0, 0, 0);
  return dateInstance.getTime();
};

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

/**
 * Middleware function to generate standard user-facing error message
 * * Note: to maintain truthiness state of message, if message is considered falsy this function will return an empty string
 * @param {*} message - Message string to render
 */
export const generateFrontendErrorMessage = (message: string): string => (message ? `Error: "${message}"` : '');
