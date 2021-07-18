import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
	const gameData = {
		code: `import java.util.*;
import java.util.stream.IntStream;

public class Dinglemouse {

    public static int[] paintLetterboxes(final int start, final int end) {
        Map<Integer, Integer> occurrences = new java.util.LinkedHashMap<>(
                Map.of(
                        0, 0,
                        1, 0,
                        2, 0,
                        3, 0,
                        4, 0,
                        5, 0,
                        6, 0,
                        7, 0,
                        8, 0,
                        9, 0
                ));
        IntStream
                .rangeClosed(start, end)
                .forEach(num -> Arrays
                        .stream(String.valueOf(num).split(""))
                        .forEach(k -> occurrences.put(Integer.parseInt(k), (occurrences.get(Integer.parseInt(k))) + 1)));

        List<Integer> result = new ArrayList<>();
        for (int i : occurrences.keySet()) result.add(occurrences.get(i));
        

        return (result.stream().mapToInt(i -> i).toArray());
    }
}`,
	};
	const [game, setGame] = useState(gameData);

	return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
