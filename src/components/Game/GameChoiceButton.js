import React from 'react';
import anime from 'animejs/lib/anime.es';
const GameChoiceButton = React.forwardRef(
	({ content, clickHandler, classes }, ref) => {
		const onClickHandler = () => {
			const a = anime({ targets: '.p', opacity: '0%' });
			a.play();
			const animation = anime({
				targets: '.btn',
				width: '300px',
				scaleX: '*=10',
				easing: 'easeInQuad',
				duration: 6,
			});
			animation.play();

			typeof clickHandler === 'function' && clickHandler();
		};
		return (
			<div
				ref={ref}
				onClick={() => onClickHandler()}
				className={`flex p-2 items-center justify-center transform-gpu rotate-12 h-screen transition-transform duration-500 ease-in-out ${classes} hover:-translate-y-1 hover:scale-110 relative cursor-pointer`}>
				<p className='transform-gpu -rotate-12 p'>{content}</p>
			</div>
		);
	}
);

export default GameChoiceButton;
