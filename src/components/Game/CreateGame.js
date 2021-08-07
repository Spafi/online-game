import React, { useState, useRef } from 'react';
import Button from '../common/Button';
import { useTheme } from '../ThemeContext';
import axios from 'axios';
import { startGameUrl } from '../../BASE_URL';
const CreateGame = ({ children, changeGameMode }) => {
	const darkTheme = useTheme();
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [rounds, setRounds] = useState(3);
	const sliderRef = useRef();
	const languages = [
		{
			name: 'Java',
			codeHighlight: 'java',
			compilerApiCode: 'java',
			versionIndex: 3,
		},
		{
			name: 'Python 3',
			codeHighlight: 'python',
			compilerApiCode: 'python3',
			versionIndex: 3,
		},
		{
			name: 'Javascript',
			codeHighlight: 'javascript',
			compilerApiCode: 'nodejs',
			versionIndex: 3,
		},
	];

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

	const createGame = async () => {
		const username = localStorage.getItem('username');
		const createGameRequest = { username, languages: selectedLanguages, rounds };
		await axios
			.post(startGameUrl, createGameRequest)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
					} w-full grid grid-cols-4 gap-4 rounded-md h-max p-4 `}>
					{languages.map((language) => {
						return (
							<Button
								key={language.name}
								content={language.name}
								handleClick={() => addLanguage(language.compilerApiCode)}
								toggled={selectedLanguages.includes(language.compilerApiCode)}
								classes={'w-24 h-8'}
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
				Private (needs password)
				
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
