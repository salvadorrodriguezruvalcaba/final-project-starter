import React from 'react';

const Item = (props) => {

  return (
      <li className="detail_of_items">
        <div>
          <h4>{props.text}</h4>
          <h4>Id:{props._id}</h4>
        </div>
        <hr></hr>
        <div onClick={() => props.onDeleteItemList(props.id)} className="delete_button">Delete this Item from list</div>
      </li>
  );
}

// Item.propTypes = {
//   text: React.PropTypes.string.isRequired,
// }

export default Item;
