// src/pages/Cahses/item.tsx
import { Component, createEffect, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { requestWithAuth } from '../../utils/api';
import { createStore } from 'solid-js/store';
import { TCashesDetail } from '../../types/cashes';
import dayjs from 'dayjs';

const Item: Component = () => {
	const params = useParams();
	const [loading, setLoading] = createSignal(true);
	const { id } = params;

	const [store, setStore] = createStore({
		cashDetail: [] as TCashesDetail,
		loading: true,
	});

	const fetchData = async (page = 1) => {
		try {
			// Replace '/some-data-endpoint' with the actual endpoint you want to call
			setLoading(true);
			const result = (await requestWithAuth(`/cashes/${id}`)) as TResponse;
			setStore('cashDetail', result.cashes); // Update cashes in the store
		} catch (err) {
			setError(err.message); // Set error if request fails
		} finally {
			setLoading(false); // Set loading state to false
		}
	};

	createEffect(() => {
		fetchData(); // Refetch data when currentPage changes
	});

	return (
		<div class='p-6 bg-gray-100 min-h-screen'>
			<div class='bg-white p-4 rounded-lg shadow-md mb-6'>
				<h2 class='text-lg font-semibold mb-4 '>
					Booking number:
					<span class='text-blue-600'> {id} </span>
				</h2>
				<div class='overflow-x-auto'>
					<table class='min-w-full border border-gray-200 text-left'>
						<thead>
							<tr class='bg-gray-100'>
								<th class='px-4 py-2 border-b border-gray-200'>Amount</th>
								<th class='px-4 py-2 border-b border-gray-200'>Detail</th>
								<th class='px-4 py-2 border-b border-gray-200'>Note</th>
								<th class='px-4 py-2 border-b border-gray-200'>Client</th>
								<th class='px-4 py-2 border-b border-gray-200'>Contact</th>
								<th class='px-4 py-2 border-b border-gray-200'>Created At</th>
							</tr>
						</thead>
						<tbody>
							{store.cashDetail.map(cash => (
								<tr key={cash.uuid} class='hover:bg-gray-100'>
									<td class='px-4 py-2 border-b'>{cash.amount}</td>
									<td class='px-4 py-2 border-b'>{cash.detail}</td>
									<td class='px-4 py-2 border-b'>{cash.note}</td>
									<td class='px-4 py-2 border-b'>{cash.client}</td>
									<td class='px-4 py-2 border-b'>{cash.contact}</td>
									<td class='px-4 py-2 border-b'>
										{dayjs(cash.created_at).format('DD.MM.YYYY HH:mm:ss')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Item;
