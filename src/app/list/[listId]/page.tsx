"use client";

import { useEffect, useState } from "react";
import MovieCard, { MovieCardProps } from "@/components/card/MovieCard";
import { fetchListDetails } from "@/lib/api";
import { MovieResult } from "@/components/movieComponents/SearchMovie";
import { useRouter, useSearchParams } from "next/navigation";

const ListDetail = ({ params }: { params: { listId: string } }) => {
  const { listId } = params;
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    if (listId) {
      fetchListDetailsData();
    }
  }, [listId]);

  const fetchListDetailsData = async () => {
    try {
      const list = await fetchListDetails(parseInt(listId));
      setMovies(list.movies);
      setListTitle(list.name);
    } catch (error) {
      console.error("Failed to fetch list details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{listTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            title={movie.title}
            director={movie.director}
            plot={movie.plot}
            poster={movie.poster}
            year={movie.year}
            imdbId={movie.imdbID}
          />
        ))}
      </div>
    </div>
  );
};

export default ListDetail;
