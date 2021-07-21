import { useTheme } from '../ThemeContext';

const Input = ({placeholder, classes, value, onChange, type}) => {
	const darkTheme = useTheme();
	return (
		<input
			type={type ?? 'text'}
			value={value}
			onChange={onChange}
			className={`${
				darkTheme === true ? 'nm-inset-gray-neu-sm' : 'nm-flat-gray-200-sm'
			} rounded-3xl placeholder-gray-400 py-2 px-4 outline-none w-4/6 ${classes}`}
			placeholder={placeholder ?? 'Input'}
		/>
	);
};

export default Input;
