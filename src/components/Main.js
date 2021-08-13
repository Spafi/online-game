import { useTheme } from './ThemeContext';
const Main = ({ children }) => {
	const theme = useTheme();
	return (
		<div
			className={`${theme.backgroundColor} h-full min-h-screen font-montserrat ${theme.textColor}`}>
			{children}
		</div>
	);
};

export default Main;
