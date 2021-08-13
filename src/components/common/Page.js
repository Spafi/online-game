import React from 'react';
import { useTheme } from '../ThemeContext';
const Page = ({ children, noPadding }) => {
	const theme = useTheme();

	return (
		<div className={` ml-80 p-12 flex h-screen`}>
			<div
				className={`${theme.flatBackgroundColorSm}  ${
					noPadding ?? 'p-12'
				} min-w-md w-full max-w-6xl h-full rounded-lg  flex flex-col relative`}>
				{children}
			</div>
			<div className='w-72 ml-8'> </div>
		</div>
	);
};

export default Page;
