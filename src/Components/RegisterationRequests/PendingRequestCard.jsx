import React, { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import DeclineRequestPopup from "../Common/DeclineRequestPopup";
import ApproveRequestPopup from "../Common/ApproveRequestPopup";

function PendingRequestCard({
  id,
  name,
  email,
  avatar,
  date,
  time,

  mosqueLink = "#",
}) {
  const [popupId, setPopupId] = useState("");
  return (
    <div className="flex items-center justify-between bg-[#EAEAEA] rounded-2xl px-8 pt-[23px] pb-[29px] w-full">
      <DeclineRequestPopup setPopupId={setPopupId} popupId={popupId} />
      <ApproveRequestPopup setPopupId={setPopupId} popupId={popupId} />
      {/* Left: Avatar and Info */}
      <div className="flex items-start gap-5">
        <img
          src={avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="text-[18px] font-semibold font-inter">
            {name}{" "}
            <span className="font-normal">
              sent a Mosque Registration Request.
            </span>
            <Link
              to={`/registeration-requests/declined-mosque/${id}`}
              className="ml-2 text-[#21ABA5] underline underline-offset-2 font-normal"
            >
              View Mosque.
            </Link>
          </div>
          <div className="text-[#000000] text-[16px] font-inter mt-1">
            {email}
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center text-[#232323] text-[15px] font-inter">
              <CalendarMonthIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {date}
            </div>
            <div className="flex items-center text-[#232323] text-[15px] font-inter">
              <AccessTimeIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {time}
            </div>
          </div>
        </div>
      </div>
      {/* Right: Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setPopupId("declineRequest")}
          className="flex gap-[13px] items-center border border-[#BDBDBD] rounded-lg px-6 py-2 text-[#232323] bg-transparent font-inter text-[16px] font-medium hover:bg-[#f5f5f5] transition"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
          Decline
        </button>
        <button
          onClick={() => setPopupId("approveRequest")}
          className="flex items-center gap-[13px] bg-[#21ABA5] rounded-lg px-6 py-2 text-white font-inter text-[16px] font-medium hover:bg-[#17908B] transition"
        >
          <CheckIcon sx={{ fontSize: 20 }} />
          Approve
        </button>
      </div>
    </div>
  );
}

export default PendingRequestCard;
