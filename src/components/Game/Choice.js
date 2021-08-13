import { useTheme } from '../ThemeContext';
const Choice = ({ children, handleClick }) => {
	const theme = useTheme();
	return (
		<button
			onClick={(children) =>
				typeof handleClick === 'function' && handleClick(children)
			}
			className={`${theme.flatBackgroundColorSm} ${theme.hoverInsetBackgroundColorSm}  rounded-xl outline-none break-words`}>
			{children}
		</button>
	);
};

export default Choice;
