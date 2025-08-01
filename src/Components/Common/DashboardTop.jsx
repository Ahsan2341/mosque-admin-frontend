import React from "react";
import activetTabLine from "../../assets/icons/activeTabLine.png";
function DashboardTop({ activeTab, setActiveTab }) {
  return (
    <div className="main-container border-b border-[#232035] w-full flex justify-around relative mb-[35px] mt-[30px]">
      <div
        className="flex flex-col items-center cursor-pointer relative flex-1"
        onClick={() => {
          localStorage.setItem("activeTab", "communityUsers");
          setActiveTab("communityUsers");
        }}
      >
        <p
          className={`mb-[10px] ${
            activeTab === "communityUsers"
              ? "text-[#000000]"
              : "text-[rgba(0,0,0,0.5)]"
          }`}
        >
          Community Users
        </p>
        {activeTab === "communityUsers" && (
          <img
            src={activetTabLine}
            alt="active tab line"
            className="absolute left-1/2 -translate-x-1/2 bottom-0  w-[169px] h-[3px] rounded-tl-[10px] rounded-tr-[10px] m-0 p-0"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
      <div
        className="flex flex-col items-center cursor-pointer relative flex-1"
        onClick={() => {
          localStorage.setItem("activeTab", "mosqueManagers");
          setActiveTab("mosqueManagers");
        }}
      >
        <p
          className={`mb-[10px] ${
            activeTab === "mosqueManagers"
              ? "text-[#000000]"
              : "text-[rgba(0,0,0,0.5)]"
          }`}
        >
          Mosque Managers
        </p>
        {activeTab === "mosqueManagers" && (
          <img
            src={activetTabLine}
            alt="active tab line"
            className="absolute left-1/2 -translate-x-1/2 bottom-0  w-[169px] h-[3px] rounded-tl-[10px] rounded-tr-[10px] m-0 p-0"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
      <div
        className="flex flex-col items-center cursor-pointer relative flex-1"
        onClick={() => {
          setActiveTab("registeredMosques");
          localStorage.setItem("activeTab", "registeredMosques");
        }}
      >
        <p
          className={`mb-[10px] ${
            activeTab === "registeredMosques"
              ? "text-[#000000]"
              : "text-[rgba(0,0,0,0.5)]"
          }`}
        >
          Registered Mosques
        </p>
        {activeTab === "registeredMosques" && (
          <img
            src={activetTabLine}
            alt="active tab line"
            className="absolute left-1/2 -translate-x-1/2 bottom-0  w-[169px] h-[3px] rounded-tl-[10px] rounded-tr-[10px] m-0 p-0"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardTop;
