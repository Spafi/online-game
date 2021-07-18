import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();

const ColorContext = React.createContext();
const ChangeColorContext = React.createContext();

const TextColorContext = React.createContext();
const ChangeTextColorContext = React.createContext();

const AccentTextColorContext = React.createContext();
const ChangeAccentTextColorContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

export const useColor = () => useContext(ColorContext);
export const useChangeColor = () => useContext(ChangeColorContext);

export const useTextColor = () => useContext(TextColorContext);
export const useChangeTextColor = () => useContext(ChangeTextColorContext);

export const useAccentTextColor = () => useContext(AccentTextColorContext);
export const useChangeAccentTextColor = () => useContext(ChangeColorContext);

export const ColorProvider = ({ children }) => {
	// neu-gray, purple-500, purple-400
	// gray-200, gray-800, gray-400
	const [color, setColor] = useState('gray-200');
	const [textColor, setTextColor] = useState('gray-800');
	const [accentTextColor, setAccentTextColor] = useState('gray-400');
	// eslint-disable-next-line
	const [darkTheme, setDarkTheme] = useState(true);

	const toggleTheme = (prevTheme) => setDarkTheme((prevTheme) => !prevTheme);

	const changeColor = (newColor) => setColor(newColor);
	const changeTextColor = (newTextColor) => setTextColor(newTextColor);
	const changeAccentTextColor = (newAccentColor) =>
		setAccentTextColor(newAccentColor);

	return (
		<ColorContext.Provider value={color}>
			<TextColorContext.Provider value={textColor}>
				<AccentTextColorContext.Provider value={accentTextColor}>
					<ChangeColorContext.Provider value={changeColor}>
						<ChangeTextColorContext.Provider value={changeTextColor}>
							<ChangeAccentTextColorContext.Provider value={changeAccentTextColor}>
								<ThemeContext.Provider value={toggleTheme}>
									{children}
								</ThemeContext.Provider>
							</ChangeAccentTextColorContext.Provider>
						</ChangeTextColorContext.Provider>
					</ChangeColorContext.Provider>
				</AccentTextColorContext.Provider>
			</TextColorContext.Provider>
		</ColorContext.Provider>
	);
};

export default ColorProvider;
