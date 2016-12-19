import React, { Component } from 'react';
import axios from 'axios';

class Secret extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };
  }


  componentDidMount() {
    axios.get('/api/secret', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then(resp => {
        this.setState({
          ...this.state,
          message: resp.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Current user information</h1>
        <br></br>
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default Secret;
