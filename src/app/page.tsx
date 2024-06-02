"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovieLists } from "../lib/api";
import SearchMovies from "../components/movieComponents/SearchMovie";
import CreateMovieList from "../components/movieComponents/CreateMovie";

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

        const data = await getMovieLists(token);
        setLists(data);
      } catch (error) {
        console.error("Error fetching movie lists:", error);
      }
    };

    fetchLists();
  }, [router]);

  return (
    <div className="flex h-screen w-full mt-11 overflow-auto">
      <div className="w-1/4 bg-gray-100 p-4 mt-4">
        <h1 className="text-3xl font-bold mb-4">Movie Lists</h1>
        <CreateMovieList />
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Your Lists</h2>
          <div className="mt-4">
            {lists.map((list) => (
              <div key={list.id} className="border rounded p-4 mb-4">
                <h3 className="text-xl font-bold">{list.name}</h3>
                <p>{list.isPublic ? "Public" : "Private"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4 mt-8">Search Movies</h1>
        <SearchMovies />
      </div>
    </div>
  );
};

export default Home;
