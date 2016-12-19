import React, { Component } from 'react';

class ItemNewForm extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
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

    const { text } = this.state;
    this.props.onAddItem({ text });

    this.setState({
      text: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="itemText">Item Text: </label>
        <input
          type="text"
          name="text"
          value={this.state.text}
          onChange={this.handleInputChange.bind(this)}
        />

        <input
          type="submit"
          value=" + Add New Item "
          disabled={!this.state.text.trim()}
        />
      </form>
    );
  }
}

ItemNewForm.propTypes = {
  text : React.PropTypes.func.isRequired,
  onAddItem: React.PropTypes.func.isRequired
};

export default ItemNewForm;
