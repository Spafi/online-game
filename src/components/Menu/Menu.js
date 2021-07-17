import { useColor, useTextColor } from '../ColorContext';
import Button from './Button';
import { ReactComponent as Settings } from '../../icons/settings.svg';
const Menu = () => {
	const color = useColor();
	const textColor = useTextColor();
	return (
		<div className={`${textColor} fixed h-screen w-96 flex z-10 p-12`}>
			{/* MAIN MENU CONTAINER */}
			<div
				className={`nm-flat-${color}-sm items-center justify-center h-full w-full rounded-lg`}>
				{/* IMAGE & USERNAME CONTAINER */}
				<div className='flex flex-col items-center pt-12 space-y-6'>
					<img
						className={`nm-convex-${color}-lg rounded-full p-px`}
						src='https://via.placeholder.com/100'
						alt='User'
					/>
					<p className={`text-${textColor} font-light text-2xl`}>Username</p>
				</div>
				{/* MENU BUTTONS CONTAINER */}
				<div className=''>
					{/* MENU BUTTONS LIST */}
					<ul className='p-6 pt-12 space-y-6 grid items-center justify-center'>
						<li>
							<Button content='Play' height={8} />
						</li>
						<li>
							<Button content='Create' height={8} />
						</li>
						<li>
							<Button content='Join' height={8} />
						</li>
					</ul>
					<div className='absolute bottom-20 right-20'>
						<Button content={<Settings className='w-8 h-8 '/>} width={10} height={10} pX={0} pY={0} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
