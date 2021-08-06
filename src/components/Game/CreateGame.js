import React from 'react';
import { useTheme } from '../ThemeContext';

const CreateGame = ({ children, changeGameMode }) => {
	const darkTheme = useTheme();
	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative`}>
			{children}
			create
			<button onClick={() => changeGameMode(null)}> Back</button>
		</div>
	);
};

export default CreateGame;
