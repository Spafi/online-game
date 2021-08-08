import Choice from './Choice';
import { useGame } from './GameContext';
import axios from 'axios';
import { gamePlayUrl } from '../../BASE_URL';

const ChoicesContainer = () => {
	const game = useGame();
	const answers = game.problems[0].answers;
	const onAnswerClick = async (answer) => {
		const gamePlay = {gameId: game.gameId, username: localStorage.getItem('username'), answer}
		await axios
			.post(gamePlayUrl, gamePlay)
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	};
	return (
		<div className=' w-full h-1/3 p-4'>
			<div className={` h-full grid grid-rows-2 grid-cols-2 gap-2 p-2`}>
				{answers.map((answer, index) => {
					return (
						<Choice
							children={answer}
							key={index}
							handleClick={()=>onAnswerClick(answer)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ChoicesContainer;
