import React, { useState } from 'react';
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

				<textarea
					className='rounded-lg min-h-sm max-h-md z-10 w-full absolute opacity-0 mt-2'
					onChange={updateCode}></textarea>
				<CodeContainer
					script={script}
					language={language.codeHighlight}></CodeContainer>
			</div>
		</Page>
	);
};

export default SubmitProblem;
