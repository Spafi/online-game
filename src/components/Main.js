import { useChangeColor, useColor, useTextColor } from '../components/ColorContext.js';
const Main = ({children}) => {
  const color = useColor()
  return (
			<div className={`bg-${color} h-full min-h-screen font-montserrat`}>
				{children}
			</div>
		);
}

export default Main
