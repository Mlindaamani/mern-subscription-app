import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";

export const AppLayout = () => {
  return (
    <div className="container bg-white vh-100">
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
