import React from 'react';
import Page from '../common/Page';
import axios from 'axios';
import { leaderboardUrl } from '../../BASE_URL';
import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import Button from '../common/Button';


const Leaderboard = ({ page, changePage }) => {
	const [leaderboard, setLeaderboard] = useState([]);
	const darkTheme = useTheme();
// TODO: update leaderboard state, and don't perform more requests on no more results
	const getLeaderboardData = async (page) => {
		await axios
			.get(leaderboardUrl, {
				params: { pageNo: page },
			})
			.then((response) => {
				setLeaderboard(response.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getLeaderboardData(page);
	}, [page]);
	return (
		<Page>
			<div className='w-full text-center text-5xl pb-8'>Leaderboard</div>
			<div
				className={`${
					darkTheme === true ? 'nm-inset-gray-neu-sm' : 'nm-inset-gray-200-sm'
				}  rounded-xl w-full h-full p-2 px-4 overflow-x-hidden`}>
				<table className='w-full'>
					<thead>
						<tr className='border-b-8 border-transparent'>
							{/* <th className='text-left pr-3'>Pos </th> */}
							<th className='text-left w-1/2'>Player</th>
							<th>Games Played</th>
							<th className='text-right'>Score</th>
						</tr>
					</thead>
					<tbody className='overflow-hidden'>
						{leaderboard.map((entry) => (
							<tr key={entry.username} className='h-10'>
								{/* <td className='w-2 border-b border-gray-400'>position</td> */}
								<td className='border-b border-gray-400'>{entry.username}</td>
								<td className='text-center border-b border-gray-400'>
									{entry.gamesPlayed}
								</td>
								<td className='text-right border-b border-gray-400'>{entry.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='flex justify-between px-2 pt-4'>
				<Button content={'Back'} handleClick={() => changePage('-')}></Button>
				<Button content={'Next'} handleClick={() => changePage('+')}></Button>
			</div>
		</Page>
	);
};

export default Leaderboard;
