import React from 'react';
import { Link } from 'react-router';

const List = (props) => {

  const numItems = Object.keys(props.items).length;

  return (
      <li className="list_of_lists">
        <div>
          <h4>{props.title}</h4>
          <p>Items : {numItems}</p>
          <hr></hr>
          <Link to={`/listdetail/${props.id}`}> View the Items </Link>
          <hr></hr>
          <div onClick={() => props.onDeleteList(props.id) }
               className="delete_button">  Delete this List
          </div>
      </div>
      </li>
  );
}

// List.propTypes = {
//   title: React.PropTypes.string.isRequired,
// }

export default List;
