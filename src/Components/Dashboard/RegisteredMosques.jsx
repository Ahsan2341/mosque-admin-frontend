import React, { useEffect, useState } from "react";
import SearchFilterBox from "./SearchFilterBox";
import MosqueTable from "./MosqueTable";
import MosquesAPI from "../../api/mosques";

function RegisteredMosques() {
  const [mosques, setMosques] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredMosques, setFilteredMosques] = useState([]);
  const [mosqueStatus, setMosqueStatus] = useState("all");
  const fetchMosques = async (pageNum = 1) => {
    console.log("inisde fetch");
    setLoading(true);
    let status = null;
    if (mosqueStatus !== "all") {
      status = mosqueStatus === "active" ? "APPROVED" : "PENDING";
    }
    try {
      const res = await MosquesAPI.getMosques(
        `page=${pageNum}&limit=${pageSize}${
          status ? `&mosqueStatus=${status}` : ""
        }`
      );
      console.log(res.data);
      const { data, totalItems, totalPages, currentPage } = res.data;
      setMosques(data);

      setFilteredMosques(data);

      setTotalItems(totalItems);
      setTotalPages(totalPages);
      setPage(currentPage || 1);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMosques(page);
    // eslint-disable-next-line
  }, [page, pageSize, mosqueStatus]);

  const [name, setName] = useState("");
  useEffect(() => {
    if (name == "") {
      setFilteredMosques(mosques);
    } else {
      setFilteredMosques(
        mosques.filter((mosque) =>
          mosque.mosqueName.toLowerCase().includes(name.toLowerCase())
        )
      );
    }
  }, [name]);

  return (
    <div>
      <div className="total-users gap-[20.15px] w-[244px] pt-[25.89px] pb-[22.53px] pl-[21px] flex flex-col justify-between shadow-[0px_4.01px_7.01px_0px_rgba(0,0,0,0.15)] rounded-[8.79px]">
        <div className="flex flex-col gap-[7.4px]">
          <p className="font-inter text-[#989898] font-normal text-[16.96px]">
            Total
          </p>
          <p className="font-inter text-[#21ABA5] font-medium text-[20px]">
            {totalItems}
          </p>
        </div>
        <p className="text-[#000000] font-inter text-[18px] font-medium">
          Registered Mosques
        </p>
      </div>
      <SearchFilterBox
        name={name}
        setPage={setPage}
        setName={setName}
        setUserStatus={setMosqueStatus}
        isMosque={true}
      />
      <MosqueTable
        rows={filteredMosques}
        page={page}
        pageSize={pageSize}
        totalRows={totalItems}
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
      />
    </div>
  );
}

export default RegisteredMosques;
