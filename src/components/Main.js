import { useColor, useTextColor } from '../components/ColorContext.js';
const Main = ({ children }) => {
	const color = useColor();
	const textColor = useTextColor();
	return (
		<div
			className={`bg-${color} h-full min-h-screen font-montserrat text-${textColor}`}>
			{children}
		</div>
	);
};

export default Main;
