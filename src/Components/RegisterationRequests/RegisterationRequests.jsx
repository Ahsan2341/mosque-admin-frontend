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
  const [filteredApprovedRequests, setFilteredApprovedRequests] = useState([]);
  const [filteredPendingRequests, setFilteredPendingRequests] = useState([]);
  const [name, setName] = useState("");
  const fetchPendingMosques = () => {
    MosquesAPI.getPendingMosques(`page=${page}&limit=5`).then((response) => {
      console.log(response.data);
      setPendingMosques(response.data.data);
      setFilteredPendingRequests(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    });
  };
  const fetchApprovedRejectedMosques = () => {
    if (approvedRejecctedMosquesDate) {
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
        setFilteredApprovedRequests(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      });
    }
  };
  useEffect(() => {
    if (activeTab === "pending") {
      setPage(1);
      fetchPendingMosques();
    }
  }, [activeTab, page, fetchMosques]);
  useEffect(() => {
    if (activeTab === "done") {
      fetchApprovedRejectedMosques();
    }
  }, [activeTab, page, approvedRejecctedMosquesDate]);
  useEffect(() => {
    if (name !== "") {
      setFilteredApprovedRequests(
        approvedRejecctedMosques.filter((request) =>
          request?.author?.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else {
      setFilteredApprovedRequests(approvedRejecctedMosques);
    }
  }, [name]);
  useEffect(() => {
    if (name !== "") {
      setFilteredPendingRequests(
        pendingMosques.filter((request) => {
          console.log(request);
          return request?.author?.name
            .toLowerCase()
            .includes(name.toLowerCase());
        })
      );
    } else {
      setFilteredPendingRequests(pendingMosques);
    }
  }, [name]);
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
          setName={setName}
        />
      ) : (
        <SearchFilterBox
          filterBy={"date"}
          setDate={setPendingMosquesDate}
          setName={setName}
        />
      )}

      {activeTab === "pending" && (
        <div className="all-requests mt-[35px] flex flex-col gap-6">
          {filteredPendingRequests?.map((req, idx) => (
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
          {filteredApprovedRequests?.map((req, idx) => (
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
