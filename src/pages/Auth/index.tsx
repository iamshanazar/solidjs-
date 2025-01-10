import { createSignal, type Component } from 'solid-js';
import user from '/src/assets/user.svg';
import show from '/src/assets/show.svg';
import hideIcon from '/src/assets/hideIcon.svg';
import { postRequest } from '../../utils/api';
import { useNavigate } from '@solidjs/router';
import { useAuth } from './AuthContext';

import { useNotifications } from '../../components/notification/NotificationProvider';

const Login: Component = () => {
	const navigate = useNavigate();
	const [isPasswordVisible, setPasswordVisible] = createSignal(false);
	const [loading, setLoading] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [isAuthenticated, setIsAuthenticated] = createSignal(false);
	const { login } = useAuth();
	const url = import.meta.env.VITE_API_URL;

	console.log(url, 'urrl');
	const { addNotification } = useNotifications();

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setPasswordVisible(!isPasswordVisible());
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const response = await postRequest(`${url}/login`, {
				name: username(),
				password: password(),
			});
			if (response && response.access_token) {
				login(response.access_token); // Use login method
				navigate('/cashes', { replace: true });
				addNotification('Successfully logged in!', 'success');
			}
		} catch (err) {
			console.error(err);
			addNotification('Something went wrong!', 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div class='bg-gray-50 font-[sans-serif]'>
			<div class='min-h-screen flex flex-col items-center justify-center py-6 px-4'>
				<div class='max-w-md w-full'>
					<a href='javascript:void(0)'>
						<img src='/src/assets/logo.png' alt='logo' class='w-40 h-30 mb-8 mx-auto block' />
					</a>

					<div class='p-8 rounded-2xl bg-white shadow'>
						<h2 class='text-gray-800 text-center text-3xl font-bold'>Login</h2>
						<form class='mt-8 space-y-4' onSubmit={handleSubmit}>
							<div>
								<label class='text-gray-800 text-sm mb-2 block'>User name</label>
								<div class='relative flex items-center'>
									<input
										name='username'
										type='text'
										value={username()}
										onInput={e => setUsername(e.currentTarget.value)}
										required
										class='w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600'
										placeholder='Enter user name'
									/>
									<img src={user} class='w-4 h-4 absolute right-4' />
								</div>
							</div>
							<div>
								<label class='text-gray-800 text-sm mb-2 block'>Password</label>
								<div class='relative flex items-center'>
									<input
										name='password'
										type={isPasswordVisible() ? 'text' : 'password'}
										value={password()}
										onInput={e => setPassword(e.currentTarget.value)}
										required
										class='w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600'
										placeholder='Enter password'
									/>
									<img
										src={isPasswordVisible() ? show : hideIcon}
										alt={isPasswordVisible() ? 'Hide password' : 'Show password'}
										class='w-4 h-4 absolute right-4 cursor-pointer'
										onClick={togglePasswordVisibility}
									/>
								</div>
							</div>

							<div class='!mt-8'>
								<button
									type='submit'
									class='w-full py-3 px-4 text-md tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
									disabled={loading()}
								>
									{loading() ? 'Loading...' : 'Login'}
								</button>
							</div>
						</form>
						{error() && <div class='text-red-500 mt-2'>{error()}</div>}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
