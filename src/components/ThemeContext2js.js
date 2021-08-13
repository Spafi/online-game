import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ToggleThemeContext = React.createContext();

export const useTheme2 = () => useContext(ThemeContext);
export const useToggleTheme2 = () => useContext(ToggleThemeContext);

const darkTheme = {
	dark: true,
	insetBackgroundColor: ' nm-inset-gray-neu-sm ',
	flatBackgroundColor: 'nm-flat-gray-neu-sm',
	textColor: ' text-red-600 ',
	logoColor: '#fff',
};

const lightTheme = {
	dark: false,
	insetBackgroundColor: 'nm-inset-gray-200-sm',
	flatBackgroundColor: 'nm-flat-gray-200-sm',
	textColor: 'text-gray-800',
	logoColor: '#000',
};

export const ThemeProvider2 = ({ children }) => {
	// neu-gray, purple-500, purple-400
	// gray-200, gray-800, gray-400
	

	const [theme, setTheme] = useState(darkTheme);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			if (prevTheme.dark) return lightTheme;
			else if (!prevTheme.dark) return darkTheme;
		});
	};

	return (
		<ThemeContext.Provider value={theme}>
			<ToggleThemeContext.Provider value={toggleTheme}>
				{children}
			</ToggleThemeContext.Provider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider2;
