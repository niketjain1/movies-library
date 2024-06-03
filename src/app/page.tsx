"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovieLists } from "../lib/api";
import SearchMovies from "../components/movieComponents/SearchMovie";
import CreateMovieList from "../components/movieComponents/CreateMovie";
import MovieListCard from "@/components/card/MovieListCard";

const Home: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        const userId = parseInt(localStorage.getItem("userId") as string);
        const data = await getMovieLists(userId, token);
        setLists(data);
      } catch (error) {
        console.error("Error fetching movie lists:", error);
      }
    };

    fetchLists();
  }, [router]);

  return (
    <div className="flex h-screen w-full pt-11 overflow-auto">
      <div className="w-1/4 bg-gray-100 p-4 mt-4 max-h-screen overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Movie Lists</h1>
        <CreateMovieList />
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Your Lists</h2>
          <div className="mt-4">
            {lists.map((list) => (
              <MovieListCard
                key={list.id}
                listTitle={list.name}
                isPublic={list.isPublic ? "Public" : "Private"}
                listId={list.id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4 pt-8">Search Movies</h1>
        <SearchMovies />
      </div>
    </div>
  );
};

export default Home;
