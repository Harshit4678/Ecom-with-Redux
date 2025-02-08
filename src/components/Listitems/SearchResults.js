import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ListItem from "./ListItem";
import { setSearchResults } from "../../actions/searchActions";
import axios from "axios";
import { debounce } from "lodash";
import Loader from "../../components/Listitems/UI/loader"; // Corrected path to Loader component
import "../../styles/searchResults.scss"; // Import the CSS for styling

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const searchResults = useSelector((state) => state.search.results);
  const [loading, setLoading] = useState(false); // State to manage loading

  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      setLoading(true); // Start loading
      try {
        const categories = [
          "items",
          "items-category-1",
          "items-category-2",
          "items-category-3",
          "items-category-4",
          "items-category-5",
        ];

        const allProducts = [];

        for (const category of categories) {
          const response = await axios.get(
            `https://ecom-1ef8b-default-rtdb.firebaseio.com/${category}.json`
          );
          const data = response.data;

          if (data) {
            if (Array.isArray(data)) {
              allProducts.push(...data);
            } else if (typeof data === "object") {
              allProducts.push(data);
            }
          }
        }

        const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        dispatch(setSearchResults(filteredProducts));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false); // End loading
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

  return (
    <div className="search-results">
      <h2 className="searchResult-heading">Search Results for "{query}"</h2>
      {loading && <Loader />} {/* Show loader while loading */}
      <div className="searchlrist-container">
        <div className="product-list">
          {searchResults.length > 0
            ? searchResults.map((product) => (
                <ListItem key={product.id} data={product} />
              ))
            : !loading && <p>No results found</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
