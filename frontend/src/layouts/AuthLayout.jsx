import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="mt-5">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
