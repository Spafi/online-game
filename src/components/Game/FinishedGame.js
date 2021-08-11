import { useTheme } from '../ThemeContext';
import { useGame } from './GameContext';

const FinishedGame = () => {
	const darkTheme = useTheme();
	const game = useGame();

	const showWinner = () => {
    const player1 = game.player1
    const player2 = game.player2
		if (player1.score > player2.score) return player1.username + ' won!';
    else if(player2.score > player1.score) return player2.username + ' won!';
    else return 'It\'s a tie!'
	};

	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative items-center justify-center text-center overflow-hidden`}>
			<div className='transform text-9xl '>{showWinner()}</div>
		</div>
	);
};

export default FinishedGame;
