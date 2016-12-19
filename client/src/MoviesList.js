import React from 'react';
import MovieList from './MovieList';

const MoviesList = (props) => {

    return (
      <ul>
      {props.movies.map(movie => {
          return (
            <MovieList
              key={movie.imdbID}
              imdbID={movie.imdbID}
              title={movie.title}
              poster={movie.poster}
              director={movie.director}
              actors={movie.actors}
              plot={movie.plot}
              onDelete={props.onDelete}
            />
          )
          })}
      </ul>
    );
}

export default MoviesList;
