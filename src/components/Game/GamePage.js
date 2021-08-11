import CodeContainer from './ProblemContainer';
import ChoicesContainer from './ChoicesContainer';
import ProgressBar from './ProgressBar';
import { useTheme } from '../ThemeContext';
import { useGame } from './GameContext';

const GamePage = () => {
	const darkTheme = useTheme();
	const game = useGame();

	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col relative`}>
			{/* MAIN GAME CONTAINER */}
			{/* SCORE & PLAYERS CONTAINER*/}
			<div className='w-full space-y-8'>
				{/* SCORE CONTAINER */}
				<div className='h-10 flex items-center space-x-6 text-5xl font-medium'>
					<div className=' min-w-24'>{game.player1.score}</div>
					<div className=' flex-grow items-center'>
						<ProgressBar progress={0} />
					</div>
					<div className=' min-w-24 text-right'>{game.player2.score}</div>
				</div>
				{/* PLAYERS CONTAINER */}
				<div className='h-max pb-4 grid grid-cols-7 items-center justify-center text-2xl'>
					<div className='col-span-3'>{game.player1.username} </div>
					<div className='text-center '>VS</div>
					<div className='col-span-3 text-right'>{game.player2.username}</div>
				</div>
			</div>
			<CodeContainer
				className='rounded-lg w-full relative h-full flex-grow-1'
				readOnly={true}
			/>
			<ChoicesContainer />
		</div>
	);
};

export default GamePage;
