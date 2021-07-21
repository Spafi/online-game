import { useTheme } from '../ThemeContext';
import Input from './Input';
import Button from '../Menu/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {registerUrl, loginUrl} from '../../BASE_URL';

const LoginContainer = () => {
	const darkTheme = useTheme();
	const [registered, setRegistered] = useState(true);

	const switchLogin = () => setRegistered((prevState) => !prevState);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState();
	const role = 'USER';

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
		}
	}, []);

	const handleLogout = () => {
		setUser({});
		setUsername('');
		setEmail('');
		setPassword('');
		localStorage.clear();
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const user = { email, password };
		console.log(user);
		const response = await axios.post(loginUrl, user);
		setUser(response.data);
		localStorage.setItem('user', JSON.stringify(response.data));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const user = { email, username, password, role };
		const response = await axios.post(registerUrl, user);
		setUser(response.data);
		localStorage.setItem('user', JSON.stringify(response.data));
	};

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
				Logo
			</div>

			{!registered && (
				<form onSubmit={handleRegister} className='w-full flex flex-col items-center gap-8'>
					<Input
						placeholder={'E-mail'}
						value={email}
						onChange={({ target }) => setEmail(target.value)}
					/>
					<Input
						placeholder={'Username'}
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
					<Input
						placeholder={'Password'}
						value={password}
						type={'password'}
						onChange={({ target }) => setPassword(target.value)}
					/>
					<Input placeholder={'Retype Password'} type={'password'} />
					<Button content={'Sign Up'} classes='px-6' type={'submit'} />
					<p className='text-sm'>
						Already registered?{' '}
						<span className='underline cursor-pointer' onClick={() => switchLogin()}>
							Sign In
						</span>
					</p>
				</form>
			)}

			{registered && (
				<form onSubmit={handleLogin} className='w-full flex flex-col items-center gap-8'>
					{' '}
					<Input
						placeholder={'E-mail'}
						value={email}
						onChange={({ target }) => setEmail(target.value)}
					/>
					<Input
						placeholder={'Password'}
						value={password}
						type={'password'}
						onChange={({ target }) => setPassword(target.value)}
					/>
					<Button content={'Sign In'} classes='px-6' type={'submit'} />
					<p className='text-sm'>
						No account?{' '}
						<span className='underline cursor-pointer' onClick={() => switchLogin()}>
							Sign Up
						</span>
					</p>
				</form>
			)}
		</div>
	);
};

export default LoginContainer;
