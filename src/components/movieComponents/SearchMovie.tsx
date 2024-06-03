"use client";

import { searchMovies } from "@/lib/api";
import React, { useState } from "react";
import MovieCard from "../card/MovieCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [movie, setMovie] = useState<MovieResult | null>();

  const handleSearch = async () => {
    try {
      if (query.length === 0) {
        toast.error("Search cannot be empty, please enter a movie name!", {
          position: "bottom-center",
        });
        return;
      }
      const data = await searchMovies(query);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Movie not found!", {
        position: "bottom-center",
      });
    }
  };

  const movieAddedSuccess = () => {
    setMovie(null);
    setQuery("");
    toast.success("Movie added to the list successfully!", {
      position: "bottom-center",
    });
  };

  const clearQuery = () => {
    setMovie(null);
    setQuery("");
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
        <button
          onClick={clearQuery}
          className="bg-red-500 text-white p-2 rounded"
        >
          Clear
        </button>
      </div>
      <div className="mt-4">
        {movie != null && (
          <MovieCard
            title={movie.title}
            director={movie.director}
            plot={movie.plot}
            poster={movie.poster}
            year={movie.year}
            imdbId={movie.imdbID}
            rating={movie.imdbRating}
            onSucces={movieAddedSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
