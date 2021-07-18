import {
	useColor,
	useChangeColor,
	useChangeTextColor,
	useChangeAccentTextColor,
} from '../ColorContext';

import ColorButton from './ColorButton';
import Button from './Button';

const SettingsPage = () => {
	const color = useColor();

	const changeColor = useChangeColor();
	const changeTextColor = useChangeTextColor();
	const changeTextAccentColor = useChangeAccentTextColor();

	const setWhiteTheme = () => {
		changeColor('gray-200');
		changeTextColor('gray-800');
		changeTextAccentColor('gray-400');
	};
	const setDarkTheme = () => {
		changeColor('neu-gray');
		changeTextColor('gray-200');
		changeTextAccentColor('gray-400');
	};

	return (
		<div
			className={`nm-flat-${color}-sm absolute ml-80 bottom-0 mb-12 min-h-sm min-w-sm w-full max-w-102 rounded-lg p-12 flex flex-col justify-between `}>
			<div className='w-full flex flex-row space-x-8'>
				<p className='mr-10'>Theme</p>
				<Button
					content={'Dark'}
					width={16}
					height={6}
					handleClick={() => setDarkTheme()}
					toggled={color === 'neu-gray'}
				/>
				<Button
					content={'Light'}
					width={16}
					height={6}
					handleClick={() => setWhiteTheme()}
					toggled={color === 'gray-200'}
				/>
			</div>
			{/* <div className='w-full flex flex-row space-x-8'>
				<p className='mr-10 whitespace-pre'>Color   </p>
				<Button
					content={'Dark'}
					width={16}
					height={6}
					handleClick={() => setDarkTheme()}
					toggled={color === 'neu-gray'}
				/>
				<Button
					content={'Light'}
					width={16}
					height={6}
					handleClick={() => setWhiteTheme()}
					toggled={color === 'gray-200'}
				/>
			</div> */}
			{/* <div className='w-full flex flex-row space-x-4'>
				<p className='mr-10'>BG Color</p>
				<ColorButton type={'color'} color={'gray-800'} />
				<ColorButton type={'color'} color={'gray-700'} />
				<ColorButton type={'color'} color={'gray-600'} />
				<ColorButton type={'color'} color={'gray-300'} />
			</div> */}
			<div className='w-full flex flex-row space-x-4'>
				<p className='mr-10'>Text</p>
				<ColorButton type={'text'} color={'gray-100'} />
				<ColorButton type={'text'} color={'gray-800'} />
				<ColorButton type={'text'} color={'green-500'} />
				<ColorButton type={'text'} color={'blue-500'} />
				<ColorButton type={'text'} color={'red-600'} />
				<ColorButton type={'text'} color={'purple-600'} />

			</div>
			{/* <div className='w-full'>
				<p className='mr-10'>Accent</p>
			</div> */}
		</div>
	);
};

export default SettingsPage;
