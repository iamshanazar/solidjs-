import { createSignal, createEffect } from 'solid-js';
import { useFetchData } from '../../utils/api/item';
import { useNavigate } from '@solidjs/router';

const Cahses = () => {
	const [url, setUrl] = createSignal('/teachers');
	const { data, refetch } = useFetchData(url);
	const [teachers, setTeachers] = createSignal([]);
	const [loading, setLoading] = createSignal(true);

	const navigate = useNavigate();
	// Effect to update teachers and loading state when data changes
	createEffect(() => {
		const fetchedData = data();
		if (fetchedData) {
			setTeachers(fetchedData.teachers || []);
			setLoading(false); // Set loading to false once data is available
		}
	});

	return (
		<div class='p-6 bg-gray-100 min-h-screen'>
			<div class='bg-white p-4 rounded-lg shadow-md mb-6'>
				<div class='flex flex-col md:flex-row max-w-screen-md items-center gap-4'>
					<input
						type='text'
						placeholder='Search by name'
						class='w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>

					<input
						type='text'
						placeholder='Search by location'
						class='w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>

					<button class='px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
						Search
					</button>
				</div>

				<h2 class='text-lg font-semibold mb-4 mt-4'>Results</h2>

				<div class='overflow-x-auto'>
					<table class='min-w-full border border-gray-200 text-left'>
						<thead>
							<tr class='bg-gray-100'>
								<th class='px-4 py-2 border-b border-gray-200'>Name</th>
								<th class='px-4 py-2 border-b border-gray-200'>Location</th>
								<th class='px-4 py-2 border-b border-gray-200'>Age</th>
								<th class='px-4 py-2 border-b border-gray-200'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading() ? (
								<tr>
									<td colSpan={4} class='px-4 py-2 justify-center  text-center'>
										<svg
											class='text-gray-300 animate-spin'
											viewBox='0 0 64 64'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
										>
											<path
												d='M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z'
												stroke='currentColor'
												stroke-width='5'
												stroke-linecap='round'
												stroke-linejoin='round'
											></path>
											<path
												d='M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762'
												stroke='currentColor'
												stroke-width='5'
												stroke-linecap='round'
												stroke-linejoin='round'
												class='text-blue-500'
											></path>
										</svg>{' '}
									</td>
								</tr>
							) : teachers().length === 0 ? (
								<tr>
									<td colSpan={4} class='px-4 py-2 text-center'>
										No teachers available
									</td>
								</tr>
							) : (
								teachers().map(teacher => (
									<tr key={teacher.id}>
										<td class='px-4 py-2 border-b'>{teacher.firstname}</td>
										<td class='px-4 py-2 border-b'>{teacher.sirname}</td>
										<td class='px-4 py-2 border-b'>{teacher.job}</td>
										<td class='px-4 py-2 border-b'>
											<button
												onClick={() => navigate(`/cashes/${teacher.id}`)}
												class='text-blue-500 hover:underline'
											>
												Edit
											</button>
											<button class='ml-2 text-red-500 hover:underline'>Delete</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Cahses;
