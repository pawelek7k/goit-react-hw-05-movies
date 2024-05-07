import { useEffect, useState } from "react";
import { ListContent } from "../ListContent/ListContent";
import { SectionText } from "../SectionText/Sectiontext";

export const ApiSection = () => {
  const API_KEY = "b66d75e8f7862c194f0cbd7322865cc6";
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setTrendingMovies(data.results);
        } else {
          console.error("Failed to fetch trending movies");
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);
  return (
    <>
      <SectionText text="Trending today" />
      <ListContent movies={trendingMovies} />
    </>
  );
};
