import React, { useState } from "react";
import MainLayout from "../Common/MainLayout";
import RegisterationRequestsTop from "./RegisterationRequestsTop";
import SearchFilterBox from "../Dashboard/SearchFilterBox";
import PendingRequestCard from "./PendingRequestCard";
import Pagination from "@mui/material/Pagination";
import ApprovedRequestCard from "./ApprovedRequestCard";

const requestsData = [
  {
    id: 1,
    name: "Muhammad Qasim",
    email: "M.qasim123@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 2,
    name: "Muhammad Bilal",
    email: "Bilal.MQ@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 3,
    name: "Andrew",
    email: "Andrew456@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 4,
    name: "A.John",
    email: "John_Tom@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 5,
    name: "Muhammad Qasim",
    email: "M.qasim123@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 6,
    name: "Muhammad Bilal",
    email: "Bilal.MQ@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 7,
    name: "Andrew",
    email: "Andrew456@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
  {
    id: 8,
    name: "A.John",
    email: "John_Tom@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    date: "21st March, 2024",
    time: "2:15 PM",
  },
];

const PAGE_SIZE = 4;

function RegisterationRequests() {
  const [activeTab, setActiveTab] = useState("pending");
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(requestsData.length / PAGE_SIZE);
  const pagedRequests = requestsData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <MainLayout>
      <RegisterationRequestsTop
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <SearchFilterBox filterBy={"date"} />
      {activeTab === "pending" && (
        <div className="all-requests mt-[35px] flex flex-col gap-6">
          {pagedRequests.map((req, idx) => (
            <PendingRequestCard key={idx} {...req} />
          ))}
        </div>
      )}
      {activeTab === "approved" && (
        <div className="all-requests mt-[35px] flex flex-col gap-6">
          {pagedRequests.map((req, idx) => (
            <ApprovedRequestCard key={idx} {...req} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          siblingCount={1}
          boundaryCount={2}
        />
      </div>
    </MainLayout>
  );
}

export default RegisterationRequests;
