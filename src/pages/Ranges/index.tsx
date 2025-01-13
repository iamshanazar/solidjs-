import { createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import dayjs from 'dayjs';
import { useNavigate } from '@solidjs/router';
// import { requestWithAuth } from './api'; // Import the requestWithAuth function
import { requestWithAuth } from '../../utils/api/index';
import { Pagination } from '../../components/ui/Pagination';

type TResponse = {
	cashes: TCashes[];
	total: number;
};

const Cahses = () => {
	const [cashes, setCashes] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	const [totalPages, setTotalPages] = createSignal();
	const [currentPage, setCurrentPage] = createSignal(1); // Start at page 1
	const [error, setError] = createSignal();
	const navigate = useNavigate();

	const fetchData = async (page = 1) => {
		try {
			// Replace '/some-data-endpoint' with the actual endpoint you want to call
			setLoading(true);
			const result = (await requestWithAuth(`/ranges?page=${page}`)) as TResponse;
			setCashes(result.ranges);
			setTotalPages(result.total);
		} catch (err) {
			setError(err.message); // Set error if request fails
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	createEffect(() => {
		fetchData(currentPage()); // Refetch data when tphe page changes
	});

	const handlePageChange = (page: number) => {
		setCurrentPage(page); // Update the current page
	};

	return (
		<div class='p-6 bg-gray-100 min-h-screen'>
			<div class='bg-white p-4 rounded-lg shadow-md mb-6'>
				{/* <div class='flex flex-col md:flex-row max-w-screen-md items-center gap-4'>
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
				</div> */}

				<h2 class='text-lg font-semibold mb-4 mt-4'>Results</h2>

				<div class='overflow-x-auto'>
					<table class='min-w-full border border-gray-200 text-left'>
						<thead>
							<tr class='bg-gray-100 text-center'>
								<th class='border border-gray-300 px-4 py-2'>Client</th>
								<th class='border border-gray-300 px-4 py-2'>1</th>
								<th class='border border-gray-300 px-4 py-2'>5</th>
								<th class='border border-gray-300 px-4 py-2'>10</th>
								<th class='border border-gray-300 px-4 py-2'>20</th>
								<th class='border border-gray-300 px-4 py-2'>50</th>
								<th class='border border-gray-300 px-4 py-2'>100</th>
								<th class='border border-gray-300 px-4 py-2'>Date</th>
								<th class='border border-gray-300 px-4 py-2'>Total</th>
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
							) : cashes().length === 0 ? (
								<tr>
									<td colSpan={4} class='px-4 py-2 text-center'>
										No teachers available
									</td>
								</tr>
							) : (
								cashes().map(item => (
									<tr key={item.uuid} class='text-center'>
										<td class='border border-gray-300 px-4 py-2'>{item.client}</td>
										<td class='border border-gray-300 px-4 py-2'>{item.currencies.one.amount}</td>
										<td class='border border-gray-300 px-4 py-2'>{item.currencies.five.amount}</td>
										<td class='border border-gray-300 px-4 py-2'>{item.currencies.ten.amount}</td>
										<td class='border border-gray-300 px-4 py-2'>
											{item.currencies.twenty.amount}
										</td>
										<td class='border border-gray-300 px-4 py-2'>{item.currencies.fifty.amount}</td>
										<td class='border border-gray-300 px-4 py-2'>
											{item.currencies.one_hundred.amount}
										</td>
										<td class='border border-gray-300 px-4 py-2'>
											{dayjs(item.detail).format('DD.MM.YYYY')}
										</td>
										<td class='border border-gray-300 px-4 py-2 font-bold'>{item.total_amount}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					{/* <Pagination
						pages={totalPages()}
						currentPage={currentPage()}
						onPageChange={page => {
							if (page !== currentPage()) handlePageChange(page);
						}}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default Cahses;
