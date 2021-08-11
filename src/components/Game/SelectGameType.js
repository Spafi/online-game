import React, { useState, useRef } from 'react';
import Page from '../common/Page.js';
import CreateGame from './CreateGame.js';
import GameChoiceButton from './GameChoiceButton.js';
import GamePage from './GamePage.js';
import JoinGame from './JoinGame.js';
import JoinRandomGame from './JoinRandomGame.js';
import WaitPage from './WaitPage.js';
const SelectGameType = () => {
	const [gameMode, setGameMode] = useState(null);
	const buttonRef = useRef();
	const selectGameMode = (gameMode) => {
		setTimeout(() => {
			setGameMode(gameMode);
		}, 250);
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
							selectGameMode(gameType.CREATE);
						}}
					/>
					<GameChoiceButton
						ref={buttonRef}
						content={'Join'}
						classes={'hover:bg-yellow-600 btn '}
						clickHandler={() => selectGameMode(gameType.JOIN)}
					/>
					<GameChoiceButton
						content={'Random'}
						classes={'hover:bg-red-600 btn'}
						clickHandler={() => selectGameMode(gameType.RANDOM)}
					/>
				</div>
			)}
			{gameMode && gameMode}
		</Page>
	);
};

export default SelectGameType;
