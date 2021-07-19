import { useTheme } from '../ThemeContext';
const Button = ({ content, handleClick, toggled }) => {
	const darkTheme = useTheme();

	return (
		<button
			onClick={() => handleClick()}
			className=
			{`flex items-center p-2 justify-center rounded-2xl font-light text-sm outline-none
      ${darkTheme === true ? 'nm-convex-gray-neu-sm ' : 'nm-convex-gray-200-sm '}
			// ACTIVE OR HOVER CLASSES
      ${!(toggled === true) ? ` hover:` : ' '}${darkTheme === true ? 'nm-inset-gray-neu-lg ' : 'nm-inset-gray-200-lg '}
			// ACTIVE ACCENT COLOR 
			${toggled && `${darkTheme === true ? 'text-purple-300 ' : 'text-gray-400 '}`}
			// HOVER ACCENT COLOR
			${darkTheme === true ? 'hover:text-purple-300 ' : 'hover:text-gray-400 '}
      `}>
			{content}
		</button>
	);
};

export default Button;
