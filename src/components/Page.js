import React from 'react';
import { useTheme } from './ThemeContext';
const Page = ({ children }) => {
	const darkTheme = useTheme();

	return (
		<div className={` ml-80 p-12 flex h-screen`}>
			<div
				className={`${
					darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
				} w-full h-full rounded-lg p-12 flex flex-col relative`}>
				{children}
			</div>
			<div className='w-72 ml-8'>
				{' '}
				{/* <button className='w-full h-1/3 border-2' onClick={connect}>
					Connect
				</button>
				<button className='w-full h-1/3 border-2' onClick={sendName}>
					Send
				</button>
				<button className='w-full h-1/3 border-2' onClick={disconnect}>
					Disconnect
				</button> */}
			</div>
		</div>
	);
};

export default Page;
