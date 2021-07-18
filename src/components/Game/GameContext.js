import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
	const gameData = {
		code: `import java.util.Arrays;
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
	};
	//eslint-disable-next-line
	const [game, setGame] = useState(gameData);

	return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
