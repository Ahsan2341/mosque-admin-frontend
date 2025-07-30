import React from "react";
import activetTabLine from "../../assets/icons/activeTabLine.png";
function RegisterationRequestsTop({ activeTab, setActiveTab }) {
  return (
    <div className="main-container border-b border-[#232035] w-full flex justify-around relative mb-[35px]">
      <div
        className="flex flex-col items-center cursor-pointer relative flex-1"
        onClick={() => setActiveTab("pending")}
      >
        <p
          className={`mb-[10px] ${
            activeTab === "pending"
              ? "text-[#000000]"
              : "text-[rgba(0,0,0,0.5)]"
          }`}
        >
          Pending Approvals
        </p>
        {activeTab === "pending" && (
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
        onClick={() => setActiveTab("done")}
      >
        <p
          className={`mb-[10px] ${
            activeTab === "done" ? "text-[#000000]" : "text-[rgba(0,0,0,0.5)]"
          }`}
        >
          Approval History
        </p>
        {activeTab === "done" && (
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

export default RegisterationRequestsTop;
