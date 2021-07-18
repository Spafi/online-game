import { useGame } from './GameContext';
import React, { useEffect } from 'react';
import Component from './Component.js';

const CodeContainer = () => {
	const game = useGame();

	useEffect(() => {
		showCode(game);
	}, []);

	const showCode = (game) => game.code;

	return <Component string={game.code} />;
};

export default CodeContainer;
