import React, { Component } from 'react';
import axios from 'axios';
import MovieSearchBar from './MovieSearchBar';
import MoviesList from './MoviesList';

class MoviesIndex extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      movies: []
    };
  }

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?t="Sharp"&plot=short&r=json`)
    .then(resp => {
      const response = resp.data;
      this.setState({
        searchText: this.state.searchText,
        movies: response
      })
    })
    .catch(err => console.log(err) );

    // axios.get(`http://www.omdbapi.com/&plot=short&r=json`)
    //   .then(resp => {
    //         const movie =  resp.data || null;
    //         this.setState({
    //           ...this.state,
    //           moviesList: movie
    //         });
    //
    //     })
    //     .catch(err => console.log(`Error! ${err}`));
  }

  handleChange(event) {
    this.setState({
      movies: this.state.movies,
      searchText: event.target.value
    })
  }

  getFilteredListings() {
    const term = this.state.searchText.trim().toLowerCase();
    const movies = this.state.movies;

    if (!term) {
      return movies;
    }

    return movies.filter(MoviesList => {
      return movies.title.toLowerCase().search(term) >= 0;
    });
  }

  renderDetails() {
    return (
      <div>
        <h1>Search for Movies</h1>
        <hr></hr>
        <MovieSearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
        <hr></hr>
        <MoviesList
            movies={this.getFilteredListings()} />

      </div>
    );
  }



  render() {
    if (!this.state.movies) {
      return (
        <div>
          <h2>Loading the Movies...</h2>
        </div>
      )
    }
    return this.renderDetails();
  }

}

export default MoviesIndex;
