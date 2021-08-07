import CodeContainer from './ProblemContainer';
import ChoicesContainer from './ChoicesContainer';
import ProgressBar from './ProgressBar';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import Page from '../common/Page.js';
const GamePage = () => {

	let stompClient = null;

	function connect() {
		let socket = new SockJS('http://localhost:8080/gameplay');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			stompClient.subscribe(
				'/topic/game-progress/cdce3869-c67d-41a3-9838-6a7826efd26a',
				function (greeting) {
					console.log(JSON.parse(greeting.body).content);
				}
			);
		});
	}

	function disconnect() {
		if (stompClient !== null) {
			stompClient.disconnect();
		}
		console.log('Disconnected');
	}

	function sendName() {
		if (stompClient !== null) {
			stompClient.send(
				'/app/create',
				{},
				JSON.stringify({ playerId: '0c049177-1c78-4c64-b22a-36b0079f6a5c' })
			);
		}
	}

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
			<button className='w-full h-1/3 border-2' onClick={connect}>
					Connect
				</button>
				<button className='w-full h-1/3 border-2' onClick={sendName}>
					Send
				</button>
				<button className='w-full h-1/3 border-2' onClick={disconnect}>
					Disconnect
				</button>
		</Page>
	);
};

export default GamePage;
