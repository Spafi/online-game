import { useGame } from './GameContext';
import React, { useEffect } from 'react';
import Component from './Component.js';

const CodeContainer = () => {
	const game = useGame();

	useEffect(() => {
		showCode(game);
		//eslint-disable-next-line
	}, []);

	const showCode = (game) => game.code;

	return (
		<>
			<Component string={game.code} />
			<div className='text-lg h-24 px-4 py-2'>
				<p>What is the output for int[] n = {'{2, 4, 6}'}</p>
			</div>
		</>
	);
};

export default CodeContainer;
