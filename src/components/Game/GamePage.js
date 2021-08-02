import { useTheme } from '../ThemeContext';
import CodeContainer from './ProblemContainer';
import ChoicesContainer from './ChoicesContainer';
import ProgressBar from './ProgressBar';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const GamePage = () => {
	const darkTheme = useTheme();
	let stompClient = null;

	function connect() {
		let socket = new SockJS('http://localhost:8080/ws');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			stompClient.subscribe('/game', function (greeting) {
				console.log(JSON.parse(greeting.body).content);
			});
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

	// Possible future use - Sends mouse position to all other users connected to same Websocket channel
	// document.onmousemove = handleMouseMove;
	// function handleMouseMove(event) {
	// 	var eventDoc, doc, body;

	// 	event = event || window.event; // IE-ism

	// 	// If pageX/Y aren't available and clientX/Y are,
	// 	// calculate pageX/Y - logic taken from jQuery.
	// 	// (This is to support old IE)
	// 	if (event.pageX == null && event.clientX != null) {
	// 		eventDoc = (event.target && event.target.ownerDocument) || document;
	// 		doc = eventDoc.documentElement;
	// 		body = eventDoc.body;

	// 		event.pageX =
	// 			event.clientX +
	// 			((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
	// 			((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
	// 		event.pageY =
	// 			event.clientY +
	// 			((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
	// 			((doc && doc.clientTop) || (body && body.clientTop) || 0);
	// 	}

	// 	// Use event.pageX / event.pageY here
	// 	console.log(event.pageX);
	// 	console.log(event.pageY);
	// 	stompClient.send('/app/hello', {}, JSON.stringify({ name: event.pageX }));
	// }

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
			</div>
			<div className='w-64 ml-8'>
				{' '}
				<button className='w-full h-1/3 border-2' onClick={connect}>
					Connect
				</button>
				<button className='w-full h-1/3 border-2' onClick={sendName}>
					Send
				</button>
				<button className='w-full h-1/3 border-2' onClick={disconnect}>
					Disconnect
				</button>
			</div>
		</div>
	);
};

export default GamePage;
