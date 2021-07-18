import { useTheme } from './ThemeContext.js';
const Main = ({ children }) => {
	const darkTheme = useTheme();
	return (
		<div
			className={`${
				darkTheme === true ? 'bg-gray-neu' : 'bg-gray-200'
			} h-full min-h-screen font-montserrat ${
				darkTheme === true ? 'text-gray-200' : 'text-gray-800'
			}`}>
			{children}
		</div>
	);
};

export default Main;
