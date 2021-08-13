import React from 'react';
import { useTheme } from '../ThemeContext';

const JoinRandomGame = ({ children, changeGameMode }) => {
	const theme = useTheme();
	return (
		<div
			className={`${theme.flatBackgroundColorSm} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative`}>
			{children}
			random
			<button onClick={() => changeGameMode(null)}> Back</button>
		</div>
	);
};

export default JoinRandomGame;
