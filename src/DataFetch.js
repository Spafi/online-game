

export const AuthHeader = () => {
	let headers = {};

	if (localStorage.user) {
		headers.Authorization = `Bearer ${localStorage.user}`;
	}

	return headers;
};
