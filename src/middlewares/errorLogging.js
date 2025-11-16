import { isRejectedWithValue } from '@reduxjs/toolkit';
import { openErrorNotification } from '../components/common/notifications/Notification';

/**
 * Log a warning and show a toast!
 */
export const errorLogging = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    openErrorNotification({ message: action.payload });
  }

  return next(action);
};
