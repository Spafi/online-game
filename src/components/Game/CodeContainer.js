import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	materialDark,
	materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../ThemeContext';

const CodeContainer = ({ script, language }) => {
	const darkTheme = useTheme();
	
	console.log(language);

	return (
		<SyntaxHighlighter
			language={language}
			showLineNumbers={true}
			style={darkTheme === true ? materialDark : materialLight}
			className={`rounded-lg min-h-sm max-h-md scrollbar-thin relative ${
				darkTheme ? 'scrollbar-thumb-purple-500' : 'scrollbar-thumb-gray-400'
			} scrollbar-thumb-rounded-sm`}>
			{script}
		</SyntaxHighlighter>
	);
};

export default CodeContainer;
