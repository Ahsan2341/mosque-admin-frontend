import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function ApprovedRequestCard({
  id,
  name,
  email,
  avatar,
  date,
  time,
  mosqueLink = "#",
}) {
  return (
    <div className="flex items-center justify-between bg-[#EAEAEA] rounded-2xl px-8 pt-[23px] pb-[29px] w-full">
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
            <a
              href={`/registeration-requests/mosque/${id}`}
              className="ml-2 text-[#21ABA5] underline underline-offset-2 font-normal"
            >
              View Mosque.
            </a>
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
      <div className="flex flex-col items-end gap-4">
        <p className="font-inter font-normal text-[16px] text-black">
          Request State: <span className="text-[#007D1C]">Approved!</span>
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
