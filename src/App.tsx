import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import useDebounce from "./hooks/useDebounce";
import "./App.css";
import { fetchGifs } from "./services/fetchGifs";

const GifList = lazy(() => import("./components/GifList"));
const Pagination = lazy(() => import("./components/Pagination"));

const App: React.FC = () => {
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";
  const page = parseInt(queryParams.get("page") || "1", 10) - 1;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isNextDisabled = (page + 1) * 10 >= totalCount;
  useEffect(() => {
    fetchGifs(searchTerm, page, setLoading, setGifs, setTotalCount);
  }, [searchTerm, page]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchGifs(debouncedSearchTerm, page, setLoading, setGifs, setTotalCount);
    } else {
      setGifs([]);
    }
  }, [debouncedSearchTerm, page, fetchGifs]);

  const handleSearch = useCallback(
    (term: string) => {
      navigate(`?q=${term}&page=1`);
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
      <Suspense fallback={<div>Loading...</div>}>
        <h2>Welcome to Giphy Search</h2>
        <SearchBox onSearch={handleSearch} searchTerm={searchTerm} />
        {debouncedSearchTerm ? (
          <>
            <GifList gifs={gifs} loading={loading} />
            <Pagination
              currentPage={page}
              onPageChange={handlePageChange}
              isNextDisabled={isNextDisabled}
            />
          </>
        ) : (
          <div className="dummy-content">
            <p>Start typing to search for awesome GIFs!</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default App;
