import React, { ReactNode } from "react";

const Authlayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen w-full">
      {children}
    </div>
  );
};

export default Authlayout;
