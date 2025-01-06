import { createSignal, onCleanup } from 'solid-js';

type ToastProps = {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration: number;
	key: number;
};

const Toast = (props: ToastProps) => {
	const [visible, setVisible] = createSignal(true);

	// Hide the toast after the specified duration
	const timeout = setTimeout(() => {
		setVisible(false);
	}, props.duration);

	// Cleanup timeout when the component is destroyed
	onCleanup(() => clearTimeout(timeout));

	// Get styles and icons based on the toast type
	const getToastStyles = (type: string) => {
		switch (type) {
			case 'success':
				return 'bg-teal-500 text-white';
			case 'error':
				return 'bg-red-500 text-white';
			case 'info':
				return 'bg-blue-500 text-white';
			case 'warning':
				return 'bg-yellow-500 text-white';
			default:
				return 'bg-gray-500 text-white';
		}
	};

	const getIcon = (type: string) => {
		switch (type) {
			case 'success':
				return '✅';
			case 'error':
				return '❌';
			case 'info':
				return 'ℹ️';
			case 'warning':
				return '⚠️';
			default:
				return '❔';
		}
	};

	return (
		visible() && (
			<div
				class={`relative m-0 max-w-xs p-4 rounded-xl shadow-lg flex items-center ${getToastStyles(
					props.type
				)} fixed bottom-5 left-1/2 transform -translate-x-1/2`}
				role='alert'
			>
				<span class='mr-3'>{getIcon(props.type)}</span>
				<p>{props.message}</p>
			</div>
		)
	);
};

export default Toast;
