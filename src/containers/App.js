import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {
	constructor() {
		super()
		this.state = {
			repos: [], 					// Fetched repositories
			searchField: '',			// Current search field
			bookmarks: [],				// Ids of bookmarked repositories
			showOnlyBookmarked: false	// value of 'Show only bookmarked' checkbox
		}
	}

	componentDidMount() {
	}

	// On each new character entered in seach field update state searchField property
	onSearchChange = (event)  => {
		this.setState({ searchField: event.target.value })
	}

	// On search run API, save results to state repos property
	onSearchClick = (event) => {
		fetch('https://api.github.com/search/repositories?q=' + this.state.searchField)
			.then(response => response.json())
			.then(response => this.setState({repos: response.items}));
	}

	// We come here from card bookmark click, card represents a single repository
	onBookmarkClick = (event) => {
		// Take repo id from button id
		var newBookmarkId = event.target.id.split("-")[2];
		
		// Add it to bookmarks state property if its not already there
		if (!this.state.bookmarks.includes(newBookmarkId)) {
			this.state.bookmarks.push(newBookmarkId);
			
			// for correct card refresh (show star icon)
			this.setState({bookmarks: this.state.bookmarks });
		}
	}

	// on 'Only Show Bookmarked' click save value to showOnlyBookmarked state property
	onOnlyBookmarkedChange = (event) => {
		this.setState({showOnlyBookmarked: event.target.checked})
	}

	// run search on enter
	onKeyPress = (event) => {
		if (event.key === "Enter") {
			this.onSearchClick(event);
		}
	}

	/* Main render
	 		[SearchBox]
	 		[]'Show only bookmarked repos?'
	 ----------------------------------------------
	 Scroll container
	 	CardList container - each Card represents a repository fetched from API
	 		Each Card - Avatar
	 				  - name
	 				  - Bookmark / star icon
	 |    [ Repo 1 ]       [ Repo 2 ]
	 |    [ Repo 1 ]       [ Repo 2 ]
	 |    [ Repo 1 ]       [ Repo 2 ]

	 |    [ Repo 3 ]       [ Repo 4 ]
	 |    [ Repo 3 ]       [ Repo 4 ]
	 |    [ Repo 3 ]       [ Repo 4 ]
	
	.....
	-----------------------------------------------
	*/ 
	render() {
		const { repos, bookmarks } = this.state;
		
		// filter for only bookmarked repos if needed
		const filteredRepos = !this.state.showOnlyBookmarked ? 
			repos : 
			repos.filter(repo => {
				return this.state.bookmarks.includes(repo.id.toString())
		});

		return (
			<div className='tc'>
				<h1>git repositories</h1>
				<SearchBox searchChange = {this.onSearchChange} keyPress  = {this.onKeyPress}/>
				<button onClick = {this.onSearchClick}>Search</button>
				<div>
					<input type="checkbox" 
						   id="onlyBookmarked" 
						   name="checkOnlyBookmarked" 
						   value="onlyBookmarkedRepos"
						   onChange = { this.onOnlyBookmarkedChange}/>
    				<label>Show only bookmarked repos?</label>
				</div>
				<Scroll>
					{/* Populare CardList with filtered repositories collection, bookmarked repositories collection*/}
					<CardList repos = { filteredRepos } 
					          bookmarkClick = { this.onBookmarkClick} 
					          bookmarks = { bookmarks } />
				</Scroll>
			</div>
		);
	}
}

export default App; 