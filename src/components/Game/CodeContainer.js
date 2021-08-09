import SyntaxHighlighter  from 'react-syntax-highlighter';
import { monokai, xcode } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from '../ThemeContext';

const CodeContainer = ({ script, language }) => {
	const darkTheme = useTheme();

	return (
		<SyntaxHighlighter
			language={language}
			showLineNumbers={true}
			style={darkTheme === true ? monokai : xcode}
			className={`rounded-lg min-h-sm max-h-md scrollbar-thin relative scrollbar-thumb-rounded-sm text-sm font-roboto ${
				darkTheme ? 'scrollbar-thumb-purple-500' : 'scrollbar-thumb-gray-400'
			} `}>
			{script}
		</SyntaxHighlighter>
	);
};

export default CodeContainer;
