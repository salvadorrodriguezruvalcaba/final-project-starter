import React, { Component } from 'react';
import axios from 'axios';
import ItemNewForm from './ItemNewForm';
import ItemList from './ItemList';
import { Link } from 'react-router';


class ListDetail extends Component {
  constructor() {
    super();

    this.state = {
      list: null
    };
  }

  componentDidMount() {
    axios.get(`/api/lists/${this.props.params.id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          list: resp.data
        })
      })
      .catch(err => console.log(err));
  }

  handleDeleteItemList(id) {
    axios.delete(`/api/items/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        // if (this.state.list.items!) {
        //
        // }
        const items = this.state.list.items.filter(item => {
          return item._id !== id;
        });

        this.setState(prev => {
          return {
            ...prev,
            items: items
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleAddItem(attributes) {
    const newAttributes = { ...attributes, list: this.state.list._id };

    axios.post('/api/items', newAttributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            list: {
              ...this.state.list,
              items: [...prev.list.items, resp.data]
            }
          };
        });
      })
      .catch(err => console.log(err));
  }

  renderDetails() {
    return (
      <div>
          <Link to={`/listindex`}>Return to your lists</Link>
          <h2>Name: {this.state.list.title}</h2>
          <br></br>
          <ItemNewForm
              listId={this.state.list._id}
              onAddItem={this.handleAddItem.bind(this)}
          />
          <hr></hr>
          <ItemList
              items={this.state.list.items}
              onDeleteItemList={this.handleDeleteItemList.bind(this)}
          />
      </div>
    );
  }

  render() {
    if (!this.state.list) {
      return <h2>Loading the list detail...</h2>
    }
    return this.renderDetails();
  }
}

export default ListDetail;
