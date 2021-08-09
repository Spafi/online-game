import { useGame } from './GameContext';
import Code from './CodeContainer.js';


const ProblemContainer = () => {
	const game = useGame();
	
	return (
		<div>
			<div className='relative'>
				<Code
					script={game.script}
					language={game.language}
				/>
				<p className='absolute bottom-0 right-0 text-xs p-1'>
					By: {game.byUser}
				</p>
			</div>
			<div className='text-lg min-h-0 max-h-24 px-4 py-2 relative'>
				<p>task (TO BE REMOVED)</p>
			</div>
		</div>
	);
};

export default ProblemContainer;
