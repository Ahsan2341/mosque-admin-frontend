import React, { useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
import RegisterationRequestsTop from "./RegisterationRequestsTop";
import SearchFilterBox from "../Dashboard/SearchFilterBox";
import PendingRequestCard from "./PendingRequestCard";
import Pagination from "@mui/material/Pagination";
import ApprovedRequestCard from "./ApprovedRequestCard";
import MosquesAPI from "../../api/mosques";

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

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [fetchMosques, setFetchMosques] = useState(false);
  const [pendingMosques, setPendingMosques] = useState([]);
  const [approvedRejecctedMosques, setApprovedRejecctedMosques] = useState([]);
  const [approvedRejecctedMosquesDate, setApprovedRejecctedMosquesDate] =
    useState(null);
  const [pendingMosquesDate, setPendingMosquesDate] = useState(null);
  const fetchPendingMosques = () => {
    MosquesAPI.getPendingMosques(`page=${page}&limit=5`).then((response) => {
      console.log(response.data);
      setPendingMosques(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    });
  };
  const fetchApprovedRejectedMosques = () => {
    if (approvedRejecctedMosquesDate) {
      console.log("inside if");
      const date = new Date(approvedRejecctedMosquesDate);
      const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(
        date.setUTCHours(23, 59, 59, 999)
      ).toISOString();
      MosquesAPI.approvalHistory(
        `page=${page}&limit=5${
          approvedRejecctedMosquesDate ? `&createdAt=${date}` : ""
        }`
      ).then((response) => {
        console.log(response.data);
        setApprovedRejecctedMosques(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      });
    } else {
      MosquesAPI.approvalHistory(`page=${page}&limit=5`).then((response) => {
        console.log(response.data);
        setApprovedRejecctedMosques(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      });
    }
  };
  useEffect(() => {
    if (activeTab === "pending") {
      fetchPendingMosques();
    }
  }, [activeTab, page, fetchMosques]);
  useEffect(() => {
    if (activeTab === "done") {
      fetchApprovedRejectedMosques();
    }
  }, [activeTab, page, approvedRejecctedMosquesDate]);
  return (
    <MainLayout>
      <RegisterationRequestsTop
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "done" ? (
        <SearchFilterBox
          filterBy={"date"}
          setDate={setApprovedRejecctedMosquesDate}
        />
      ) : (
        <SearchFilterBox filterBy={"date"} setDate={setPendingMosquesDate} />
      )}

      {activeTab === "pending" && (
        <div className="all-requests mt-[35px] flex flex-col gap-6">
          {pendingMosques?.map((req, idx) => (
            <PendingRequestCard
              setFetchMosques={setFetchMosques}
              key={idx}
              data={req}
            />
          ))}
        </div>
      )}
      {activeTab === "done" && (
        <div className="all-requests mt-[35px] flex flex-col gap-6">
          {approvedRejecctedMosques?.map((req, idx) => (
            <ApprovedRequestCard key={idx} data={req} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Pagination
          count={totalPages}
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
