import React, { useState, useRef } from "react";
import searchIcon from "../../assets/svg/searchIcon.svg";
import filtIcon from "../../assets/svg/filterIcon.svg";
import filterByDateIcon from "../../assets/svg/filter-by-date.svg";
import filterArrows from "../../assets/icons/filter-arrows.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { addDays } from "date-fns";
function SearchFilterBox({
  filterBy = null,
  setDate,
  name,
  setName,
  setUserStatus,
  setPage,
  isMosque = false,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calenderDate, setCalenderDate] = useState(null);
  const filterBoxRef = useRef(null);
  const handleDateChange = (e) => {
    const newDate = addDays(e, 1);
    setSelectedDate(newDate);
    setCalenderDate(e);
    const isoDate = newDate ? newDate.toISOString() : null; // use in prod
    // const isoDate = e ? e.toISOString() : null; use in dev
    setDate(isoDate);
  };

  return (
    <div className="flex flex-row justify-between items-center mt-8 w-full ">
      {/* Search Box */}
      <div className="flex items-center border border-[#BDBDBD] rounded-[16px] pl-[21px] py-[20px] w-[471px] h-[42px] bg-white">
        <img src={searchIcon} alt="search" className="mr-3 w-3 h-3 mt-1" />
        <input
          type="text"
          value={name}
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
          placeholder="Search by Name"
          className="outline-none border-none placeholder:text-[14px]  bg-transparent text-[#757575] text-[18px] w-full placeholder:text-[#000000]"
        />
      </div>
      {/* Filter Box */}
      <div className="relative" ref={filterBoxRef}>
        {filterBy === "date" ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex items-center border border-[#BDBDBD] rounded-[16px] px-4 py-2 w-[304px] h-[42px] bg-white justify-between">
              <div className="flex items-center">
                <img
                  src={filtIcon}
                  alt="filter"
                  className="mr-3 w-[16px] h-[12px]"
                />
                <span className="text-[#000000] font-normal text-[16px]">
                  {selectedDate
                    ? selectedDate.toISOString().split("T")[0]
                    : "Filter by Date"}
                </span>
              </div>

              <DatePicker
                value={calenderDate}
                onChange={handleDateChange}
                className="absolute right-9"
                slots={{
                  openPickerIcon: () => (
                    <img
                      src={filterByDateIcon}
                      alt="calendar"
                      className="w-[24px] h-[24px]"
                    />
                  ),
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    sx: {
                      width: 0,
                      minWidth: 0,
                      padding: 0,
                      margin: 0,
                      "& .MuiInputBase-root": {
                        display: "none",
                      },
                    },
                    inputProps: {
                      style: { display: "none" },
                    },
                  },
                  openPickerButton: {
                    component: IconButton,
                    sx: { p: 0, ml: 1 },
                  },
                  popper: {
                    // Remove placement, use anchorEl instead
                  },
                }}
                PopperProps={{
                  anchorEl: filterBoxRef.current,
                  // You can also set placement here if needed
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ display: "none" }} />
                )}
              />
            </div>
          </LocalizationProvider>
        ) : (
          // Regular Dropdown
          <div
            className="flex items-center border border-[#BDBDBD] rounded-[16px] px-4 py-2 w-[304px] h-[42px] bg-white justify-between cursor-pointer"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <div className="flex items-center">
              <img
                src={filtIcon}
                alt="filter"
                className="mr-3 w-3.5 h-[12.78px]"
              />
              <span className="text-[#000000] font-normal text-[14px]">
                Filter by
              </span>
            </div>
            <div className="flex flex-col ml-2 gap-3">
              <img src={filterArrows} alt="filter arrows" className="w-4 h-5" />
            </div>
          </div>
        )}
        {/* Dropdown - only show when filterBy is not "date" */}
        {filterOpen && filterBy !== "date" && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-[#BDBDBD] rounded-[12px] shadow-lg z-10">
            <div
              onClick={() => {
                setPage(1);
                setUserStatus("all");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              All
            </div>
            <div
              onClick={() => {
                setPage(1);
                setUserStatus("active");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {isMosque ? "APPROVED" : "Active"}
            </div>
            <div
              onClick={() => {
                setPage(1);
                setUserStatus("inactive");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {isMosque ? "PENDING" : "Blocked"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilterBox;
