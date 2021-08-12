import React, { useState, useRef } from 'react';
import Button from '../common/Button';
import { useTheme } from '../ThemeContext';
import axios from 'axios';
import { startGameUrl, webSocketUrl, gameProgressUrl } from '../../BASE_URL';
import Input from '../Login/Input';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useGame, useUpdateGame } from './GameContext';
import languages from '../../LANGUAGES';

const CreateGame = ({ children, changeGameMode, gameStatus }) => {
	const darkTheme = useTheme();
	const game = useGame();
	const setGame = useUpdateGame();
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [rounds, setRounds] = useState(3);
	// eslint-disable-next-line
	const [roundTimeLimit, setRoundTimeLimit] = useState(10);
	const [password, setPassword] = useState(null);
	const sliderRef = useRef();

	const updateRounds = (rounds) => setRounds(rounds.target.value);

	const addLanguage = (language) => {
		if (!selectedLanguages.includes(language)) {
			setSelectedLanguages([...selectedLanguages, language]);
		} else {
			setSelectedLanguages(
				selectedLanguages.filter((lang) => {
					return lang !== language;
				})
			);
		}
	};

	let stompClient = null;

	function connect(gameId) {
		let socket = new SockJS(webSocketUrl);
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			stompClient.subscribe(gameProgressUrl + '/' + gameId, function (game) {
				const round = JSON.parse(game.body);
				if (round.roundStatus === 'CONNECTED') {
					changeGameMode(gameStatus.CONNECTED);
					setGame(round);
				}
				if (round.roundStatus === 'START_GAME') {
					changeGameMode(gameStatus.IN_PROGRESS);
				}
				if (round.roundStatus === 'NEW') setGame(round);

				if (round.roundStatus === 'FINISH_GAME') {
					setGame(round);
					changeGameMode(gameStatus.FINISHED);
					disconnect();
				}
			});
		});
	}

	const createGame = async () => {
		const username = localStorage.getItem('username');
		const createGameRequest = {
			username,
			languages: selectedLanguages,
			rounds,
			password,
			roundTimeLimit,
		};

		await axios
			.post(startGameUrl, createGameRequest)
			.then((response) => {
				const gameId = response.data.gameId;
				connect(gameId);

				changeGameMode(gameStatus.WAIT);
				setGame({ ...game, gameId: gameId });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	function disconnect() {
		if (stompClient !== null) {
			stompClient.disconnect();
		}
	}

	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm ' : 'nm-flat-gray-200-sm '
			} min-w-md w-full max-w-6xl h-full rounded-lg  p-12 flex flex-col justify-between gap-y-6 relative`}>
			{children}
			<div>
				<div className='pb-4'>Choose game languages:</div>
				<div
					className={`${
						darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
					} w-full grid grid-cols-4 gap-4 rounded-md h-max p-4 place-items-center`}>
					{languages.map((language) => {
						return (
							<Button
								key={language.name}
								content={language.name}
								handleClick={() => addLanguage(language.compilerApiCode)}
								toggled={selectedLanguages.includes(language.compilerApiCode)}
								classes={'w-24 h-8 '}
							/>
						);
					})}
				</div>
			</div>
			<div>
				<div className='pb-4'> Choose number of rounds:</div>
				<div
					className={`${
						darkTheme === true ? 'nm-inset-gray-neu-xs ' : 'nm-inset-gray-200-xs '
					} w-full rounded-md h-max `}>
					<div className='w-full pt-4 px-4 flex flex-col items-center'>
						<input
							ref={sliderRef}
							type='range'
							min={3}
							max={10}
							defaultValue={rounds}
							className='w-full appearance-none  h-2 bg-gray-400 rounded outline-none slider-thumb'
							onInput={(e) => updateRounds(e)}
						/>
						<div className='pt-4 pb-2 text-xl'>{rounds}</div>
					</div>
				</div>
			</div>

			<div>
				<p className='pb-4'>
					Password (Optional) -{' '}
					<span
						className={`${
							darkTheme === true ? 'text-yellow-400 ' : 'text-yellow-900 '
						}`}>
						The game won't appear in random games
					</span>
				</p>
				<Input
					containerClasses={'w-full'}
					placeholder={'1234 or something'}
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<div className='flex justify-between  px-2'>
				<Button content={'Back'} handleClick={() => changeGameMode(null)}></Button>
				<Button
					content={'Start'}
					handleClick={() => createGame()}
					classes={'text-xl text-green-600 font-bold'}></Button>
			</div>
		</div>
	);
};

export default CreateGame;
