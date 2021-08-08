import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

const WaitPage = ({gameId}) => {
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

			delay: anime.stagger(200, { grid: [rows, cols], from: 'center' }),
			loop: true,
		});
	}, []);

	return (
		<div
			className={` min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col justify-between gap-y-6 relative`}>
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
				<div className='text-xl'>Game ID: {gameId}</div>
			</div>
		</div>
	);
};

export default WaitPage;
