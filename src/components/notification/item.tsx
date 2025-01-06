import { createSignal, onCleanup } from 'solid-js';

type ToastProps = {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration: number; // Duration in milliseconds
};

const Toast = (props: ToastProps) => {
	const [visible, setVisible] = createSignal(true);

	// Automatically hide the toast after the specified duration
	setTimeout(() => {
		setVisible(false);
	}, props.duration);

	// A function to apply different styles based on the toast type
	const getToastStyles = (type: 'success' | 'error' | 'info' | 'warning') => {
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

	return (
		visible() && (
			<div
				class={`max-w-xs p-4 rounded-xl shadow-lg ${getToastStyles(
					props.type
				)} fixed bottom-5 left-1/2 transform -translate-x-1/2 mb-3`}
				role='alert'
			>
				<div class='flex'>
					<div class='shrink-0'>
						{/* You can add icons here based on the type */}
						{props.type === 'success' && (
							<div
								class='max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg'
								role='alert'
								tabindex='-1'
								aria-labelledby='hs-toast-error-example-label'
							>
								<div class='flex p-4'>
									<div class='shrink-0'>
										<svg
											class='shrink-0 size-4 text-red-500 mt-0.5'
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											viewBox='0 0 16 16'
										>
											<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'></path>
										</svg>
									</div>
									<div class='ms-3'>
										<p id='hs-toast-error-example-label' class='text-sm text-gray-700'>
											This is an error message.
										</p>
									</div>
								</div>
							</div>
						)}
						{props.type === 'error' && (
							<div
								class='max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg'
								role='alert'
								tabindex='-1'
								aria-labelledby='hs-toast-error-example-label'
							>
								<div class='flex p-4'>
									<div class='shrink-0'>
										<svg
											class='shrink-0 size-4 text-red-500 mt-0.5'
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											viewBox='0 0 16 16'
										>
											<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'></path>
										</svg>
									</div>
									<div class='ms-3'>
										<p id='hs-toast-error-example-label' class='text-sm text-gray-700'>
											This is an error message.
										</p>
									</div>
								</div>
							</div>
						)}
						{props.type === 'info' && (
							<div
								class='max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg'
								role='alert'
								tabindex='-1'
								aria-labelledby='hs-toast-normal-example-label'
							>
								<div class='flex p-4'>
									<div class='shrink-0'>
										<svg
											class='shrink-0 size-4 text-blue-500 mt-0.5'
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											viewBox='0 0 16 16'
										>
											<path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'></path>
										</svg>
									</div>
									<div class='ms-3'>
										<p id='hs-toast-normal-example-label' class='text-sm text-gray-700'>
											This is a normal message.
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
					<div class='ml-3'>
						<p class='text-sm'>{props.message}</p>
					</div>
				</div>
			</div>
		)
	);
};

export default Toast;
