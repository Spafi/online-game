import { useTheme } from '../ThemeContext';
import React from 'react';

const Input = React.forwardRef(
	({ placeholder, classes, value, onChange, type, onBlur, containerClasses }, ref) => {
		const darkTheme = useTheme();
		return (
			<div ref={ref} className={containerClasses ?? 'w-4/6 relative'}>
				<input
					onBlur={onBlur}
					type={type ?? 'text'}
					value={value ?? ''}
					onChange={onChange}
					className={`${
						darkTheme === true ? 'nm-inset-gray-neu-sm' : 'nm-flat-gray-200-sm'
					} rounded-3xl placeholder-gray-400 py-2 px-4 outline-none w-full border border-transparent ${classes}`}
					placeholder={placeholder ?? 'Input'}
				/>
				<div className='absolute -bottom-5 text-xs text-red-700 left-4'></div>
			</div>
		);
	}
);

export default Input;
