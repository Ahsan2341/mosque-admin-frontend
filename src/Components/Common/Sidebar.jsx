import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Settings from "../../assets/svg/settings.svg";
import Admin from "../../assets/svg/admin.svg";
import RegisterationRequests from "../../assets/svg/registeration-request.svg";
import Faqs from "../../assets/svg/faqs.svg";
import Dashboard from "../../assets/svg/dashboard.svg";
import Profile from "../../assets/svg/profile.svg";
import Qr from "../../assets/svg/qr.svg";
import DownArrow from "../../assets/svg/downArrow.svg";
import RightArrow from "../../assets/svg/rightArrow.svg";
// import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();
  //   const mosqueStatus = useSelector(
  //     (state) => state.auth.currentUser.mosqueStatus
  //   );
  const isRestricted = false;
  //   const isRestricted = mosqueStatus === "null" || mosqueStatus === "PENDING";
  //   const handleLinkClick = (e) => {
  //     if (isRestricted) {
  //       e.preventDefault();
  //     }
  //   };

  const path = [
    { to: "/prayer-timings", label: "Prayer Timings" },
    { to: "/events", label: "Events" },
    { to: "/announcements", label: "Announcements" },
    { to: "/mosque-info", label: "Mosque Info" },
  ];
  const isOpen =
    location.pathname === "/dashboard" ||
    location.pathname === "/prayer-timings" ||
    location.pathname === "/events" ||
    location.pathname === "/announcements" ||
    location.pathname === "/mosque-info";

  return (
    <div className="w-[266px] xl:w-[285px] md:w-[180px] lg:w-[220px] bg-white  border-r border-[#B9B9B9]  pl-[11px] pr-[11px] pt-[69px] sticky top-[0px] h-[calc(100vh-69px)] overflow-y-auto">
      {/* <NavLink
        to={
          mosqueStatus === "null"
            ? "/"
            : mosqueStatus === "PENDING"
            ? "/pending"
            : "/dashboard"
        }
        // onClick={handleLinkClick}
        className={`flex items-center text-[18px] font-inter font-medium p-2 mt-4 rounded-md ${
          isRestricted && " text-[#6F6F6F] opacity-50"
        } ${
          location.pathname === "/dashboard" ? "text-[#21ABA5]" : "text-black"
        }`}
      >
        <Dashboard className="w-[18px] h-[18px]" />
        <div className="mx-3">Dashboard</div>
        {isOpen ? (
          <DownArrow className="w-[18px] h-[18px]" />
        ) : (
          <RightArrow className="w-[18px] h-[18px]" />
        )}
      </NavLink> */}

      <NavLink
        to={"/dashboard"}
        // onClick={handleLinkClick}
        className={`flex items-center  border-[#898989] text-[14px] font-inter font-normal pl-[19px] pt-[18px] pb-[14px] mt-4 rounded-[10px]  ${
          location.pathname.startsWith("/dashboard")
            ? "bg-[#DADADA]"
            : "text-black border-[0.5px]  border-[#898989]"
        }`}
      >
        <img src={Dashboard} className="w-[18px] h-[18px]" alt="Dashboard" />
        <div className="mx-3">Dashboard</div>
      </NavLink>

      <NavLink
        to={"/registeration-requests"}
        // onClick={handleLinkClick}
        className={`flex items-center border-[0.5px] border-[#898989] text-[14px] font-inter font-normal pl-[19px] pt-[18px] pb-[14px] mt-4 rounded-[10px]  ${
          location.pathname.startsWith("/registeration-requests")
            ? "bg-[#DADADA]"
            : "text-black"
        }`}
      >
        <img
          src={RegisterationRequests}
          className="w-[18px] h-[18px]"
          alt="RegisterationRequests"
        />
        <div className="mx-3">Registration Requests</div>
      </NavLink>

      <NavLink
        to={"/settings"}
        // onClick={handleLinkClick}
        className={`flex items-center border-[0.5px]  border-[#898989] text-[14px] font-inter font-normal pl-[19px] pt-[18px] pb-[14px] mt-4 rounded-[10px]  ${
          location.pathname === "/settings" ? "bg-[#DADADA]" : "text-black"
        }`}
      >
        <img src={Settings} className="w-[18px] h-[18px]" alt="Settings" />
        <div className="mx-3">Settings</div>
      </NavLink>

      <NavLink
        to={"/faqs"}
        // onClick={handleLinkClick}
        className={`flex items-center border-[0.5px]  border-[#898989] text-[14px] font-inter font-normal pl-[19px] pt-[18px] pb-[14px] mt-4 rounded-[10px]  ${
          location.pathname === "/faqs" ? "bg-[#DADADA]" : "text-black"
        }`}
      >
        <img src={Faqs} className="w-[18px] h-[18px]" alt="Faqs" />
        <div className="mx-3">FAQs</div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
