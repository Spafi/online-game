import { useTheme } from '../ThemeContext';
import React from 'react';

const Input = React.forwardRef(
	({ placeholder, classes, value, onChange, type, onBlur, containerClasses }, ref) => {
		const theme = useTheme();
		return (
			<div ref={ref} className={containerClasses ?? 'w-4/6 relative'}>
				<input
					onBlur={onBlur}
					type={type ?? 'text'}
					value={value ?? ''}
					onChange={onChange}
					className={`${theme.insetBackgroundColorSm} rounded-3xl placeholder-gray-400 py-2 px-4 outline-none w-full border border-transparent ${classes}`}
					placeholder={placeholder ?? 'Input'}
				/>
				<div
					className={`absolute -bottom-5 text-sm ${theme.errorTextColor} left-4`}></div>
			</div>
		);
	}
);

export default Input;
