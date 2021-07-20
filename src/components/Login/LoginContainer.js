import { useTheme } from '../ThemeContext';
import Input from './Input';
import Button from '../Menu/Button';
import React, { useState } from 'react';

const LoginContainer = () => {
	const darkTheme = useTheme();
	const [registered, setRegistered] = useState(true);

	const switchLogin = () => setRegistered((prevState) => !prevState);
	return (
		<div
			className={`${
				darkTheme === true ? 'nm-flat-gray-neu-sm' : 'nm-flat-gray-200-sm'
			}
        w-full max-w-102 h-5/6 rounded-lg flex flex-col items-center gap-8 pt-12`}>
			<div
				className={`${
					darkTheme === true ? 'nm-convex-gray-neu-lg' : 'nm-convex-gray-200-lg'
				} rounded-full p-px w-24 h-24 flex items-center justify-center`}>
				Programmers Hub
			</div>

			{!registered && (
				<>
					<Input placeholder={'E-mail'} />
					<Input placeholder={'Username'} />
					<Input placeholder={'Password'} />
					<Input placeholder={'Retype Password'} />
					<Button content={'Sign Up'} classes='px-6' />
					<p className='text-sm'>
						Already registered?{' '}
						<span className='underline cursor-pointer' onClick={() => switchLogin()}>
							Sign In
						</span>
					</p>
				</>
			)}

			{registered && (
				<>
					{' '}
					<Input placeholder={'Username'} />
					<Input placeholder={'Password'} />
					<Button content={'Sign In'} classes='px-6' />
					<p className='text-sm'>
						No account?{' '}
						<span className='underline cursor-pointer' onClick={() => switchLogin()}>
							Sign Up
						</span>
					</p>
				</>
			)}
		</div>
	);
};

export default LoginContainer;
