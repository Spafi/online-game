import { useTheme } from '../ThemeContext';
const Button = ({ content, handleClick, toggled, classes, type }) => {
	const theme = useTheme();

	return (
		<button
			type={type ?? 'button'}
			onClick={() => typeof handleClick === 'function' && handleClick()}
			className={`flex items-center p-2 justify-center rounded-2xl font-light text-sm outline-none 
			
      ${theme.convexBackgroundColorSm} 
      ${` ${theme.hoverInsetBackgroundColorLg}`}
			${toggled && `${theme.hoverInsetBackgroundColorLg}`}
			${toggled && `${theme.activeAccentColor}`}
			${theme.hoverActiveColor} 
			${classes ?? ''}`}>
			{content}
		</button>
	);
};

export default Button;
