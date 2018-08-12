import React from 'react';
import starImage from './Actions-rating-icon.png'

const Card = ({ name, id, avatarUrl, bookmarkClick, bookmarked }) => {
	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
			<img alt='avatar' src={avatarUrl} height="50px" width="50px"/>
			<div>
				<h2>{name}</h2>
				{ !bookmarked ? <button id={"bookmark-button-" + id} onClick = {bookmarkClick}>Bookmark</button> : null }
				{ bookmarked ? <img alt="bookmarked" src= { starImage }/> : null }
			</div>
		</div>
	);
}

export default Card;