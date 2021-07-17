import React, { useContext } from 'react';

const ColorContext = React.createContext();
const TextColorContext = React.createContext();
const AccentTextColorContext = React.createContext();

export const useColor = () => useContext(ColorContext);

export const useTextColor = () => useContext(TextColorContext);
export const useAccentTextColor = () => useContext(AccentTextColorContext);

export const ColorProvider = ({ children }) => {
	const color = 'neu-gray';
	const textColor = 'purple-300';
	const accentTextColor = 'purple-400';

	return (
		<ColorContext.Provider value={color}>
			<TextColorContext.Provider value={textColor}>
				<AccentTextColorContext.Provider value={accentTextColor}>
					{children}
				</AccentTextColorContext.Provider>
			</TextColorContext.Provider>
		</ColorContext.Provider>
	);
};

export default ColorProvider;
