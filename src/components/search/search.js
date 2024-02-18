import React, { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import arrow from '../../assets/imgs/down-arrow.png';

function TableSearch({ onSearch }) {
  const {
    searchWord,
    setSearchWord,
    category,
    setCategory,
    status,
    setStatus,
  } = useContext(SearchContext);

  const handleSearch = () => {
    onSearch(searchWord, category, status);
  };

  return (
    <div className="search-container">
      <div className="search-group">
        <p>What are you looking for?</p>
        <input
          className="search"
          type="text"
          placeholder="search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className="category-container">
        <div className="category-select">
          <p>category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Customer">Customer</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="status-select">
          <p>Status</p>
          <div className="btn-status">
            <select
            value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
            </select>
            <button className="arrow"><img src={arrow} alt="arrow" /></button>
            <button className="btn" onClick={handleSearch}>SEARCH</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSearch;
