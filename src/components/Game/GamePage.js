import { useTheme } from '../ThemeContext';
import CodeContainer from './ProblemContainer';
import ChoicesContainer from './ChoicesContainer';

const GamePage = () => {
	const darkTheme = useTheme();
	return (
		<div className={` ml-80 p-12 flex h-screen`}>
			{/* MAIN GAME CONTAINER */}
			<div
				className={`${
					darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
				} w-full h-full rounded-lg p-12 flex flex-col relative`}>
				{/* SCORE & PLAYERS CONTAINER*/}
				<div className='w-full space-y-8'>
					{/* SCORE CONTAINER */}
					<div className='h-10 flex items-center space-x-6 text-5xl font-medium'>
						<div className=' min-w-24'>6</div>
						<div className=' flex-grow items-center'>
							<div
								className={`w-full h-5 rounded-lg ${
									darkTheme === true ? 'nm-inset-gray-neu-lg' : 'nm-inset-gray-200-lg'
								}`}>
								<div
									style={{ width: '40%' }}
									className={`h-full bg-gradient-to-r from-green-200 via-green-400 to-purple-700 rounded-lg opacity-80 `}></div>
							</div>
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
			</div>
			<div className=" w-64 border-2 ml-8">x</div>
		</div>
	);
};

export default GamePage;
