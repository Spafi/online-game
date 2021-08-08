const BASE_URL = 'https://code-rush-server.herokuapp.com';

export default BASE_URL;

export const registerUrl = BASE_URL + '/api/v1/registration';

export const loginUrl = BASE_URL + '/api/v1/authenticate';

export const testCodeUrl = BASE_URL + '/api/v1/problem/run';

export const submitCodeUrl = BASE_URL + '/api/v1/problem';

export const startGameUrl = BASE_URL + '/api/v1/game/start';

export const webSocketUrl = BASE_URL + '/gameplay';

export const gamePlayUrl = BASE_URL + '/api/v1/game/gameplay';

export const joinGameUrl = BASE_URL + '/api/v1/game/connect';

export const gameProgressUrl = '/topic/game-progress';
