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
  const [selectedList, setSelectedList] = useState("");

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
      const token = localStorage.getItem("token") as string;
      await addMovieToList(selectedList, imdbID, token);
      onSuccess();
    } catch (error) {
      console.error("Error adding movie to list:", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
        className="border-2 border-gray-400 rounded p-2"
      >
        <option value="" disabled>
          Select a list
        </option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddMovie}
        className="bg-blue-500 text-white p-2 rounded ml-2 mt-2"
      >
        Add to List
      </button>
    </div>
  );
};

export default AddMovieToList;
