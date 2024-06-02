import React from "react";

const MovieListCard = ({
  listTitle,
  isPublic,
}: {
  listTitle: string;
  isPublic: string;
}) => {
  return (
    <a
      href="#"
      className="mt-2 block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {listTitle}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{isPublic}</p>
    </a>
  );
};

export default MovieListCard;
