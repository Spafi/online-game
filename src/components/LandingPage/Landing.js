import React from 'react';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import LoginContainer from '../Login/LoginContainer';
import { useTheme } from '../ThemeContext';

const Landing = (props) => {
	const theme = useTheme();
	return (
		<div className='h-screen relative w-screen'>
			<div className='grid grid-cols-2 h-full'>
				<div className='flex flex-col items-center justify-center gap-y-6'>
					<Logo
						className='w-1/3'
						fill={`${theme.logoColor}`}
					/>
					<div className=' w-1/3 text-2xl'>
						<p>
							Improve your coding skills, attention to details and reaction time by
							challenging your friends to a 1v1 coding quiz.{' '}
						</p>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					<LoginContainer
						updateUser={props.updateUser}
						updateUsername={props.updateUsername}
						updateUserBgColor={props.updateUserBgColor}
						updateCurrentPage={props.updateCurrentPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Landing;
