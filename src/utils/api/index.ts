//  Utility function to make a POST request

export const postRequest = async (url: string, data: any) => {
	try {
		const response = await fetch(url, {
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
		throw err;
	}
};

export const fetchData = async (url: string, token?: string) => {
	try {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
