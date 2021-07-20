import { useTheme } from '../ThemeContext';
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
	const darkTheme = useTheme();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = setInterval(() => {
			setProgress((prevProgress) => {
				console.log(prevProgress);
				if (prevProgress < 100) {
					return (prevProgress += 1);
				}
				else clearInterval(updateProgress)
			});
		}, 1000);
  

		return () => {
			clearInterval(updateProgress);
		};
	}, []);

	return (
		<div
			className={`w-full h-5 rounded-lg ${
				darkTheme === true ? 'nm-inset-gray-neu-lg' : 'nm-inset-gray-200-lg'
			}`}>
			<div
				style={{ width: `${progress}%` }}
				className={`h-full bg-gradient-to-r from-green-200 via-green-400 to-purple-700 rounded-lg opacity-80 transition-all ease-in-out duration-500`}></div>
		</div>
	);
};

export default ProgressBar;
