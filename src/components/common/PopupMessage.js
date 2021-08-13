import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useTheme } from '../ThemeContext';

const RegisterSuccess = ({ isActive, closeModal, content }) => {
	const theme = useTheme();

	return (
		<Transition appear show={isActive}>
			<Transition.Child
				as={Fragment}
				enter='ease-out duration-300'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='ease-in duration-200'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'>
				<div>
					<div
						className={`${theme.flatBackgroundColorSm} absolute right-12 top-12 p-4 pt-2 ml-12  rounded-xl flex text-md  `}>
						<p>
							{content}
							<span className='text-3xl cursor-pointer pl-2' onClick={closeModal}>
								&times;
							</span>
						</p>
						<span className='absolute rounded-full h-5 w-5 bg-purple-500 -right-2 -top-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
						</span>
					</div>
				</div>
			</Transition.Child>
		</Transition>
	);
};

export default RegisterSuccess;
