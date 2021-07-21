import './App.css';
import Menu from './components/Menu/Menu';
import Main from './components/Main.js';
// import Helper from './components/Helper.js';
import GamePage from './components/Game/GamePage.js';
import { ThemeProvider } from './components/ThemeContext.js';
import { GameProvider } from './components/Game/GameContext.js';
import Landing from './components/LandingPage/Landing.js';
import React, { useState } from 'react'

function App() {

	return (
		<ThemeProvider>
			<div className='App'>
				<Main>
					<Landing/>
						<GameProvider>
							<Menu />
							<GamePage />
						</GameProvider>
					
					{/* <Helper /> */}
				</Main>
			</div>
		</ThemeProvider>
	);
}

export default App;
