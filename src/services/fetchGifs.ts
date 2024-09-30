import { useCallback } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const LIMIT = 10; // Define your limit here or pass it as a parameter if needed

export const fetchGifs = async (
  search: string,
  pageNumber: number,
  setLoading: Function,
  setGifs: Function,
  setTotalCount: Function
) => {
  if (!search) return;
  setLoading(true);
  const offset = pageNumber * LIMIT;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${LIMIT}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    setGifs(data.data);
    setTotalCount(data.pagination.total_count);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }

  setLoading(false);
};
