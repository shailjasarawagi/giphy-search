import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import GifList from "./components/GifList";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const LIMIT = 10;

const App: React.FC = () => {
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";
  const page = parseInt(queryParams.get("page") || "0", 10);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchGifs = useCallback(async (search: string, pageNumber: number) => {
    if (!search) return;
    setLoading(true);
    const offset = pageNumber * LIMIT;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${LIMIT}&offset=${offset}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchGifs(debouncedSearchTerm, page);
    } else {
      setGifs([]);
    }
  }, [debouncedSearchTerm, page, fetchGifs]);

  const handleSearch = useCallback(
    (term: string) => {
      navigate(`?q=${term}&page=0`);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate(`?q=${debouncedSearchTerm}&page=${newPage}`);
    },
    [navigate, debouncedSearchTerm]
  );

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} searchTerm={searchTerm} />
      {debouncedSearchTerm ? (
        <>
          <GifList gifs={gifs} loading={loading} />
          <Pagination currentPage={page} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="dummy-content">
          <h2>Welcome to Giphy Search</h2>
          <p>Start typing to search for awesome GIFs!</p>
        </div>
      )}
    </div>
  );
};

export default App;
