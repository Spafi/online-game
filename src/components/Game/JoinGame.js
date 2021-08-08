import axios from 'axios';
import { joinGameUrl, webSocketUrl, gameProgressUrl } from '../../BASE_URL';
import Button from '../common/Button';
import { useTheme } from '../ThemeContext';
import { useUpdateGame } from './GameContext';
import React, { useState } from 'react';
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
				console.log(JSON.parse(game.body)); 
			});
		});
	}

	const joinGame = async () => {
		const username = localStorage.getItem('username');
		const joinGameRequest = {
			player: {username},
			gameId,
			password,
		};
		await axios
			.post(joinGameUrl, joinGameRequest)
			.then((response) => {
        console.log(response);
				const game = response.data;
				const gameId = response.data.gameId;
				connect(gameId);
        setGame(game);
        changeGameMode(gameStatus.IN_PROGRESS);
				
			})
			.catch((error) => {
				console.log(error);
			});
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
					<input
						className={`${
							darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
						} w-full text-center rounded-md h-max p-4 outline-none text-xl border border-transparent`}
						value={gameId}
						onChange={({ target }) => setGameId(target.value)}
					/>
				</div>
				<div>
					<h2 className='pb-4 text-xl'>Password:</h2>
					<input
						className={`${
							darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
						} w-full text-center rounded-md h-max p-4 outline-none text-xl border border-transparent`}
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
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
