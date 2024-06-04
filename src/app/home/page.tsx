"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListCard from "@/components/card/ListCard";
import { toast } from "react-toastify";
import { getMovieLists } from "@/lib/api";
import CreateMovieList from "@/components/movieComponents/CreateMovie";
import SearchMovies from "@/components/movieComponents/SearchMovie";

const Home: React.FC = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }
        setLoading(true);
        const userId = parseInt(localStorage.getItem("userId") as string);
        const data = await getMovieLists(userId, token);
        setLists(data);
      } catch (error) {
        console.error("Error fetching movie lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [router]);

  const handleListCreated = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const userId = parseInt(localStorage.getItem("userId") as string);
      const data = await getMovieLists(userId, token);
      setLists(data);
      toast.success("List added successfully!", {
        position: "top-left",
      });
    } catch (error) {
      console.error("Error fetching movie lists after list creation:", error);
    }
  };

  return (
    <div className="flex h-screen w-full pt-11">
      <div className="w-1/4 bg-gray-100 p-4 mt-6 max-h-screen overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Movie Lists</h1>
        <CreateMovieList onListCreated={handleListCreated} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Your Lists</h2>
          {loading ? (
            <div className="flex mt-36 items-center justify-center">
              <div className="loader" />
            </div>
          ) : (
            <div className="mt-4">
              {lists.length > 0 ? (
                lists.map((list) => (
                  <ListCard
                    key={list.id}
                    listTitle={list.name}
                    isPublic={list.isPublic ? "Public" : "Private"}
                    listId={list.id}
                  />
                ))
              ) : (
                <p className="mt-10 items-center text-red-500">
                  No list found, create a list from the option above.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-3/4 p-4 max-h-screen overflow-auto">
        <h1 className="text-3xl font-bold mb-4 pt-8">Search Movies</h1>
        <SearchMovies />
      </div>
    </div>
  );
};

export default Home;
