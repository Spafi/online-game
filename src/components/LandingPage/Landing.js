import React, { useState, useEffect } from 'react';

import LoginContainer from '../Login/LoginContainer';
const Landing = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// eslint-disable-next-line
	const [user, setUser] = useState();
	return (
		<div className='p-12 w-full h-screen flex items-center justify-center'>
			{!user && (
				<LoginContainer
					user={user}
					username={username}
					email={email}
					password={password}
					setUsername={setUsername}
					setUser={setUser}
					setEmail={setEmail}
					setPassword={setPassword}
				/>
			)}
		</div>
	);
};

export default Landing;
