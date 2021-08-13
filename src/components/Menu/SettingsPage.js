import { useTheme, useToggleTheme } from '../ThemeContext';

import Button from '../common/Button';

const SettingsPage = ({updateUser}) => {
	const theme = useTheme();
	const toggleTheme = useToggleTheme();
	const setUser = (user) => updateUser(user);
	return (
		<div
			className={`${theme.flatBackgroundColorSm} absolute ml-80 bottom-0 mb-12 min-h-sm min-w-sm w-full max-w-102 rounded-lg p-12 flex flex-col justify-between `}>
			<div className='w-full flex flex-row space-x-8 justify-left items-center'>
				<p className='mr-10'>Theme</p>
				<Button
					content={'Dark'}
					width={16}
					height={6}
					pX={'2'}
					pY={'px'}
					handleClick={() => toggleTheme()}
					toggled={theme.dark}
				/>
				<Button
					content={'Light'}
					width={16}
					height={6}
					pX={'2'}
					pY={'px'}
					handleClick={() => toggleTheme()}
					toggled={!theme.dark}
				/>
			</div>

			<div className='w-full flex flex-row space-x-8 justify-left items-center'>
				<Button content={'Logout'} handleClick={() => setUser()} />
			</div>
		</div>
	);
};

export default SettingsPage;
