import Choice from './Choice';

const ChoicesContainer = () => {

	return (
		<div className=' w-full h-1/3 p-4'>
			<div
				className={` h-full grid grid-rows-2 grid-cols-2 gap-2 p-2`}>
				<Choice children={'56'} />
				<Choice children={'58'}  />
				<Choice
					children={
						'Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 3 '
					}
				/>
				<Choice children={'{4, 16, 36}'}  />
			</div>
		</div>
	);
};

export default ChoicesContainer;
