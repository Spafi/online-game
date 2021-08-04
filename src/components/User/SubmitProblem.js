import React, { useState, useEffect } from 'react';
import Page from '../Page';
import CodeContainer from '../Game/CodeContainer.js';
import ListBox from '../common/SelectList.js';

const SubmitProblem = () => {
	const [script, setScript] = useState('');
	const choices = [
		{ name: 'Java', codeHighlight: 'java', compilerApiCode: 'java' },
		{ name: 'Python 3', codeHighlight: 'python', compilerApiCode: 'python3' },
	];

	const [language, setLanguage] = useState(choices[0]);
	const updateCode = ({ target }) => setScript(target.value);

	const updateLanguage = (language) => setLanguage(language);

	const st = {
		width: '100%',
		height: '100%',
		textAlign: 'left',
		whiteSpace: 'pre',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		overflowWrap: 'normal',
		maxHeight: '40rem',
		background: 'transparent',
		fontFamily: '"Roboto Mono", monospace',
		fontSize: '1em',
		lineHeight: '1.5em',
		tabSize: '4',
		hyphens: 'none',
		overflow: 'hidden',
		position: 'absolute',
		marginTop: '0',
		padding: '1.25rem 3.2rem',
		opacity: '100%',
		resize: 'none',
		// WebkitTextFillColor: 'transparent',
    border:'2px solid red'
	};
  useEffect(() => {
    const test = document.getElementById('test');
    const evt = () => {
					test.style.pointerEvents = 'none';
					console.log('w');
				}
				test.addEventListener('wheel', evt)
    return () => {
      test.removeEventListener('wheel', evt)
    }
  }, [])



	return (
		<Page>
			<div className='h-full relative'>
				<div className='w-full'>
					<ListBox
						choices={choices}
						selected={language}
						updateState={updateLanguage}
					/>
				</div>
				<div className='min-h-sm max-h-md relative'>
					<textarea
          id='test'
						style={st}
						className='rounded-lg z-10 outline-none'
						onChange={updateCode}></textarea>
					<CodeContainer
						script={script}
						language={language.codeHighlight}
					></CodeContainer>
				</div>
			</div>
		</Page>
	);
};

export default SubmitProblem;
