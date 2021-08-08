import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useGame } from './GameContext';
import { useTheme } from '../ThemeContext';

const WaitPage = () => {
	const game = useGame();
	const darkTheme = useTheme();
	const gameIdRef = useRef();
	const rows = 15;
	const cols = 4;
	const animationElementsNumber = new Array(rows * cols);
	animationElementsNumber.fill(1);

	useEffect(() => {
		anime({
			targets: '.staggering-grid-demo .el',
			scale: [
				{ value: 0.1, easing: 'easeInOutQuad', duration: 600 },
				{ value: 1, easing: 'easeInOutQuad', duration: 1200 },
			],
			backgroundColor: ['#7C3AED', '#D97706', '#DC2626'],

			delay: anime.stagger(200, { grid: [rows, cols], from: 'center' }),
			loop: true,
		});
	}, []);

	const copyGameId = (e) => {
		const idContainer = gameIdRef.current;
		navigator.clipboard.writeText(e.target.value);
		idContainer.childNodes[1].classList.add('border-green-500');
		idContainer.lastChild.classList.remove('hidden');
		setTimeout(() => {
			idContainer.childNodes[1].classList.remove('border-green-500');
			idContainer.lastChild.classList.add('hidden');
		}, 1000);
	};
	return (
		<div
			className={` min-w-md w-full max-w-6xl h-full rounded-lg p-12 flex flex-col justify-between gap-y-6 relative`}>
			<div className=' staggering-grid-demo h-full w-full flex flex-col justify-around'>
				<h2 className='w-full text-center text-2xl font-bold'>
					Waiting for the second player to join
				</h2>
				<div className='w-full items-center flex justify-center'>
					<div className='grid grid-cols-15 w-max overflow-hidden rounded-full'>
						{animationElementsNumber.map((el, index) => {
							return <div className='w-9 h-9 bg-purple-600 el' key={index}></div>;
						})}
					</div>
				</div>
				<div className='text-xl text-center flex items-center justify-center relative'>
					<div ref={gameIdRef}>
						<h2 className='pb-4'>Game ID:</h2>
						<input
							className={`${
								darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
							} w-full text-center rounded-md h-max p-4 outline-none cursor-pointer text-xl border border-transparent`}
							value={game.gameId}
							readOnly={true}
							onClick={(e) => copyGameId(e)}
						/>
						<span
							className={`hidden absolute text-sm top-0 px-2 py-1 rounded-xl ${
								darkTheme === true ? 'nm-flat-gray-neu-xs ' : 'nm-flat-gray-200-xs '
							}`}>
							Copied!
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WaitPage;
