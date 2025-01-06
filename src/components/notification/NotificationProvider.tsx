import { createSignal, createContext, useContext, ParentComponent } from 'solid-js';
import Toast from './Toast'; // Import the Toast component

type Notification = {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration: number;
};

type NotificationContextValue = {
	addNotification: (
		message: string,
		type: 'success' | 'error' | 'info' | 'warning',
		duration?: number
	) => void;
};

const NotificationContext = createContext<NotificationContextValue>();

export const NotificationProvider: ParentComponent = props => {
	const [notifications, setNotifications] = createSignal<Notification[]>([]);

	const addNotification = (
		message: string,
		type: 'success' | 'error' | 'info' | 'warning',
		duration: number = 3000
	) => {
		setNotifications(prev => [...prev, { message, type, duration }]);
		setTimeout(() => {
			setNotifications(prev => prev.slice(1)); // Remove the first notification after duration
		}, duration);
	};

	return (
		<NotificationContext.Provider value={{ addNotification }}>
			{props.children}
			{/* Updated position styles */}
			<div class='fixed top-6 right-2 space-y-2 z-50'>
				{notifications().map((notification, index) => (
					<Toast
						key={index}
						message={notification.message}
						type={notification.type}
						duration={notification.duration}
					/>
				))}
			</div>
		</NotificationContext.Provider>
	);
};

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
	return context;
};
