import axios from 'axios';

export const AuthHeader = () => {
	let headers = {};

	if (localStorage.user) {
		headers.Authorization = `Bearer ${localStorage.user.token}`;
	}

	return headers;
};
