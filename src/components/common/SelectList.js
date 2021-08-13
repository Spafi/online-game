import { useTheme } from '../ThemeContext';
import { Listbox } from '@headlessui/react';
import {  SelectorIcon } from '@heroicons/react/solid';


const SelectList = ({choices, selected, updateState}) => {
	const theme = useTheme();
	const onSelectChange = (choice) => updateState(choice) 
	
	return (
		<Listbox value={selected.name} onChange={onSelectChange}>
			<Listbox.Label>Select language: </Listbox.Label>
			<Listbox.Button
				className={`${
					theme.flatBackgroundColorSm
				} relative w-max py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-pointer focus:outline-none`}>
				<span className='block truncate'>{selected.name}</span>
				<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
					<SelectorIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
				</span>
			</Listbox.Button>
			<Listbox.Options className='w-max absolute z-50 top-10 right-2 cursor-pointer'>
				{choices.map((choice, index) => (
					<Listbox.Option key={index} value={choice} disabled={choice.unavailable}>
						{({ active }) => (
							<p
								className={`p-2 ${
									active
										? 'bg-purple-400'
										: theme.dark === true
										? 'bg-gray-neu text-white'
										: 'bg-gray-200 text-gray-800 '
								} `}>
								{choice.name}
							</p>
						)}
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
export default SelectList;
