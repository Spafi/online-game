import { useTheme } from '../ThemeContext';
const Button = ({ content, handleClick, toggled, classes, type }) => {
	const darkTheme = useTheme();

	return (
		<button
		type={type ?? 'button'}
			onClick={() => typeof handleClick === "function" && handleClick()}
			className={`flex items-center p-2 justify-center rounded-2xl font-light text-sm outline-none 
			
      ${darkTheme === true ? 'nm-convex-gray-neu-sm ' : 'nm-convex-gray-200-sm '}
			// HOVER
      ${` ${darkTheme === true ? 'hover:nm-inset-gray-neu-lg ' : 'hover:nm-inset-gray-200-lg '}`}
			// ACTIVE 
			${toggled && `${darkTheme === true ? 'nm-inset-gray-neu-lg ' : 'nm-inset-gray-200-lg '}`}
			// ACTIVE ACCENT COLOR 
			${toggled && `${darkTheme === true ? 'text-purple-300 ' : 'text-gray-400 '}`}
			// HOVER ACCENT COLOR
			${darkTheme === true ? 'hover:text-purple-300 ' : 'hover:text-gray-400 '} 
			${classes ?? ''}`}>
			{content}
		</button>
	);
};

export default Button;
