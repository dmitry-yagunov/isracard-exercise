import React from 'react';

const SearchBox = ({ searchChange, keyPress }) => {
	return (
		<div className='pa2'>
			<input 
				className='pa3 ba b--green bg-lightest-blue'
				type='search' 
				placeholder='Search git repositories'
				onChange = {searchChange}
				onKeyPress = {keyPress}
			/>
		</div>
	);
}

export default SearchBox;