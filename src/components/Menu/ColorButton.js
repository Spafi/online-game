import React from 'react'
import {
	useChangeColor,
	useChangeTextColor,
	useChangeAccentTextColor,
} from '../ColorContext';
const ColorButton = ({type, color}) => {
  const changeColor = useChangeColor()
  const changeTextColor = useChangeTextColor();
  const changeAccentColor = useChangeAccentTextColor();

  const updateColor = () => {
    switch (type) {
      case 'color':
        return changeColor(color)
      case 'text':
        return changeTextColor(color)
      case 'accent':
        return changeAccentColor(color)  
      default:
        break;
    }
  }
  return (
			<button
				className={`w-5 h-5 rounded-full nm-convex-${color}-sm`}
				onClick={() => updateColor(color)}></button>
		);
}

export default ColorButton
