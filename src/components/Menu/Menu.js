import React, { useState } from 'react';

import { useTheme } from '../ThemeContext';
import Button from './Button';
import SettingsPage from './SettingsPage.js';
import { ReactComponent as Settings } from '../../icons/settings.svg';
const Menu = (props) => {
	const darkTheme = useTheme();

	const [showSettings, setShowSettings] = useState(false);

	const toggleMenu = () => setShowSettings((prevState) => !prevState);

	let randomColor = Math.floor(Math.random() * 16777215).toString(16);
	if (!localStorage.getItem('usernameBackgroundColor'))
		localStorage.setItem('usernameBackgroundColor', randomColor);

	const usernameBgColor = localStorage.getItem('usernameBackgroundColor');

	const username = props.username;

	return (
		<div className={`fixed h-screen w-96 flex z-20 p-12`}>
			{/* MAIN MENU CONTAINER */}
			<div
				className={`${
					darkTheme === true ? 'nm-flat-gray-neu-sm' : 'nm-flat-gray-200-sm'
				} items-center justify-center h-full w-full rounded-lg`}>
				{/* IMAGE & USERNAME CONTAINER */}
				<div className='flex flex-col items-center pt-12 space-y-6'>
					<div
						className={`${
							darkTheme === true ? 'nm-convex-gray-neu-lg' : 'nm-convex-gray-200-lg'
						} rounded-full p-px w-24 h-24 flex items-center justify-center text-4xl`}>
						<div
							className={` rounded-full p-px w-24 h-24 flex items-center justify-center text-4xl`}
							style={{ backgroundColor: '#' + usernameBgColor }}>
							<p>{username.substring(0, 1).toUpperCase()}</p>
						</div>
					</div>
					<p className={`font-light text-2xl`}>{username}</p>
				</div>
				{/* MENU BUTTONS CONTAINER */}
				<div className=''>
					{/* MENU BUTTONS LIST */}
					<div className=' py-12 space-y-6 grid items-center px-16'>
						<Button content='Play' />

						<Button content='Create' />

						<Button content='Join' />
					</div>
					<div className='absolute bottom-20 right-20'>
						<Button
							content={<Settings className='w-8 h-8' />}
							className='w-10 h-10 p-2'
							handleClick={() => toggleMenu()}
							toggled={showSettings}
						/>
					</div>
				</div>
			</div>
			{showSettings && <SettingsPage updateUser={props.updateUser} />}
		</div>
	);
};

export default Menu;
