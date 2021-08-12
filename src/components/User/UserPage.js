import Page from '../common/Page.js';
import { playerDataUrl } from '../../BASE_URL.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserPage = ({username}) => {
  const [userData, setUserData] = useState()
	const getPlayerData = async () => {
		await axios
			.get(playerDataUrl, { params: { username: username } })
			.then((response) => {
				setUserData(response.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getPlayerData();
		// eslint-disable-next-line
	}, []);

	return (
		<Page>
			<div className='h-full space-y-4 text-xl'>
				{/* Score, Leaderboard position, Games Played, Problems submitted, Problems
				stats, Languages */}
        <p>Score: {userData?.score}</p>
        <p>Games played: {userData?.gamesPlayed}</p>
        <p>Submitted problems: {userData?.submittedProblems.length}</p>
			</div>
		</Page>
	);
};

export default UserPage;
