"use client";

import React, { useState, useEffect } from "react";
import { getMovieLists, addMovieToList } from "@/lib/api";

interface AddMovieToListProps {
  imdbID: string;
  onSuccess: () => void;
}

const AddMovieToList: React.FC<AddMovieToListProps> = ({
  imdbID,
  onSuccess,
}) => {
  const [lists, setLists] = useState<any[]>([]);
  const [selectedListId, setSelectedListId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token") as string;
        const userId = parseInt(localStorage.getItem("userId") as string);
        const data = await getMovieLists(userId, token);
        setLists(data);
      } catch (error) {
        console.error("Error fetching movie lists:", error);
      }
    };

    fetchLists();
  }, []);

  const handleAddMovie = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") as string;
      await addMovieToList(selectedListId, imdbID, token);
      onSuccess();
    } catch (error) {
      console.error("Error adding movie to list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <select
        value={selectedListId}
        onChange={(e) => setSelectedListId(e.target.value)}
        className="border-2 border-gray-400 rounded p-2 hover:cursor-pointer"
      >
        <option value="" disabled className="hover:cursor-pointer">
          Select a list
        </option>
        {lists.map((list) => (
          <option
            key={list.id}
            value={list.id}
            className="hover:cursor-pointer"
          >
            {list.name}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="flex items-center justify-center w-8 h-8 mt-2">
          <div className="loader" />
        </div>
      ) : (
        <button
          onClick={handleAddMovie}
          disabled={selectedListId.length === 0 ? true : false}
          className="bg-blue-500 text-white p-2 rounded ml-2 mt-2"
        >
          Add to List
        </button>
      )}
    </div>
  );
};

export default AddMovieToList;
