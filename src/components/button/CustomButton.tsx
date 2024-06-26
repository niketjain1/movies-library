import React from "react";

const CustomButton = ({
  title,
  customClassName,
  isDisabled,
}: {
  title: string;
  customClassName?: string;
  isDisabled?: boolean;
}) => {
  return (
    <button
      disabled={isDisabled ?? false}
      className={`${customClassName} px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
