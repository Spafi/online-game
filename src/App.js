import './App.css';
import Menu from './components/Menu/Menu';
import Main from './components/Main.js';
// import Helper from './components/Helper.js';
import GamePage from './components/Game/GamePage.js';
import { ThemeProvider } from './components/ThemeContext.js';
import { GameProvider } from './components/Game/GameContext.js';

function App() {
	return (
		<ThemeProvider>
			<div className='App'>
				<Main>
					<Menu />
					<GameProvider>
						<GamePage />
					</GameProvider>
					{/* <Helper /> */}
				</Main>
			</div>
		</ThemeProvider>
	);
}

export default App;
