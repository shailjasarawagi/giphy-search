import React from "react";

interface GifListProps {
  gifs: any[];
  loading: boolean;
}

const GifList: React.FC<GifListProps> = React.memo(({ gifs, loading }) => {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="gif-display">
      {gifs.map((gif) => (
        // <div key={gif.id} className="gif-item">
        <img src={gif.images.original.url} alt={gif.title} />
        // </div>
      ))}
    </div>
  );
});

export default GifList;
