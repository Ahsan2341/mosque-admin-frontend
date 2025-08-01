import React, { useState } from "react";
import MainLayout from "./Common/MainLayout";
// import Notifications from "./Common/Notifications";
// import { useSelector } from "react-redux";

// import { getHijriDate } from "./hijriDate";
import { Link, NavLink } from "react-router-dom";
import DashboardTop from "./Common/DashboardTop";
import CommunityUsers from "./Dashboard/CommunityUsers";
import MosqueManagers from "./Dashboard/MosqueManagers";
import RegisteredMosques from "./Dashboard/RegisteredMosques";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "communityUsers"
  );
  //   const currentUser = useSelector((state) => state.auth.currentUser);
  //   const hijriDate = getHijriDate();
  return (
    <MainLayout>
      <div className="w-full  pl-[31px] pr-[51px]">
        <DashboardTop activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "communityUsers" && <CommunityUsers />}
        {activeTab === "mosqueManagers" && <MosqueManagers />}
        {activeTab === "registeredMosques" && <RegisteredMosques />}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
