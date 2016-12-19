import React, { Component } from 'react';
import axios from 'axios';
import Lists from './Lists';
import ListNewForm from './ListNewForm';


class MyLists extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      lists: [],
    }
  }

  componentDidMount() {
    axios.get('/api/lists', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          lists: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onAddList({
      title: this.state.title
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(prev => ({
      ...prev,
      [name]: value
    }));
  }

  handleAddList(attributes) {
    axios.post('/api/lists', attributes, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            lists: [...prev.lists, resp.data]
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleDeleteList(id) {
    axios.delete(`/api/lists/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        const lists = this.state.lists.filter(list => {
          return list._id !== id;
        });

          this.setState(prev => {
            return {
              ...prev,
              lists: lists
            };
          });
        })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>

          <ListNewForm onAddList={this.handleAddList.bind(this)}/>
          <hr></hr>

          <h3>My Lists</h3>
          <Lists
            lists={this.state.lists}
            onDeleteList={this.handleDeleteList.bind(this)}
          />
      </div>

    );
  }
}

export default MyLists;
