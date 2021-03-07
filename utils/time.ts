import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

/**
 * Sets default timezone within scope of the dayjs plugin
 */
export const useDefaultTimezone = (): void => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('America/New_York');
};

/**
 * @requires default timezone to be set in or above the scope of this function
 * @param date date to convert to midnight default server time
 * @returns UTC representation of server's midnight time for passed date
 */
export const getDefaultMidnightDate = (date?: number | string): Dayjs => dayjs.tz(date || dayjs()).startOf('date');
