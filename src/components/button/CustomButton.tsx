import React from "react";

const CustomButton = ({
  title,
  customClassName,
}: {
  title: string;
  customClassName?: string;
}) => {
  return (
    <button
      className={`${customClassName} px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
