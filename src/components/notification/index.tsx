import { createSignal } from 'solid-js';
import Toast from './item';

const useNotifications = () => {
	const [notifications, setNotifications] = createSignal<
		{ message: string; type: 'success' | 'error' | 'info' | 'warning'; duration: number }[]
	>([]);

	// Function to add a new notification
	const addNotification = (
		message: string,
		type: 'success' | 'error' | 'info' | 'warning',
		duration: number = 3000
	) => {
		setNotifications(prev => [...prev, { message, type, duration }]);
	};

	return { notifications, addNotification };
};

export default useNotifications;
