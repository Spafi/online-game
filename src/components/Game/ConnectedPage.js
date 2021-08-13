import React from 'react';
import { useTheme } from '../ThemeContext';
import { useGame } from './GameContext';
import anime from 'animejs';

const ConnectedPage = () => {
	const theme = useTheme();
	const game = useGame();
	anime({
		targets: '.counter',
		scale: ['', '100%'],
	});
	return (
		<div
			className={`${theme.flatBackgroundColorSm} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative items-center justify-center`}>
			<div className='counter text-9xl'>
				{game.timeLimit && game.timeLimit <= 3 && game.timeLimit}
			</div>
		</div>
	);
};

export default ConnectedPage;
