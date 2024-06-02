import React from "react";

interface MovieCardProps {
  poster: string;
  title: string;
  year: string;
  director: string;
  plot: string;
}

const MovieCard = ({ poster, title, year, director, plot }: MovieCardProps) => {
  return (
    <div className="m-4 mb-8 w-64 px-4">
      <div className="rounded-lg bg-white shadow-lg">
        <img src={poster} alt={title} className="w-full rounded-t-lg" />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">{title}</h2>
          <p className="mb-2 text-sm text-gray-700">Release year: {year}</p>
          <p className="mb-4 text-sm text-gray-700">Director: {director}</p>
          <a
            href="#"
            className="block rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white hover:bg-blue-600"
          >
            Add Movie
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
