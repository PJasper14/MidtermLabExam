import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleChange = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.props.onSearch(searchTerm);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;