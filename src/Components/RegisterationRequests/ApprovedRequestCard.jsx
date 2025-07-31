import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
function ApprovedRequestCard({ data }) {
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
  return (
    <div className="flex items-center justify-between bg-[#EAEAEA] rounded-2xl px-8 pt-[23px] pb-[29px] w-full">
      {/* Left: Avatar and Info */}
      <div className="flex items-start gap-5">
        <img
          src={"https://avatar.iran.liara.run/public"}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="text-[14px] font-semibold font-inter">
            {data?.author ? data.author.name : "---"}
            <span className="font-normal">
              sent a Mosque Registration Request.
            </span>
            <Link
              to={`/dashboard/mosque/${data._id}`}
              className="ml-2 text-[#21ABA5] underline underline-offset-2 font-normal"
            >
              View Mosque.
            </Link>
          </div>
          <div className="text-[#000000] text-[12px] font-inter mt-1">
            {data?.author ? data.author.email : "---"}&nbsp;
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center text-[#232323] text-[13px] font-inter">
              <CalendarMonthIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {formatDateTime(data.updatedAt).ordinalDate}
            </div>
            <div className="flex items-center text-[#232323] text-[13px] font-inter">
              <AccessTimeIcon sx={{ fontSize: 18, marginRight: 0.5 }} />
              {formatDateTime(data.updatedAt).time}
            </div>
          </div>
        </div>
      </div>
      {/* Right: Buttons */}
      <div className="flex flex-col items-end gap-4">
        <p className="font-inter font-normal text-[14px] text-black">
          Request State:
          {data.mosqueStatus === "APPROVED" ? (
            <span className="text-[#007D1C]">Approved!</span>
          ) : (
            <span className="text-red-600">Rejected!</span>
          )}
        </p>
        <p className="font-inter mt-0 font-normal text-[12px] text-[#007D1C] flex items-center gap-[10px]">
          21st March, 2024
          <CalendarMonthIcon
            className="text-black w-[11.2px] h-[12.44px]"
            sx={{ fontSize: 18, marginRight: 0.5 }}
          />
        </p>
        <p className="font-inter -mt-2.5  font-normal text-[12px] text-[#007D1C] flex items-center gap-[10px]">
          2:15 PM{" "}
          <AccessTimeIcon
            className="text-black w-[11.2px] h-[12.44px]"
            sx={{ fontSize: 18, marginRight: 0.5 }}
          />
        </p>
      </div>
    </div>
  );
}

export default ApprovedRequestCard;
