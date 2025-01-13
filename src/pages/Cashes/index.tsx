import { createSignal, createEffect } from 'solid-js';
import dayjs from 'dayjs';
import { useNavigate } from '@solidjs/router';
import { createStore } from 'solid-js/store';
// import { requestWithAuth } from './api'; // Import the requestWithAuth function
import { requestWithAuth } from '../../utils/api/index';
import { Pagination } from '../../components/ui/Pagination';
import type { TCashes, TResponse } from '../../types/cashes';

const Cahses = () => {
	const [loading, setLoading] = createSignal(true);
	const [store, setStore] = createStore({
		cashes: [] as TCashes[],
		loading: true,
		totalPages: 0,
		currentPage: 1,
		error: undefined as string | undefined,
	});

	const navigate = useNavigate();

	const fetchData = async (page = 1) => {
		try {
			// Replace '/some-data-endpoint' with the actual endpoint you want to call
			setLoading(true);
			const result = (await requestWithAuth(`/cashes?page=${page}`)) as TResponse;
			setStore('cashes', result.cashes); // Update cashes in the store
			setStore('totalPages', result.total);
		} catch (err) {
			setStore('error', err.message);
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	createEffect(() => {
		fetchData(store.currentPage); // Refetch data when currentPage changes
	});

	const handlePageChange = (page: number) => {
		setStore('currentPage', page); // Update the current page in the store
	};

	return (
		<div class='p-6 bg-gray-100 min-h-screen'>
			<div class='bg-white p-4 rounded-lg shadow-md mb-6'>
				<div class='flex flex-col md:flex-row max-w-screen-md items-center gap-4'>
					<input
						type='text'
						placeholder='phone number'
						class='w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>

					<input
						type='text'
						placeholder='booking_number'
						class='w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<input
						type='text'
						placeholder='terminal'
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
								<th class='px-4 py-2 border-b border-gray-200'>Amount</th>
								<th class='px-4 py-2 border-b border-gray-200'>Detail</th>
								<th class='px-4 py-2 border-b border-gray-200'>Created at</th>
								<th class='px-4 py-2 border-b border-gray-200'>Updated at</th>
							</tr>
						</thead>
						<tbody>
							{loading() ? (
								<tr>
									<td colSpan={5} class='text-center py-6'>
										<div class='flex justify-center items-center space-x-2'>
											<svg
												class='animate-spin h-12 w-12 text-blue-500'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
											>
												<circle
													class='opacity-25'
													cx='12'
													cy='12'
													r='10'
													stroke='currentColor'
													strokeWidth='4'
												></circle>
												<path
													class='opacity-75'
													fill='currentColor'
													d='M4 12a8 8 0 018-8v8z'
												></path>
											</svg>
											<span class='text-gray-500'>Loading data...</span>
										</div>
									</td>
								</tr>
							) : store.cashes.length === 0 ? (
								<tr>
									<td colSpan={4} class='px-4 py-2 text-center'>
										No teachers available
									</td>
								</tr>
							) : (
								store.cashes.map(cash => (
									<tr
										key={cash.detail}
										class='hover:bg-gray-100 cursor-pointer'
										onClick={() => navigate(`/cashes/${cash.detail}`)}
									>
										<td class='px-4 py-2 border-b'>{cash.amount}</td>
										<td
											class='px-4 py-2 border-b  text-blue-600 hover:underline '
											onClick={() => navigate(`/cashes/${cash.detail}`)}
											class=''
										>
											{cash.detail}
										</td>
										<td class='px-4 py-2 border-b'>
											{dayjs(cash.created_at).format('DD.MM.YYYY HH:mm:ss')}
										</td>
										<td class='px-4 py-2 border-b'>
											{dayjs(cash.updated_at).format('DD.MM.YYYY HH:mm:ss')}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					<Pagination
						pages={store.totalPages}
						currentPage={store.currentPage}
						onPageChange={page => {
							if (page !== store.currentPage) handlePageChange(page);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Cahses;
