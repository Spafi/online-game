import React, { useState } from 'react';
import Page from '../common/Page.js';
import CreateGame from './CreateGame.js';
import GameChoiceButton from './GameChoiceButton.js';
import GamePage from './GamePage.js';
import JoinGame from './JoinGame.js';
import JoinRandomGame from './JoinRandomGame.js';
import WaitPage from './WaitPage.js';
import anime from 'animejs/lib/anime.es';

const SelectGameType = () => {
	const [gameMode, setGameMode] = useState(null);

	const selectGameMode = async (gameMode, bg) => {
		const a = anime({ targets: '.btn', color: bg, duration: 0.1 }).finished;
		const animation = anime({
			targets: '.btn',
			width: '300px',
			scaleX: '*=10',
			easing: 'easeInQuad',
			duration: 5,
		}).finished;

		await Promise.all([a, animation]);

		setTimeout(() => {
			setGameMode(gameMode);
		}, 300);
	};

	const gameStatus = {
		WAIT: <WaitPage />,
		IN_PROGRESS: <GamePage />,
		FINISHED: <div>over</div>,
	};

	const gameType = {
		CREATE: (
			<CreateGame changeGameMode={selectGameMode} gameStatus={gameStatus} />
		),
		JOIN: <JoinGame changeGameMode={selectGameMode} gameStatus={gameStatus} />,
		RANDOM: (
			<JoinRandomGame changeGameMode={selectGameMode} gameStatus={gameStatus} />
		),
	};

	return (
		<Page noPadding={true}>
			{!gameMode && (
				<div className='flex h-full w-full px-36 justify-evenly items-center relative gap-12 overflow-hidden text-6xl font-bold'>
					<GameChoiceButton
						content={'Create'}
						classes={'hover:bg-purple-600 btn'}
						clickHandler={() => {
							selectGameMode(gameType.CREATE, '#7C3AED');
						}}
					/>
					<GameChoiceButton
						content={'Join'}
						classes={'hover:bg-yellow-600 btn'}
						clickHandler={() => selectGameMode(gameType.JOIN, '#D97706')}
					/>
					<GameChoiceButton
						content={'Random'}
						classes={'hover:bg-red-600 btn'}
						clickHandler={() => selectGameMode(gameType.RANDOM, '#DC2626')}
					/>
				</div>
			)}
			{gameMode && gameMode}
		</Page>
	);
};

export default SelectGameType;
