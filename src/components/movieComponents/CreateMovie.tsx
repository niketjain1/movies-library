"use client";

import { createMovieList } from "@/lib/api";
import React, { useState } from "react";

interface CreateMovieListType {
  className?: string;
  onListCreated: () => void;
}
const CreateMovieList = ({ className, onListCreated }: CreateMovieListType) => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") as string;
      const userId = parseInt(localStorage.getItem("userId") as string);
      setIsLoading(true);
      await createMovieList(name, isPublic, token, userId);
      setName("");
      setIsPublic(false);
      onListCreated();
    } catch (error) {
      console.error("Error creating movie list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} p-2`}>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="List name"
          className="border rounded p-2 w-full border-gray-500"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        <label>Public</label>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader" />
        </div>
      ) : (
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Create List
        </button>
      )}
    </form>
  );
};

export default CreateMovieList;
