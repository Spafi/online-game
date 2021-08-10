import React, { useState, useRef } from 'react';
import Page from '../common/Page';
import EditableCodeContainer from '../Game/EditableCodeContainer.js';
import ListBox from '../common/SelectList.js';
import Button from '../common/Button';
import axios from 'axios';
import { testCodeUrl, submitCodeUrl } from '../../BASE_URL';
import { useTheme } from '../ThemeContext';
import Input from '../Login/Input.js';
const SubmitProblem = () => {
	const [script, setScript] = useState('');
	const [output, setOutput] = useState('');
	const [cpuTime, setCpuTime] = useState('');
	const [answers, setAnswers] = useState({
		decoy1: '',
		decoy2: '',
		decoy3: '',
	});
	const darkTheme = useTheme();
	const decoysRef = useRef();
	const choices = [
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
		{
			name: 'Bash Shell',
			codeHighlight: 'sh',
			compilerApiCode: 'bash',
			versionIndex: 2,
		},
	];
	const [language, setLanguage] = useState(choices[0]);
	const updateCode = (code) => setScript(code);
	const updateOutput = (output) => setOutput(output);
	const updateCpuTime = (cpuTime) => setCpuTime(cpuTime);
	const updateLanguage = (language) => setLanguage(language);

	const showError = (ref, e, isContainer) => {
		const inputContainer = ref.current;
		if (isContainer) {
			inputContainer.classList.remove('border-transparent');
			inputContainer.classList.add('border-red-500');
		} else {
			inputContainer.firstChild.classList.remove('border-transparent');
			inputContainer.firstChild.classList.add('border-red-500');
		}
		inputContainer.lastChild.textContent = e;
	};

	const hideError = (ref, isContainer) => {
		const inputContainer = ref.current;
		if (isContainer) {
			inputContainer.classList.remove('border-red-500');
			inputContainer.classList.add('border-transparent');
		} else {
			inputContainer.firstChild.classList.remove('border-red-500');
			inputContainer.firstChild.classList.add('border-transparent');
		}
		inputContainer.lastChild.textContent = '';
	};

	const hasDuplicates = (array) => {
		return new Set(array).size !== array.length;
	};

	const testCode = async (script, language) => {
		hideError(decoysRef, true);
		const problem = {
			script,
			language: language.compilerApiCode,
			versionIndex: language.versionIndex,
		};
		await axios
			.post(testCodeUrl, problem)
			.then((response) => {
				updateOutput(response.data.output);
				updateCpuTime(response.data.cpuTime);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const successBorderRef = useRef();
	const successMessageRef = useRef();

	const onSubmitSuccess = () => {
		setScript('');
		setAnswers('');
		setOutput('');
		setCpuTime('');
		successBorderRef?.current.classList.remove('border-transparent');
		successBorderRef?.current.classList.add('border-green-600');
		successMessageRef?.current.classList.remove('hidden');
		setTimeout(() => {
			successBorderRef?.current.classList.remove('border-green-600');
			successBorderRef?.current.classList.add('border-transparent');
			successMessageRef?.current.classList.add('hidden');
		}, 1500);
	};

	const submitProblem = async (script, language) => {
		hideError(decoysRef, true);
		const problem = {
			script,
			language: language.compilerApiCode,
			versionIndex: language.versionIndex,
		};
		const username = localStorage.getItem('username');
		const answersList = Object.values(answers);

		if (
			answersList.includes('') ||
			answersList.length !== 3 ||
			hasDuplicates(answersList)
		) {
			showError(decoysRef, 'You must write three distinct decoy answers!', true);
			return;
		}

		const submitProblemRequest = { problem, username, answers: answersList };
		await axios
			.post(submitCodeUrl, submitProblemRequest)
			.then((response) => {
				onSubmitSuccess();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Page>
			<div className='h-full relative flex flex-col'>
				{/*START BUTTONS & LANGUAGE SELECT CONTAINER */}
				<div className='w-full pb-2 flex items-center justify-between gap-2 text-sm px-px'>
					<div className='flex flex-row gap-4'>
						<Button content={'Test'} handleClick={() => testCode(script, language)} />
						<Button
							content={'Submit'}
							classes={'text-green-600'}
							handleClick={() => submitProblem(script, language)}
						/>
					</div>
					<div>
						<ListBox
							choices={choices}
							selected={language}
							updateState={updateLanguage}
						/>
					</div>
				</div>
				{/*END BUTTONS & LANGUAGE SELECT CONTAINER */}
				{/*START CODE CONTAINER */}
				<div
					className='min-h-sm h-36 max-h-md relative rounded-md border border-transparent flex-grow'
					ref={successBorderRef}>
					<div
						className={` absolute w-full h-full flex items-center justify-center`}>
						<span
							ref={successMessageRef}
							className='hidden text-green-600 text-xl z-40'>
							Problem submitted!
						</span>
					</div>
					<EditableCodeContainer
						script={script}
						language={language.codeHighlight}
						updateCode={updateCode}></EditableCodeContainer>
				</div>
				{/*END CODE CONTAINER */}
				<div className='w-full text-sm pt-2 pb-1'>Output</div>
				{/*START OUTPUT CONTAINER */}
				<div className='relative'>
					<div
						className={`  h-36 flex-grow relative rounded-md px-1 py-2 text-xs font-roboto w-full overflow-scroll scrollbar-thin scrollbar-thumb-rounded-sm ${
							darkTheme
								? 'bg-monokai-bg scrollbar-thumb-purple-500'
								: 'bg-white scrollbar-thumb-gray-400'
						}`}>
						{output?.split('\n').map((i, key) => {
							return <p key={key}>{i}</p>;
						})}
					</div>
					{cpuTime && (
						<div className='absolute text-xs -top-5 right-2 font-montserrat font-light'>
							Executed in: <span>{cpuTime}</span> s
						</div>
					)}
				</div>
				{/*END OUTPUT CONTAINER */}

				<div className='w-full h-max'>
					<div className='w-full text-sm pt-2 pb-1'>Decoys</div>
					<div
						className='flex w-full gap-2 text-sm border border-transparent rounded-3xl'
						ref={decoysRef}>
						<Input
							placeholder={'Decoy 1'}
							value={answers.decoy1}
							onChange={({ target }) =>
								setAnswers({ ...answers, decoy1: target.value })
							}
						/>
						<Input
							placeholder={'Decoy 2'}
							value={answers.decoy2}
							onChange={({ target }) =>
								setAnswers({ ...answers, decoy2: target.value })
							}
						/>
						<Input
							placeholder={'Decoy 3'}
							value={answers.decoy3}
							onChange={({ target }) =>
								setAnswers({ ...answers, decoy3: target.value })
							}
						/>
						<div className='absolute -bottom-5 text-sm text-red-700 left-4'></div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default SubmitProblem;
