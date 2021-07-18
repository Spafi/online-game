import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ToggleThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);
export const useToggleTheme = () => useContext(ToggleThemeContext);

export const ThemeProvider = ({ children }) => {
	// neu-gray, purple-500, purple-400
	// gray-200, gray-800, gray-400

	const [darkTheme, setDarkTheme] = useState(true);

	const toggleTheme = () => setDarkTheme((prevTheme) => !prevTheme);

	return (
		<ThemeContext.Provider value={darkTheme}>
			<ToggleThemeContext.Provider value={toggleTheme}>
				{children}
			</ToggleThemeContext.Provider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
