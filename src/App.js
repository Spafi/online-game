import './App.css';
import Menu from './components/Menu/Menu';
import Main from './components/Main.js';
// import Helper from './components/Helper.js';
import GamePage from './components/Game/GamePage.js';
import { ThemeProvider } from './components/ThemeContext.js';
import { GameProvider } from './components/Game/GameContext.js';
import LoginContainer from './components/Login/LoginContainer.js';
import jwt from 'jwt-decode';
import React, { useState, useEffect } from 'react';

function App() {
	// eslint-disable-next-line
	const [user, setUser] = useState();

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
		}
	}, []);

	const isTokenExpired = () => {
		if (localStorage.length > 0) {
			try {
				let expiration = new Date(jwt(localStorage.getItem('user')).exp * 1000);
				let now = new Date();
				return now > expiration;
			} catch (err) {
				localStorage.clear();
			}
		}
	};

	if (isTokenExpired()) {
		localStorage.clear();
	}

	const updateUser = (user) => {
		!user && localStorage.clear();
		setUser(user);
	};
	return (
		<ThemeProvider>
			<div className='App'>
				<Main>
					{/* <Helper /> */}
					{!user && <LoginContainer updateUser={updateUser} />}
					{user && (
						<GameProvider>
							<Menu updateUser={updateUser} />
							<GamePage />
						</GameProvider>
					)}
				</Main>
			</div>
		</ThemeProvider>
	);
}

export default App;
