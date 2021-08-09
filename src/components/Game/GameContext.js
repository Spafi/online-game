import React, { useState, useContext } from 'react';

const GameContext = React.createContext();
const UpdateGameContext = React.createContext();

export const useGame = () => useContext(GameContext);
export const useUpdateGame = () => useContext(UpdateGameContext);

export const GameProvider = ({ children }) => {
	const gameData = {
		gameId: '',
		player1: { username: '', score: 0 },
		player2: { username: '', score: 0 },
		script: `import java.util.Arrays;
import java.util.stream.IntStream;

public class Kata {
  public static int squareSum(int[] n) { 
    return Arrays
      .stream(n)
      .map(n1 -> (int) Math.pow(n1, 2))
      .reduce(Integer::sum)
      .getAsInt();
  }
}`,
		language: '',
		answers: [],
		byUser: '',
	};
	//eslint-disable-next-line
	const [game, setGame] = useState(gameData);
	const updateGame = (game) => setGame(game);

	return (
		<GameContext.Provider value={game}>
			<UpdateGameContext.Provider value={updateGame}>
				{children}
			</UpdateGameContext.Provider>
		</GameContext.Provider>
	);
};
