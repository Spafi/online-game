import { useColor, useTextColor, useAccentTextColor } from '../ColorContext';
const Button = ({ content, width, height, pX, pY }) => {
	const color = useColor();
	const textColor = useTextColor();
	const accentColor = useAccentTextColor();
	return (
		<button
			className={`flex items-center justify-center rounded-2xl font-light text-sm
      nm-convex-${color}-lg 
      text-${textColor} 
      px-${pX ?? 6} 
      py-${pY ?? 'px'} 
      w-${width ?? 32} 
      h-${height ?? width} 
      hover:nm-inset-${color}-lg
      hover:text-${accentColor}`}>
			{content}
		</button>
	);
};

export default Button;
