import axios from 'axios';
import {
	joinGameUrl,
	webSocketUrl,
	gameProgressUrl,
	gamePlayUrl,
} from '../../BASE_URL';
import Button from '../common/Button';
import { useTheme } from '../ThemeContext';
import { useUpdateGame } from './GameContext';
import React, { useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const JoinGame = ({ children, changeGameMode, gameStatus }) => {
	const [gameId, setGameId] = useState('');
	const [password, setPassword] = useState('');
	const darkTheme = useTheme();

	const setGame = useUpdateGame();

	let stompClient = null;

	function connect(gameId) {
		let socket = new SockJS(webSocketUrl);
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			stompClient.subscribe(gameProgressUrl + '/' + gameId, function (game) {

				const round = JSON.parse(game.body);
				if (round.roundStatus === 'CONNECTED') {
					changeGameMode(gameStatus.IN_PROGRESS);
					setGame(round);
				}
				if (round.roundStatus === 'START_GAME') {
					axios
						.post(gamePlayUrl, { gameId })
						.then((response) => {})
						.catch((err) => console.log(err));
					setGame(round);
				}

				if (round.roundStatus === 'NEW') {
					setGame(round);
				}

				if (round.roundStatus === 'FINISH_GAME') {
					setGame(round);
				}

			});
		});
	}

	const joinGame = async () => {
		hideError(gameIdRef);
		hideError(passwordRef);
		const username = localStorage.getItem('username');
		const joinGameRequest = {
			player: { username },
			gameId,
			password,
		};
		connect(gameId);
		await axios
			.post(joinGameUrl, joinGameRequest)
			.then((response) => {})
			.catch((error) => {
				const message = error.response.data.message;
				message.includes('Game') && showError(gameIdRef, message);
				message.includes('Wrong Password') && showError(passwordRef, message);
			});
	};
	const passwordRef = useRef();
	const gameIdRef = useRef();
	const showError = (ref, e) => {
		const passwordContainer = ref.current;
		passwordContainer.firstChild.classList.remove('border-transparent');
		passwordContainer.firstChild.classList.add('border-red-500');
		passwordContainer.lastChild.textContent =
			e === 'Access Denied' ? 'You need to activate your account first!' : e;
	};

	const hideError = (ref) => {
		const passwordContainer = ref.current;
		passwordContainer.firstChild.classList.remove('border-red-500');
		passwordContainer.firstChild.classList.add('border-transparent');
		passwordContainer.lastChild.textContent = '';
	};
	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col justify-between gap-y-6 relative items-center text-center`}>
			{children}
			<div className='flex gap-16 mt-44 flex-col'>
				<div>
					<h2 className='pb-4 text-xl'>Game ID:</h2>
					<div ref={gameIdRef} className='relative'>
						<input
							className={`${
								darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
							} w-full text-center rounded-md h-max p-4 outline-none text-xl border border-transparent`}
							value={gameId}
							onChange={({ target }) => setGameId(target.value)}
						/>
					</div>
				</div>
				<div>
					<h2 className='pb-4 text-xl'>Password:</h2>
					<div ref={passwordRef} className='relative'>
						<input
							className={`${
								darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
							} w-full text-center rounded-md h-max p-4 outline-none text-xl border border-transparent`}
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<div className='absolute -bottom-6 text-sm left-4 text-red-700'></div>
					</div>
				</div>
			</div>
			<div className='flex justify-between w-full px-2'>
				<Button content={'Back'} handleClick={() => changeGameMode(null)}></Button>
				<Button
					content={'Join'}
					handleClick={() => joinGame()}
					classes={'text-xl text-green-600 font-bold'}></Button>
			</div>
		</div>
	);
};

export default JoinGame;
