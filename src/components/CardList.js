import React from 'react';
import Card from './Card'

const CardList = ({ repos, bookmarkClick, bookmarks }) => {
	// Nothing in repos collection display no results
	// otherwise build a html string with from all repositories
	// by building a collection of Card objects and populating them with data from repos & bookmarks collections
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
								// is it bookmarked - check if repo id is in bookmarks array
								bookmarked = { bookmarks.includes(repos[i].id.toString())}	
							/>
						);
					})
				}
			</div>
		);
}

export default CardList;