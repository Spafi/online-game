import { useColor, useTextColor, useAccentTextColor } from '../ColorContext';
const Button = ({ content, width, height, pX, pY, handleClick, toggled }) => {
	const color = useColor();
	const textColor = useTextColor();
	const accentColor = useAccentTextColor();
	return (
		<button
			onClick={() => handleClick()}
			className={`flex items-center justify-center rounded-2xl font-light text-sm outline-none
      nm-convex-${color}-lg 
      text-${textColor} 
      px-${pX ?? 6} 
      py-${pY ?? 'px'} 
      w-${width ?? 32} 
      h-${height ?? width} 
      ${!(toggled === true) ? `hover:` : ' '}nm-inset-${color}-lg
      ${!(toggled === true) ? `hover:` : ' '}text-${accentColor}`}>
			{content}
		</button>
	);
};

export default Button;
