"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/card/MovieCard";
import { fetchListDetails } from "@/lib/api";
import { MovieResult } from "@/components/movieComponents/SearchMovie";

const ListDetail = ({ params }: { params: { listId: string } }) => {
  const { listId } = params;
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [listTitle, setListTitle] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (listId) {
      fetchListDetailsData();
    }
  }, [listId]);

  const fetchListDetailsData = async () => {
    try {
      const list = await fetchListDetails(parseInt(listId));
      setMovies(list.movies);
      setListTitle(list.name);
      setIsPublic(list.isPublic);
    } catch (error) {
      console.error("Failed to fetch list details:", error);
    }
  };

  const isUserLoggedIn = () => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    return !!token;
  };

  if (!isPublic && isClient && !isUserLoggedIn()) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <p className="text-2xl font-bold text-white">This list is private.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="p-2 mt-16 text-3xl font-bold text-center">{listTitle}</h1>
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard
              title={movie.title}
              director={movie.director}
              plot={movie.plot}
              poster={movie.poster}
              year={movie.year}
              imdbId={movie.imdbID}
              rating={movie.imdbRating}
              disableAddToList={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
