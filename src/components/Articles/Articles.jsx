import React from "react";
import { useSearchParams } from "react-router-dom";

const Articles = () => {
  const [searParams, setSearchParams] = useSearchParams();
  const sortBy = searParams.get("sortBy");
  const category = searParams.get("category");

  const handleSortBy = () => {
    setSearchParams({
      sortBy: "views",
      category,
    });
  };
  return (
    <div>
      <h2>
        Articles
        <p>
          SortBy: {sortBy} Category: {category}
        </p>
      </h2>
      <button onClick={handleSortBy}>Sort By Views</button>
    </div>
  );
};

export default Articles;
