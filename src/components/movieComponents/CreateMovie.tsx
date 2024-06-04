"use client";

import { createMovieList } from "@/lib/api";
import React, { useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";

interface CreateMovieListType {
  className?: string;
  onListCreated: () => void;
  createListLoading?: boolean;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(71 85 105)",
    color: "rgb(255 255 255)",
    fontSize: 11,
  },
}));

const CreateMovieList = ({
  className,
  onListCreated,
  createListLoading,
}: CreateMovieListType) => {
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
      <div className="mb-4 flex items-center w-full">
        <LightTooltip
          title="When checked, your list will be public. Anyone with the link can view it. If unchecked, your list will be private and visible only to you."
          arrow
          placement="right-start"
        >
          <div>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            <label>Public</label>
          </div>
        </LightTooltip>
      </div>
      {loading || createListLoading ? (
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
