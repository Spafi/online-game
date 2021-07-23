import { useTheme } from '../ThemeContext';
import Input from './Input';
import Button from '../Menu/Button';
import RegisterSuccess from './RegisterSuccess';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { registerUrl, loginUrl } from '../../BASE_URL';

const LoginContainer = ({ updateUser }) => {
	const darkTheme = useTheme();
	const [registered, setRegistered] = useState(true);
	// eslint-disable-next-line
	const [successfulRegister, setSuccessfulRegister] = useState(false);

	const switchLogin = () => setRegistered((prevState) => !prevState);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const role = 'USER';
	const inputRef = useRef();
	const passwordRef = useRef();

	const onRegisterSuccess = () => setSuccessfulRegister(true);

	const closeModal = () => setSuccessfulRegister(false);

	const setUser = (user) => updateUser(user);

	function passwordsMatch(target) {
		setRepeatPassword(target.value);
		hideError(passwordRef);
		if (password !== target.value)
			showError(passwordRef, 'Passwords not matching!');
	}

	const handleLogin = async (e, isRegister) => {
		e.preventDefault();
		if (password === repeatPassword) {
			hideError(inputRef);
			const user =
				isRegister === true
					? { email, username, password, role }
					: { email, password };

			const url = isRegister === true ? registerUrl : loginUrl;
			await axios
				.post(url, user)
				.then((response) => {
					!isRegister && setUser(response.data);
					!isRegister && localStorage.setItem('user', JSON.stringify(response.data));
					if (isRegister && response.data !== null) {
						onRegisterSuccess();
					}
				})
				.catch((error) => {
					error.response && showError(inputRef, error.response.data.message);
					!error.response &&
						showError(inputRef, 'Error connecting to the server. Try again later');
				});
		} else {showError(passwordRef, 'Passwords not matching!');}
	};

	const showError = (ref, e) => {
		const inputContainer = ref.current;
		inputContainer.firstChild.classList.remove('border-transparent');
		inputContainer.firstChild.classList.add('border-red-500');
		inputContainer.lastChild.textContent =
			e === 'Access Denied' ? 'You need to activate your account first!' : e;
	};

	const hideError = (ref) => {
		const inputContainer = ref.current;
		inputContainer.firstChild.classList.remove('border-red-500');
		inputContainer.firstChild.classList.add('border-transparent');
		inputContainer.lastChild.textContent = '';
	};

	return (
		<div className='p-12 w-full h-screen flex items-center justify-center'>
			<RegisterSuccess isActive={successfulRegister} closeModal={closeModal} />
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
					<form
						onSubmit={(e) => handleLogin(e, true)}
						className='w-full flex flex-col items-center gap-8'>
						<Input
							placeholder={'E-mail'}
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							ref={inputRef}
						/>

						<Input
							placeholder={'Password'}
							value={password}
							type={'password'}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Input
							placeholder={'Username'}
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						<Input
							placeholder={'Retype Password'}
							value={repeatPassword}
							type={'password'}
							onChange={({ target }) => passwordsMatch(target)}
							ref={passwordRef}
						/>
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
					<form
						onSubmit={handleLogin}
						className='w-full flex flex-col items-center gap-8'>
						{' '}
						<Input
							placeholder={'E-mail'}
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							ref={inputRef}
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
		</div>
	);
};

export default LoginContainer;
