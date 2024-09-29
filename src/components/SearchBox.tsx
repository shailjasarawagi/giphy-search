import React, { useState, useEffect } from "react";

interface SearchBoxProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const SearchBox: React.FC<SearchBoxProps> = React.memo(
  ({ onSearch, searchTerm }) => {
    const [term, setTerm] = useState(searchTerm);

    useEffect(() => {
      setTerm(searchTerm);
    }, [searchTerm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(e.target.value);
      onSearch(e.target.value);
    };

    return (
      <div className="search-box">
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Gifs"
        />
      </div>
    );
  }
);

export default SearchBox;
