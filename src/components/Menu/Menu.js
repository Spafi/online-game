import React, { useState } from 'react';

import { useChangeColor, useColor } from '../ColorContext';
import Button from './Button';
import SettingsPage from './SettingsPage.js';
import { ReactComponent as Settings } from '../../icons/settings.svg';
const Menu = () => {
	const color = useColor();
	const changeColor = useChangeColor();

	const [showSettings, setShowSettings] = useState(false);

	const toggleMenu = () => setShowSettings((prevState) => !prevState);

	return (
		<div className={`fixed h-screen w-96 flex z-20 p-12`}>
			{/* MAIN MENU CONTAINER */}
			<div
				className={`nm-flat-${color}-sm items-center justify-center h-full w-full rounded-lg`}>
				{/* IMAGE & USERNAME CONTAINER */}
				<div className='flex flex-col items-center pt-12 space-y-6'>
					<img
						className={`nm-convex-${color}-lg rounded-full p-px`}
						src='https://via.placeholder.com/100'
						alt='User'
					/>
					<p className={`font-light text-2xl`}>Username</p>
				</div>
				{/* MENU BUTTONS CONTAINER */}
				<div className=''>
					{/* MENU BUTTONS LIST */}
					<ul className='p-6 pt-12 space-y-6 grid items-center justify-center'>
						<li>
							<Button content='Play' height={8} />
						</li>
						<li>
							<Button content='Create' height={8} />
						</li>
						<li>
							<Button
								content='Join'
								height={8}
								handleClick={() => changeColor('gray-800')}
							/>
						</li>
					</ul>
					<div className='absolute bottom-20 right-20'>
						<Button
							content={<Settings className='w-8 h-8 ' />}
							width={10}
							height={10}
							pX={0}
							pY={0}
							handleClick={() => toggleMenu()}
							toggled={showSettings}
						/>
					</div>
				</div>
			</div>
			{showSettings && <SettingsPage />}
		</div>
	);
};

export default Menu;
