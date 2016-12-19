import React, { Component } from 'react';

class ListNewForm extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
    }
  }

  handleInputChange(event) {
    const { value, name: attribute } = event.target;

    this.setState(prev => {
      return {
        ...prev,
        [attribute]: value,
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { title } = this.state;
    this.props.onAddList({ title });

    this.setState({
      title: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <input
          type="text"
          name="title"
          placeholder="Enter list Title"
          value={this.state.title}
          onChange={this.handleInputChange.bind(this)}
        />

        <input
          type="submit"
          value="+ Add New List"
          disabled={!this.state.title.trim()}
        />
      </form>
    );
  }
}

ListNewForm.propTypes = {
  title: React.PropTypes.func.isRequired,
  onAddList: React.PropTypes.func.isRequired
};

export default ListNewForm;
