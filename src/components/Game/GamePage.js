import CodeContainer from './ProblemContainer';
import ChoicesContainer from './ChoicesContainer';
import ProgressBar from './ProgressBar';

import Page from '../common/Page.js';
const GamePage = () => {

	return (
		<Page>
			{/* MAIN GAME CONTAINER */}
			{/* SCORE & PLAYERS CONTAINER*/}
			<div className='w-full space-y-8'>
				{/* SCORE CONTAINER */}
				<div className='h-10 flex items-center space-x-6 text-5xl font-medium'>
					<div className=' min-w-24'>6</div>
					<div className=' flex-grow items-center'>
						<ProgressBar progress={0} />
					</div>
					<div className=' min-w-24 text-right'>0</div>
				</div>
				{/* PLAYERS CONTAINER */}
				<div className='h-10 grid grid-cols-7 items-center justify-center text-2xl'>
					<div className='col-span-3'>P1 </div>
					<div className='text-center '>VS</div>
					<div className='col-span-3 text-right'>P2</div>
				</div>
			</div>
			<CodeContainer className='rounded-lg w-full relative h-full' />
			<ChoicesContainer />
		</Page>
	);
};

export default GamePage;
