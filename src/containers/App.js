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
			bookmarks: []
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

	render() {
		const { repos, bookmarks } = this.state;
		
		return (
			<div className='tc'>
				<h1>git repositories</h1>
				<SearchBox searchChange = {this.onSearchChange}/>
				<button onClick = {this.onSearchClick}>Search</button>
				<Scroll>
					<CardList repos = {repos} 
					          bookmarkClick = { this.onBookmarkClick} 
					          bookmarks = { bookmarks } />
				</Scroll>
			</div>
		);
	}
}

export default App; 