import { useTheme } from '../ThemeContext';
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
	const theme = useTheme();
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const updateProgress = setInterval(() => {
			setProgress((prevProgress) => {
				
				if (prevProgress > 0) {
					return (prevProgress -= 1);
				} else clearInterval(updateProgress);
			});
		}, 1000);

		return () => {
			clearInterval(updateProgress);
		};
	}, []);

	return (
		<div className={`w-full h-5 rounded-lg ${theme.insetBackgroundColorLg}`}>
			<div
				style={{ width: `${progress}%` }}
				className={`h-full bg-gradient-to-r from-green-200 via-green-400 to-purple-700 rounded-lg opacity-80 transition-all ease-in-out duration-500`}></div>
		</div>
	);
};

export default ProgressBar;
