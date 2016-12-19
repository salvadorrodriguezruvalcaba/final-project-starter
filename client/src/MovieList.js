import React from 'react';

const MovieList = (props) => {
  return (

      <li className="list_of_listings">
        <div>
          <h4>{props.title}</h4>
          <img src={props.poster} alt={props.title}/>
          <p>Rating: {props.plot}</p>
          <p># of Reviews: {props.review_count}</p> 
      </div>
      </li>
  );
}

export default MovieList;
