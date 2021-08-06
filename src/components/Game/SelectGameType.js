import React, { useState } from 'react';
import Page from '../common/Page.js';
import CreateGame from './CreateGame.js';
import GameChoiceButton from './GameChoiceButton.js';
import JoinGame from './JoinGame.js';
import JoinRandomGame from './JoinRandomGame.js';

const SelectGameType = () => {
	const [gameMode, setGameMode] = useState(null);
	const selectGameMode = (gameMode) => setGameMode(gameMode);

	const gameType = {
		CREATE: <CreateGame changeGameMode={selectGameMode} />,
		JOIN: <JoinGame changeGameMode={selectGameMode} />,
		RANDOM: <JoinRandomGame changeGameMode={selectGameMode} />,
	};

	return (
		<Page noPadding={true}>
			{!gameMode && (
				<div className='flex h-full w-full px-36 justify-evenly items-center relative gap-12 overflow-hidden text-6xl font-bold '>
					<GameChoiceButton
						content={'Create'}
						bgColor={'bg-purple-600'}
						clickHandler={() => selectGameMode(gameType.CREATE)}
					/>
					<GameChoiceButton
						content={'Join'}
						bgColor={'bg-yellow-600'}
						clickHandler={() => selectGameMode(gameType.JOIN)}
					/>
					<GameChoiceButton
						content={'Random'}
						bgColor={'bg-red-600'}
						clickHandler={() => selectGameMode(gameType.RANDOM)}
					/>
				</div>
			)}
			{gameMode && gameMode}
		</Page>
	);
};

export default SelectGameType;
