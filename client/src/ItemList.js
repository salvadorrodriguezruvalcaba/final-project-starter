import React from 'react';
import Item from './Item';

const ItemList = (props) => {
    console.log(props.items);
    return (
      <ul>

        {props.items.map(item => {
          const { ItemId } = item;

          return (
            <Item
              key={ItemId}
              id={ItemId}
              text={ItemId}
              onDeleteItemList={props.onDeleteItemList}
            />
          )
        })}

      </ul>
    );
}

export default ItemList;
