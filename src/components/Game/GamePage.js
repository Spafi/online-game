import { useColor } from '../ColorContext';
import CodeContainer from './CodeContainer';

const GamePage = () => {
	const color = useColor();
	return (
		<div className={` ml-80 p-12 flex h-screen`}>
			{/* MAIN GAME CONTAINER */}
			<div
				className={`nm-flat-${color}-sm w-full h-full rounded-lg p-12 flex flex-col relative`}>
				{/* SCORE & PLAYERS CONTAINER*/}
				<div className='w-full space-y-8'>
					{/* SCORE CONTAINER */}
					<div className='h-10 flex items-center space-x-6 text-5xl font-medium'>
						<div className=' min-w-24'>6</div>
						<div className=' flex-grow items-center'>
							<div className={`w-full h-5 rounded-lg nm-inset-${color}-lg`}>
								<div
									className={`h-full bg-gradient-to-r from-green-200 via-green-400 to-purple-700 rounded-lg opacity-80 w-3/4`}></div>
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
				<div className=' w-full h-1/3 p-4'>
					<div className={`nm-inset-${color}-lg rounded-lg h-full`}>Sout</div>
				</div>
			</div>
		</div>
	);
};

export default GamePage;
