import React from "react";

export const SearchComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="container mt-5 rounded-3 p-3">
      <div className="container">
        <input
          value={searchTerm}
          type="text"
          className="p-3 bg-light-subtle border-none rounded-4 border-danger outline-none"
          placeholder="Search your favorate videos..."
          onChange={(e) => setSearchTerm()}
        />
      </div>
    </div>
  );
};
