import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 bg-[#F8F8F8] p-6 overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
