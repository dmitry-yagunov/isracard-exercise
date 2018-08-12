import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {
	constructor() {
		super()
		this.state = {
			repos: [],
			searchField: '',
			bookmarks: [],
			showOnlyBookmarked: false
		}
	}

	componentDidMount() {
	}

	onSearchChange = (event)  => {
		this.setState({ searchField: event.target.value })
	}

	onSearchClick = (event) => {
		fetch('https://api.github.com/search/repositories?q=' + this.state.searchField)
			.then(response => response.json())
			.then(response => this.setState({repos: response.items}));
	}

	onBookmarkClick = (event) => {
		var newBookmarkId = event.target.id.split("-")[2];
		
		if (!this.state.bookmarks.includes(newBookmarkId)) {
			console.log("ADDED " + newBookmarkId);
			this.state.bookmarks.push(newBookmarkId);
			this.setState({bookmarks: this.state.bookmarks });
		}
	}

	onOnlyBookmarkedChange = (event) => {
		this.setState({showOnlyBookmarked: event.target.checked})
	}

	render() {
		const { repos, bookmarks } = this.state;
		const filteredRepos = !this.state.showOnlyBookmarked ? 
			repos : 
			repos.filter(repo => {
				return this.state.bookmarks.includes(repo.id.toString())
		});

		console.log(this.state.bookmarks);
		console.log(filteredRepos);

		
		return (
			<div className='tc'>
				<h1>git repositories</h1>
				<SearchBox searchChange = {this.onSearchChange}/>
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
					<CardList repos = { filteredRepos } 
					          bookmarkClick = { this.onBookmarkClick} 
					          bookmarks = { bookmarks } />
				</Scroll>
			</div>
		);
	}
}

export default App; 