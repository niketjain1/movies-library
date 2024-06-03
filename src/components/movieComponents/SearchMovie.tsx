"use client";

import { searchMovies } from "@/lib/api";
import React, { useState } from "react";
import MovieCard from "../card/MovieCard";

export type MovieResult = {
  director: string;
  genre: string[];
  id: number;
  imdbID: string;
  imdbRating: string;
  plot: string;
  poster: string;
  title: string;
  year: string;
};

const SearchMovies: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState<MovieResult>();

  const handleSearch = async () => {
    try {
      const data = await searchMovies(query);
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {movie && (
          <MovieCard
            title={movie.title}
            director={movie.director}
            plot={movie.plot}
            poster={movie.poster}
            year={movie.year}
            imdbId={movie.imdbID}
          />
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
