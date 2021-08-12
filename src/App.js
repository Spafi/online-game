import './App.css';
import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import { ThemeProvider } from './components/ThemeContext.js';
import { GameProvider } from './components/Game/GameContext.js';
import Menu from './components/Menu/Menu';
import Main from './components/Main.js';
// import Helper from './components/Helper.js';
// import GamePage from './components/Game/GamePage.js';
import SelectGameType from './components/Game/SelectGameType.js';
import UserPage from './components/User/UserPage';
import SubmitProblem from './components/User/SubmitProblem';
import Leaderboard from './components/Game/Leaderboard';
import Landing from './components/LandingPage/Landing';
// import SessionExpiredMessage from './components/common/PopupMessage'

function App() {
	// eslint-disable-next-line
	const [user, setUser] = useState();
	const [username, setUsername] = useState('');
	const [userBgColor, setUserBgColor] = useState('');
	const [currentPage, setCurrentPage] = useState();
	const [leaderboardPage, setLeaderboardPage] = useState(0);

	const changeLeaderboardPage = (direction) => {
		if (direction === '-' && leaderboardPage > 0)
			setLeaderboardPage((prevPage) => prevPage - 1);
		if (direction === '+') setLeaderboardPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		const username = localStorage.getItem('username');
		const userBgColor = localStorage.getItem('userBgColor');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
			setUsername(username);
			setUserBgColor(userBgColor);
		}
	}, [username]);

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

	const updateUsername = (username) => setUsername(username);

	const updateUserBgColor = (color) => setUserBgColor(color);

	const updateCurrentPage = (page) => setCurrentPage(page);

	const switchPages = (page) => {
		switch (page) {
			case 'main':
				return <UserPage username={username} />;
			case 'play':
				return <SelectGameType />;
			case 'submitProblem':
				return <SubmitProblem />;
			case 'user':
				return <UserPage username={username} />;
			case 'leaderboard':
				return (
					<Leaderboard page={leaderboardPage} changePage={changeLeaderboardPage} />
				);
			default:
				break;
		}
	};
	return (
		<ThemeProvider>
			<div className='App subpixel-antialiased '>
				<Main>
					{/* <SessionExpiredMessage content={"Your session has expired!"} isActive={true}/> */}
					{/* <Helper /> */}
					{!user && (
						<Landing
							updateUser={updateUser}
							updateUsername={updateUsername}
							updateUserBgColor={updateUserBgColor}
							updateCurrentPage={updateCurrentPage}
						/>
					)}
					{user && (
						<GameProvider>
							<Menu
								updateUser={updateUser}
								username={username}
								userBgColor={userBgColor}
								updateCurrentPage={updateCurrentPage}
							/>
							{switchPages(currentPage)}
						</GameProvider>
					)}
				</Main>
			</div>
		</ThemeProvider>
	);
}

export default App;
