import { type Component } from 'solid-js';

export const Header: Component = () => {
	return (
		<header class='shadow-md font-sans tracking-wide relative z-50'>
			<div class='flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]'>
				<a href='javascript:void(0)'>
					<img src='/src/assets/logo.png' alt='logo' class='w-12' />
				</a>

				<div
					id='collapseMenu'
					class='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'
				>
					<ul class='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
						<li class='mb-6 hidden max-lg:block'>
							<a href='javascript:void(0)'>
								<img src='https://readymadeui.com/readymadeui.svg' alt='logo' class='w-36' />
							</a>
						</li>
						<li class='max-lg:border-b max-lg:py-3 px-3'>
							<a
								href='javascript:void(0)'
								class='hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]'
							>
								Cashes
							</a>
						</li>
						<li class='max-lg:border-b max-lg:py-3 px-3'>
							<a
								href='javascript:void(0)'
								class='hover:text-[#007bff] text-[#333] block font-bold text-[15px]'
							>
								Ranges
							</a>
						</li>
					</ul>
				</div>

				<div class='flex max-lg:ml-auto'>
					<button id='toggleOpen' class='lg:hidden'>
						<svg class='w-7 h-7' fill='#000' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<path
								fill-rule='evenodd'
								d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
								clip-rule='evenodd'
							></path>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};