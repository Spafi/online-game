import React from 'react';

const GameChoiceButton = React.forwardRef(
	({ content, clickHandler, classes }, ref) => {
		return (
			<div
				ref={ref}
				onClick={() => typeof clickHandler === 'function' && clickHandler()}
				className={`flex p-2 items-center justify-center transform-gpu rotate-12 h-screen transition duration-500 ease-in-out ${classes} hover:-translate-y-1 hover:scale-110 relative cursor-pointer`}>
				<p className='transform-gpu -rotate-12'>{content}</p>
			</div>
		);
	}
);

export default GameChoiceButton;
