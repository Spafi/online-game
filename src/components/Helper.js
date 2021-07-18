const Helper = () => {
	const color = 'neu-gray';
	return (
		<div className=' pl-96 grid grid-cols-4'>
			<div className='space-y-12'>
				<h1 className={`text-white`}>Flat </h1>
				<div className={`w-24 h-24 nm-flat-${color}-sm rounded-lg`}></div>
				<div className={`w-24 h-24 nm-flat-${color}`}></div>
				<div className={`w-24 h-24 nm-flat-${color}-lg rounded-lg`}></div>
			</div>
			<div className='space-y-12'>
				<h1 className={`text-white`}>Concave </h1>
				<div className={`w-24 h-24 nm-concave-${color}-sm`}></div>
				<div className={`w-24 h-24 nm-concave-${color}`}></div>
				<div className={`w-24 h-24 nm-concave-${color}-lg rounded-lg`}></div>
			</div>
			<div className='space-y-12'>
				<h1 className={`text-white`}>Convex </h1>
				<div className={`w-24 h-24 nm-convex-${color}-sm`}></div>
				<div className={`w-24 h-24 nm-convex-${color}`}></div>
				<div className={`w-24 h-24 nm-convex-${color}-lg rounded-lg`}></div>
			</div>
			<div className='space-y-12'>
				<h1 className={`text-white`}>Inset </h1>
				<div className={`w-24 h-24 nm-inset-${color}-sm`}></div>
				<div className={`w-24 h-24 nm-inset-${color}`}></div>
				<div className={`w-24 h-24 nm-inset-${color}-lg rounded-lg`}></div>
			</div>
		</div>
	);
};

export default Helper;
