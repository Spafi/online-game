import { useColor, useTextColor, useChangeColor, useChangeTextColor, useChangeAccentTextColor } from '../ColorContext';
import Button from './Button';

const SettingsPage = () => {
	const color = useColor();
	const textColor = useTextColor();

  const changeColor = useChangeColor()
  const changeTextColor = useChangeTextColor();
  const changeTextAccentColor = useChangeAccentTextColor();

  const setWhiteTheme = () => {
    changeColor('gray-200');
    changeTextColor('gray-800');
    changeTextAccentColor('gray-400');
  }
  const setDarkTheme = () => {
    changeColor('neu-gray');
				changeTextColor('purple-500');
				changeTextAccentColor('purple-700');
  }
	return (
		<div
			className={`text-${textColor} nm-flat-${color}-sm absolute ml-80 bottom-0 mb-12 min-h-sm min-w-sm w-full max-w-102 rounded-lg p-12 flex flex-col justify-between`}>
			<div className='w-full flex flex-row space-x-8'>
				<p className='mr-10'>Theme</p>
				<Button
					content={'Dark'}
					width={16}
					height={6}
					handleClick={() => setDarkTheme()}
				/>
				<Button
					content={'Light'}
					width={16}
					height={6}
					handleClick={() => setWhiteTheme()}
				/>
			</div>
			<div className='w-full'>EMPTY</div>
			<div className='w-full'>EMPTY</div>
			<div className='w-full'>EMPTY</div>
		</div>
	);
};

export default SettingsPage;
