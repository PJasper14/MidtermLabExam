import React, { Component } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleChange = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.props.onSearch(searchTerm);
  };

  clearSearch = () => {
    this.setState({ searchTerm: "" });
    this.props.onSearch("");
  };

  render() {
    return (
      <div className="search-bar">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          {this.state.searchTerm && (
            <FaTimes className="clear-icon" onClick={this.clearSearch} />
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
