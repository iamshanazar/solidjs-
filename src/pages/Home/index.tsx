import { type Component } from 'solid-js';
const Home: Component = () => {
	return (
		<div class='p-6 bg-gray-100 min-h-screen'>
			<div class='bg-white p-4 rounded-lg shadow-md mb-6'>
				<div class='flex flex-col md:flex-row max-w-screen-md  items-center gap-4'>
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
							<tr>
								<td class='px-4 py-2 border-b border-gray-200'>John Doe</td>
								<td class='px-4 py-2 border-b border-gray-200'>New York</td>
								<td class='px-4 py-2 border-b border-gray-200'>28</td>
								<td class='px-4 py-2 border-b border-gray-200'>
									<button class='text-blue-500 hover:underline'>Edit</button>
									<button class='ml-2 text-red-500 hover:underline'>Delete</button>
								</td>
							</tr>
							<tr class='bg-gray-50'>
								<td class='px-4 py-2 border-b border-gray-200'>Jane Smith</td>
								<td class='px-4 py-2 border-b border-gray-200'>Los Angeles</td>
								<td class='px-4 py-2 border-b border-gray-200'>32</td>
								<td class='px-4 py-2 border-b border-gray-200'>
									<button class='text-blue-500 hover:underline'>Edit</button>
									<button class='ml-2 text-red-500 hover:underline'>Delete</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Home;
