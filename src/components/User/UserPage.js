import Page from '../common/Page.js';
import { playerDataUrl } from '../../BASE_URL.js';
import axios from 'axios';
import React, { useEffect } from 'react';

const UserPage = () => {
	const getPlayerData = async () => {
		await axios
			.get(playerDataUrl, {params: {username: localStorage.getItem('username')}})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		
		getPlayerData();
	}, []);

	return (
		<Page>
			<div className='h-full'>
				Score, Leaderboard position, Games Played, Problems submitted, Problems
				stats, Languages{' '}
			</div>
		</Page>
	);
};

export default UserPage;
