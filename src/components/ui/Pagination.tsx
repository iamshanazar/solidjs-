import { Component, For, Show } from 'solid-js';

interface PaginationProps {
	pages: number; // Total number of pages
	currentPage: number; // Current active page
	onPageChange: (page: number) => void; // Function to handle page change
}

export const Pagination: Component<PaginationProps> = props => {
	const isFirstPage = () => props.currentPage === 1;
	const isLastPage = () => props.currentPage === props.pages;

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= props.pages) {
			props.onPageChange(page);
		}
	};

	const getPageNumbers = () => {
		const pages: number[] = [];
		const range = 2; // Pages to show before and after the current page
		const start = Math.max(1, props.currentPage - range);
		const end = Math.min(props.pages, props.currentPage + range);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<nav class='mt-4 flex justify-center flex-wrap items-center gap-2 m-0' aria-label='Pagination'>
			<ul class='inline-flex flex-wrap -space-x-px text-sm'>
				{/* Previous Button */}
				<li>
					<button
						class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700  disabled:opacity-50'
						disabled={isFirstPage()}
						onClick={() => handlePageChange(props.currentPage - 1)}
					>
						Previous
					</button>
				</li>

				{/* Page Numbers */}
				<For each={getPageNumbers()}>
					{page => (
						<li>
							<button
								class={`flex items-center justify-center px-3 h-8 leading-tight ${
									page === props.currentPage
										? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 '
										: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
								}`}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</button>
						</li>
					)}
				</For>

				{/* Ellipsis for skipped pages */}
				<Show when={props.currentPage + 2 < props.pages}>
					<li>
						<span class='flex items-center justify-center px-3 h-8 text-gray-500'>...</span>
					</li>
					<li>
						<button
							class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
							onClick={() => handlePageChange(props.pages)}
						>
							{props.pages}
						</button>
					</li>
				</Show>

				{/* Next Button */}
				<li>
					<button
						class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700   dark:hover:text-white disabled:opacity-50'
						disabled={isLastPage()}
						onClick={() => handlePageChange(props.currentPage + 1)}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};
