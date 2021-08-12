import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

import languages from '../../LANGUAGES';

(async () => {
	for (let language of languages)
		if (language.codeHighlight !== null && language.codeHighlight !== '')
			await import(`ace-builds/src-noconflict/mode-${language.codeHighlight}`);
})();

const EditableCodeContainer = ({ script, language, updateCode, readOnly }) => {
	const [fontSize, setFontSize] = useState(14);

	const updateFontSize = (direction) => {
		if (fontSize < 40 && direction === '+')
			setFontSize((prevSize) => prevSize + 1);
		if (fontSize > 8 && direction === '-')
			setFontSize((prevSize) => prevSize - 1);
	};
	if (language === 'java')
		script =
			script ||
			'public class Problem { \n\n\n	public static void main (String[] args) {\n		/* code */\n	}\n}';
	const darkTheme = useTheme();
	return (
		<div className='w-full h-full'>
			<AceEditor
				className='rounded-md'
				style={{
					height: '100%',
					width: '100%',
				}}
				placeholder={
					language &&
					`Start Coding in ${
						language.substring(0, 1).toUpperCase() + language.substring(1)
					}`
				}
				mode={language || 'sh'}
				theme={darkTheme === true ? 'monokai' : 'xcode'}
				name='basic-code-editor'
				onChange={updateCode && updateCode}
				fontSize={fontSize}
				showPrintMargin={false}
				showGutter={true}
				highlightActiveLine={true}
				value={script}
				readOnly={readOnly ?? false}
				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
			<div className=' absolute top-2 right-2 z-40 space-x-4 flex opacity-50 hover:opacity-100'>
				<div className=' cursor-pointer' onClick={() => updateFontSize('-')}>
					A-
				</div>
				<div className=' cursor-pointer' onClick={() => updateFontSize('+')}>
					A+
				</div>
			</div>
		</div>
	);
};

export default EditableCodeContainer;
