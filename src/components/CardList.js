import React from 'react';
import Card from './Card'

const CardList = ({ repos, bookmarkClick, bookmarks }) => {
	if (bookmarks.length) {
		console.log(bookmarks);
		console.log(bookmarks.includes(repos[0].id.toString()));
	}
	console.log(bookmarks);
	return !repos.length ? 
		<h1>No results</h1> : 
		( 
			<div>
				{ 
					repos.map((item, i) => {
						return (
							<Card 
								key={repos[i].id}  
								id={repos[i].id} 
								name={repos[i].name} 
								avatarUrl={repos[i].owner.avatar_url}
								bookmarkClick = { bookmarkClick }
								bookmarked = { bookmarks.includes(repos[i].id.toString())}
							/>
						);
					})
				}
			</div>
		);
}

export default CardList;