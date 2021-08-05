import React from 'react';
import Page from '../common/Page.js';

const CreateGamePage = () => {
	return (
		<Page>
			<div className='flex h-full w-full px-36 justify-evenly items-center relative gap-7 overflow-hidden text-6xl font-bold cursor-pointer'>
				<div className='flex items-center justify-center transform rotate-12 w-full h-screen transition duration-500 ease-in-out bg-purple-500 hover:bg-purple-600 hover:-translate-y-1 hover:scale-110 relative '>
					<p className='transform -rotate-12'>Create</p>
				</div>
				<div className='flex items-center justify-center transform rotate-12 w-full h-screen transition duration-500 ease-in-out bg-yellow-500 hover:bg-yellow-600 hover:-translate-y-1 hover:scale-110 relative '>
					<p className='transform -rotate-12'>Join</p>
				</div>
				<div className='flex items-center justify-center transform rotate-12 w-full h-screen transition duration-500 ease-in-out bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:scale-110 relative '>
					<p className='transform -rotate-12'>Random</p>
				</div>
			</div>
		</Page>
	);
};

export default CreateGamePage;
