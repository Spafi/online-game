import { useColor, useTextColor } from '../ColorContext';
const GamePage = () => {
	const color = useColor();
	const textColor = useTextColor();
	return (
		<div className={` ml-80 p-12 flex h-screen text-${textColor}`}>
			<div
				className={`nm-flat-${color}-sm w-full h-full rounded-lg p-12 flex flex-col `}>
				<div className='order-2 w-full'>
					<div className='h-10'>Pl1 score  level progress (progress bar) Pl2 score</div>
					<div className='h-10'>Player1 VS Player2</div>
				</div>
				<div className='order-2 w-full flex-grow p-4'>
					<div className={`nm-inset-${color}-lg rounded-lg h-full`}>k</div>
				</div>
				<div className='order-2 w-full h-1/3 p-4'>
					<div className={`nm-inset-${color}-lg rounded-lg h-full`}>Sout</div>
				</div>
			</div>
		</div>
	);
};

export default GamePage;
