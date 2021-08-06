import React from 'react';
import { useTheme } from '../ThemeContext';

const JoinRandomGame = ({ children, changeGameMode }) => {
	const darkTheme = useTheme();
	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative`}>
			{children}
			random
			<button onClick={() => changeGameMode(null)}> Back</button>
		</div>
	);
};

export default JoinRandomGame;
