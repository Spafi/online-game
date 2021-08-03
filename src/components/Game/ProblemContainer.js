import { useGame } from './GameContext';
import Code from './CodeContainer.js';


const ProblemContainer = () => {
	const game = useGame();
	
	return (
		<>
			<Code script={game.script} language={'java'}/>
			<div className='text-lg min-h-0 max-h-24 px-4 py-2'>
				<p>What is the output for int[] n = {'{2, 4, 6}'}</p>
			</div>
		</>
	);
};

export default ProblemContainer;
