// import { createResource } from 'solid-js';
// import { fetchData } from './index';

// export const useFetchData = (url: () => string) => {
// 	const baseUrl = import.meta.env.VITE_API_URL;
// 	const token = localStorage.getItem('access_token');

// 	const [data, { refetch }] = createResource(
// 		() => ({ url: `${baseUrl}${url()}`, token }),
// 		({ url, token }) => fetchData(url, token)
// 	);

// 	return { data, refetch };
// };
