import { useGame } from './GameContext';
import EditableCodeContainer from './EditableCodeContainer';

const ProblemContainer = ({readOnly}) => {
	const game = useGame();

	return (
		<div className='h-full'>
			<div className='relative h-full'>
				<EditableCodeContainer
					script={game.script && game.script}
					language={game.language && game.language}
					readOnly={readOnly}
				/>
				{game.byUser && (
					<p className='absolute bottom-0 right-0 text-xs p-1'>By: {game.byUser}</p>
				)}
			</div>
			<div className='text-lg min-h-0 max-h-24 px-4 py-2 relative'></div>
		</div>
	);
};

export default ProblemContainer;
