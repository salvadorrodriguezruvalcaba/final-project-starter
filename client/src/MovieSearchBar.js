import React from 'react';

const MovieSearchBar = (props) => {
  return (
    <div>
      <h4>Search by movie name: </h4>
      <input
        className='search-bar'
        type="text"
        value={props.value}
        onChange={ event => props.onChange(event) }
      />
    </div>
  );
}

MovieSearchBar.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default MovieSearchBar;
