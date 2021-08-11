import { useTheme } from '../ThemeContext';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';

import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

const EditableCodeContainer = ({ script, language, updateCode, readOnly }) => {
	if (language === 'java')
		script =
			script ||
			'public class Problem { \n\n\n	public static void main (String[] args) {\n		/* code */\n	}\n}';
	const darkTheme = useTheme();
	return (
		<AceEditor
			className='rounded-md'
			style={{
				height: '100%',
				width: '100%',
			}}
			placeholder={language && (`Start Coding in ${
				language.substring(0, 1).toUpperCase() + language.substring(1)
			}`)}
			mode={language || 'java'}
			theme={darkTheme === true ? 'monokai' : 'xcode'}
			name='basic-code-editor'
			onChange={updateCode && updateCode}
			fontSize={14}
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
	);
};

export default EditableCodeContainer;
