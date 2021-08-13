import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ToggleThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);
export const useToggleTheme = () => useContext(ToggleThemeContext);

const darkTheme = {
	dark: true,
	backgroundColor: 'bg-gray-neu',
	insetBackgroundColorXs: 'nm-inset-gray-neu-xs',
	insetBackgroundColorSm: 'nm-inset-gray-neu-sm',
	insetBackgroundColorMd: 'nm-inset-gray-neu-md',
	insetBackgroundColorLg: 'nm-inset-gray-neu-lg',
	flatBackgroundColorXs: 'nm-flat-gray-neu-xs',
	flatBackgroundColorSm: 'nm-flat-gray-neu-sm',
	flatBackgroundColorMd: 'nm-flat-gray-neu-md',
	concaveBackgroundColorXs: 'nm-concave-gray-neu-xs',
	concaveBackgroundColorSm: 'nm-concave-gray-neu-sm',
	concaveBackgroundColorMd: 'nm-concave-gray-neu-md',
	convexBackgroundColorXs: 'nm-convex-gray-neu-xs',
	convexBackgroundColorSm: 'nm-convex-gray-neu-sm',
	convexBackgroundColorMd: 'nm-convex-gray-neu-md',
	convexBackgroundColorLg: 'nm-convex-gray-neu-lg',
	hoverInsetBackgroundColorSm: 'hover:nm-inset-gray-neu-sm',
	hoverInsetBackgroundColorLg: 'hover:nm-inset-gray-neu-lg',
	activeAccentColor: 'text-purple-300',
	hoverActiveColor: 'hover:text-purple-300',
	textColor: 'text-gray-200',
	logoColor: '#fff',
	errorTextColor: 'text-red-700',
};

const lightTheme = {
	dark: false,
	backgroundColor: 'bg-gray-200',
	insetBackgroundColorXs: 'nm-inset-gray-200-xs',
	insetBackgroundColorSm: 'nm-inset-gray-200-sm',
	insetBackgroundColorMd: 'nm-inset-gray-200-md',
	insetBackgroundColorLg: 'nm-inset-gray-200-lg',
	flatBackgroundColorXs: 'nm-flat-gray-200-xs',
	flatBackgroundColorSm: 'nm-flat-gray-200-sm',
	flatBackgroundColorMd: 'nm-flat-gray-200-md',
	concaveBackgroundColorXs: 'nm-concave-gray-200-xs',
	concaveBackgroundColorSm: 'nm-concave-gray-200-sm',
	concaveBackgroundColorMd: 'nm-concave-gray-200-md',
	convexBackgroundColorXs: 'nm-convex-gray-200-xs',
	convexBackgroundColorSm: 'nm-convex-gray-200-sm',
	convexBackgroundColorMd: 'nm-convex-gray-200-md',
	convexBackgroundColorLg: 'nm-convex-gray-200-lg',
	hoverInsetBackgroundColorSm: 'hover:nm-inset-gray-neu-sm',
	hoverInsetBackgroundColorLg: 'hover:nm-inset-gray-200-lg',
	activeAccentColor: 'text-gray-400',
	hoverActiveColor: 'hover:text-gray-400',
	textColor: 'text-gray-800',
	logoColor: '#000',
	errorTextColor: 'text-red-700',
};

export const ThemeProvider = ({ children }) => {
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

export default ThemeProvider;
