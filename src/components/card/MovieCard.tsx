import React from "react";
import AddMovieToList from "../movieComponents/AddMovieToList";

interface MovieCardProps {
  poster: string;
  title: string;
  year: string;
  director: string;
  plot: string;
  imdbId: string;
}

const MovieCard = ({
  poster,
  title,
  year,
  director,
  plot,
  imdbId,
}: MovieCardProps) => {
  return (
    <div className="m-4 mb-8 w-64 px-4">
      <div className="rounded-lg bg-white shadow-lg">
        <img src={poster} alt={title} className="w-full rounded-t-lg" />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">{title}</h2>
          <p className="mb-2 text-sm text-gray-700">Release year: {year}</p>
          <p className="mb-4 text-sm text-gray-700">Director: {director}</p>
          <AddMovieToList imdbID={imdbId} onSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
