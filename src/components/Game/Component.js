import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	materialDark,
	materialLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColor } from '../ColorContext';

const Component = ({ string }) => {
	const color = useColor();
	return (
		<SyntaxHighlighter
			language='java'
			showLineNumbers={true}
			style={color === 'gray-200' ? materialLight : materialDark}
			className='rounded-lg min-h-md'>
			{string}
		</SyntaxHighlighter>
	);
};

export default Component;
