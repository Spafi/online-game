import './App.css';
import Menu from './components/Menu/Menu';
import { ColorProvider } from './components/ColorContext.js';


function App() {
const color = 'neu-gray'
	return (
		<ColorProvider>
			<div className={`App bg-${color} h-full min-h-screen font-nunito`}>
				<Menu />

				<div className=' pl-96'>
					<h1 className={`text-auto`}>Flat </h1>
					<div className={`w-24 h-24 nm-flat-${color}-sm rounded-lg`}></div>
					<div className={`w-24 h-24 nm-flat-${color}`}></div>
					<div className={`w-24 h-24 nm-flat-${color}-lg rounded-lg`}></div>

					<h1 className={`text-white`}>Concave </h1>
					<div className={`w-24 h-24 nm-concave-${color}-sm`}></div>
					<div className={`w-24 h-24 nm-concave-${color}`}></div>
					<div className={`w-24 h-24 nm-concave-${color}-lg rounded-lg`}></div>

					<h1 className={`text-white`}>Convex </h1>
					<div className={`w-24 h-24 nm-convex-${color}-sm`}></div>
					<div className={`w-24 h-24 nm-convex-${color}`}></div>
					<div className={`w-24 h-24 nm-convex-${color}-lg rounded-lg`}></div>

					<h1 className={`text-white`}>Inset </h1>
					<div className={`w-24 h-24 nm-inset-${color}-sm`}></div>
					<div className={`w-24 h-24 nm-inset-${color}`}></div>
					<div className={`w-24 h-24 nm-inset-${color}-lg rounded-lg`}></div>
				</div>
			</div>
		</ColorProvider>
	);
}

export default App;
