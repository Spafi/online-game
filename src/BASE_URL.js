const BASE_URL = 'http://localhost:8080';

export default BASE_URL;

export const registerUrl = BASE_URL + '/api/v1/registration';

export const loginUrl = BASE_URL + '/api/v1/authenticate';

export const testCodeUrl = BASE_URL + '/api/v1/problem/run';

export const submitCodeUrl = BASE_URL + '/api/v1/problem';

export const startGameUrl = BASE_URL + '/api/v1/game/start';

export const websocketUrl = BASE_URL + '/ws';
