import React from 'react';
import { useTheme } from '../ThemeContext';
const Page = ({ children, noPadding }) => {
	const darkTheme = useTheme();

	return (
		<div className={` ml-80 p-12 flex h-screen`}>
			<div
				className={`${
					darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
				} min-w-md w-full max-w-6xl h-full rounded-lg ${noPadding ?? 'p-12'} flex flex-col relative`}>
				{children}
			</div>
			<div className='w-72 ml-8'>
				{' '}
			
			</div>
		</div>
	);
};

export default Page;
