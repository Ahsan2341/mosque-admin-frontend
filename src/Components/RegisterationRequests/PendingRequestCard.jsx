import React, { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import DeclineRequestPopup from "../Common/DeclineRequestPopup";
import ApproveRequestPopup from "../Common/ApproveRequestPopup";
import { format, parseISO } from "date-fns";
function PendingRequestCard({ setFetchMosques, data }) {
  const getOrdinalSuffix = (day) => {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return `${day}st`;
    if (j === 2 && k !== 12) return `${day}nd`;
    if (j === 3 && k !== 13) return `${day}rd`;
    return `${day}th`;
  };

  // Function to format the date and time
  const formatDateTime = (isoDate) => {
    let date = parseISO(isoDate); // Parse ISO date string
    let day = format(date, "d"); // Get day without leading zero

    const formattedDate = format(date, "MMMM, yyyy");
    const ordinalDate = `${getOrdinalSuffix(day)} ${formattedDate}`; // e.g., "28th August, 2024"
    const time = format(date, "h:mm a"); // e.g., "2:15 PM"
    return { ordinalDate, time };
  };
  const [popupId, setPopupId] = useState("");
  return (
    <div className="flex items-center justify-between bg-[#EAEAEA] rounded-2xl px-8 pt-[23px] pb-[29px] w-full">
      <DeclineRequestPopup
        setPopupId={setPopupId}
        popupId={popupId}
        id={data._id}
        setFetchMosques={setFetchMosques}
      />
      <ApproveRequestPopup
        setPopupId={setPopupId}
        popupId={popupId}
        id={data._id}
        setFetchMosques={setFetchMosques}
      />
      {/* Left: Avatar and Info */}
      <div className="flex items-start gap-5">
        <img
          src={"https://avatar.iran.liara.run/public"}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="text-[18px] font-semibold font-inter">
            {data?.author ? data.author.name : "---"}
            <span className="font-normal">
              &nbsp; sent a Mosque Registration Request.
            </span>
            <Link
              to={`/dashboard/mosque/${data._id}`}
              className="ml-2 text-[#21ABA5] underline underline-offset-2 font-normal"
            >
              View Mosque.
            </Link>
          </div>
          <div className="text-[#000000] text-[16px] font-inter mt-1">
            {data?.author ? data.author.email : "---"}&nbsp;
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center text-[#232323] text-[15px] font-inter">
              <CalendarMonthIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {formatDateTime(data.createdAt).ordinalDate}
            </div>
            <div className="flex items-center text-[#232323] text-[15px] font-inter">
              <AccessTimeIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {formatDateTime(data.createdAt).time}
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
