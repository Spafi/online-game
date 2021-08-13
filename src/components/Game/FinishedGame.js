import { useTheme } from '../ThemeContext';
import { useGame } from './GameContext';
import anime from 'animejs';
import React, { useState, useEffect } from 'react';

const FinishedGame = () => {
	const theme = useTheme();
	const game = useGame();
	const [result, setResult] = useState('');
	const player1 = game.player1;
	const player2 = game.player2;
	anime({
		targets: '.result',
		scale: ['', '100%'],
	});
	const showWinner = () => {
		let winner = '';
		if (player1.score > player2.score) winner = player1.username + ' won!';
		else if (player2.score > player1.score) winner = player2.username + ' won!';
		else winner = "It's a tie!";
		setResult(winner);
	};

	useEffect(() => {
		showWinner();
    //eslint-disable-next-line
	}, []);

	return (
		<div
			className={`${theme.flatBackgroundColorSm} min-w-md w-full max-w-6xl h-full rounded-lg p-12 flex flex-col gap-24 relative items-center justify-center text-center overflow-hidden`}>
			<div className='transform text-6xl '>
				{player1.username}: {player1.score} / {player2.username}: {player2.score}
			</div>

			<div className='transform text-9xl result'>{result}</div>
		</div>
	);
};

export default FinishedGame;
