const baseUrl = import.meta.env.VITE_API_URL;

export const postRequest = async (url: string, data: any) => {
	try {
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (err) {
		console.error('Post request error:', err);
		throw err;
	}
};

const refreshToken = async (): Promise<string | null> => {
	try {
		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken) {
			throw new Error('No refresh token available.');
		}

		const response = await fetch(`${baseUrl}/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (!response.ok) {
			console.error(`Failed to refresh token: ${response.statusText}`);
			return null;
		}

		const { access_token, refresh_token: newRefreshToken } = await response.json();
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.setItem('access_token', access_token);
		localStorage.setItem('refresh_token', newRefreshToken);
		return access_token;
	} catch (error) {
		console.error('Error refreshing token:', error);
		return null;
	}
};

export const requestWithAuth = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	let token = localStorage.getItem('access_token');
	if (token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	try {
		const response = await fetch(`${baseUrl}${url}`, options);

		if (response.status === 403) {
			// Attempt to refresh the token
			token = await refreshToken();
			if (!token) throw new Error('Session expired, please log in again.');

			// Retry the request with the new token
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${token}`,
			};
			const retryResponse = await fetch(`${baseUrl}${url}`, options);

			if (!retryResponse.ok) {
				throw new Error(`Error: ${retryResponse.statusText}`);
			}
			return await retryResponse.json();
		}

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Request with auth failed:', error);
		throw error;
	}
};
