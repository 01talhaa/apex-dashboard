// utils/notification.ts

import { addNotification } from '~/store/notifications';

export function showNotification(
    message: string,
    type: 'success' | 'error' | 'warning',
    duration: number = 4000
) {
    addNotification(message, type, duration);
}
