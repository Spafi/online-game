import React from 'react';

const GameChoiceButton = ({ content, clickHandler, bgColor }) => {
	return (
		<div
			onClick={() => typeof clickHandler === 'function' && clickHandler()}
			className={`flex items-center justify-center transform rotate-12 h-screen transition duration-500 ease-in-out hover:${bgColor} hover:-translate-y-1 hover:scale-110 relative cursor-pointer`}>
			<p className='transform -rotate-12'>{content}</p>
		</div>
	);
};

export default GameChoiceButton;
