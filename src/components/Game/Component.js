import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	materialDark,
	materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../ThemeContext';

const Component = ({ string }) => {
	const darkTheme = useTheme();
	return (
		<SyntaxHighlighter
			language='java'
			showLineNumbers={true}
			style={darkTheme === true ? materialDark : materialLight}
			className='rounded-lg min-h-md'>
			{string}
		</SyntaxHighlighter>
	);
};

export default Component;
