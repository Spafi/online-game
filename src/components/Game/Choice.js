import { useTheme } from '../ThemeContext';
const Choice = ({ children, handleClick }) => {
	const darkTheme = useTheme();
	return (
		<button
			onClick={(children) =>
				typeof handleClick === 'function' && handleClick(children)
			}
			className={`${
				darkTheme === true
					? 'nm-flat-gray-neu-sm hover:nm-inset-gray-neu-sm'
					: 'nm-flat-gray-200-sm hover:nm-inset-gray-200-sm'
			}  rounded-xl outline-none break-words`}>
			{children}
		</button>
	);
};

export default Choice;
