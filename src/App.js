import './App.css';
import Menu from './components/Menu/Menu';
import Main from './components/Main.js';
import Helper from './components/Helper.js';
import GamePage from './components/Game/GamePage.js';
import { ColorProvider } from './components/ColorContext.js';

function App() {
	return (
		<ColorProvider>
			<div className='App'>
				<Main >
				<Menu />
				<GamePage />
				<Helper />
			</Main>
			</div>
		</ColorProvider>
	);
}

export default App;
