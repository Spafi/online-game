import React, { useState, useRef } from 'react';
import Page from '../Page';
import EditableCodeContainer from '../Game/EditableCodeContainer.js';
import ListBox from '../common/SelectList.js';
import Button from '../common/Button';
import axios from 'axios';
import { testCodeUrl, submitCodeUrl } from '../../BASE_URL';
import { useTheme } from '../ThemeContext';
import Input from '../Login/Input.js';
const SubmitProblem = () => {
	const [script, setScript] = useState('');
	const [output, setOutput] = useState('Output');
	const [task, setTask] = useState('');
	const [cpuTime, setCpuTime] = useState('');
	const [answers, setAnswers] = useState({
		decoy1: '',
		decoy2: '',
		decoy3: '',
	});
	const darkTheme = useTheme();
	const decoysRef = useRef();
	const taskRef = useRef();
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

	const testCode = async (script, language) => {
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

	const submitProblem = async (script, language) => {
		hideError(taskRef);
		hideError(decoysRef, true);
		const problem = {
			script,
			language: language.compilerApiCode,
			versionIndex: language.versionIndex,
			task,
		};
		const username = localStorage.getItem('username');
		const answersList = Object.values(answers);
		if (!task) {
			showError(taskRef, 'You must write a task for the problem!', false);
			return;
		}
		if (answersList.includes('')) {
			showError(decoysRef, 'You must write three decoy answers!', true);
			return;
		}

		const submitProblemRequest = { problem, username, answers: answersList };
		await axios
			.post(submitCodeUrl, submitProblemRequest)
			.then((response) => {
				console.log(response);
				updateOutput(response.data.output);
				updateCpuTime(response.data.cpuTime);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Page>
			<div className='h-full relative'>
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
				<div className='min-h-sm h-36 max-h-md relative'>
					<EditableCodeContainer
						script={script}
						language={language.codeHighlight}
						updateCode={updateCode}></EditableCodeContainer>
				</div>
				{/*END CODE CONTAINER */}
				<div className='w-full text-sm pt-2 pb-1'>Output</div>
				{/*START OUTPUT CONTAINER */}
				<div
					className={`h-36 max-h-md relative rounded-md px-1 py-2 text-xs font-roboto w-full ${
						darkTheme ? 'bg-monokai-bg' : 'bg-white'
					}`}>
					{output}
					{cpuTime && (
						<span className='absolute text-xs -bottom-4 right-2 font-montserrat font-light'>
							Executed in: <span>{cpuTime}</span> ms
						</span>
					)}
				</div>
				{/*END OUTPUT CONTAINER */}

				<div className='absolute bottom-0 w-full'>
					<Input
						containerClasses={'w-full'}
						placeholder={'Task'}
						value={task}
						onChange={({ target }) => setTask(target.value)}
						ref={taskRef}
					/>
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
						<div className='absolute -bottom-5 text-xs text-red-700 left-4'></div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default SubmitProblem;
