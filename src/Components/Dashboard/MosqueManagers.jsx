import React, { useEffect, useState } from "react";
import SearchFilterBox from "./SearchFilterBox";
import UserTable from "./UserTable";
import UsersAPI from "../../api/users";

function MosqueManagers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filteredusers, setFilteredusers] = useState([]);
  const [userStatus, setUserStatus] = useState("all");
  const fetchUsers = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await UsersAPI.getUsers(
        `page=${pageNum}&limit=${pageSize}&isManagerEnabled=true`
      );
      const { data, totalItems, totalPages, currentPage } = res.data;
      setUsers(data);
      if (userStatus !== "all") {
        if (userStatus === "active") {
          setFilteredusers(users.filter((user) => user.isActive === true));
        } else if (userStatus === "inactive") {
          setFilteredusers(users.filter((user) => user.isActive === false));
        }
      } else {
        setFilteredusers(data);
      }

      setTotalItems(totalItems);
      setTotalPages(totalPages);
      setPage(currentPage);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
    // eslint-disable-next-line
  }, [page, pageSize]);
  const [name, setName] = useState("");
  useEffect(() => {
    if (name == "") {
      setFilteredusers(users);
    } else {
      setFilteredusers(
        users.filter((user) =>
          user.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    }
  }, [name]);
  useEffect(() => {
    if (userStatus === "active") {
      setFilteredusers(users.filter((user) => user.isActive === true));
    } else if (userStatus === "inactive") {
      setFilteredusers(users.filter((user) => user.isActive === false));
    } else {
      setFilteredusers(users);
    }
  }, [userStatus]);
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
          Mosque Managers
        </p>
      </div>
      <SearchFilterBox
        name={name}
        setName={setName}
        setUserStatus={setUserStatus}
      />
      <UserTable
        rows={filteredusers}
        page={page}
        pageSize={pageSize}
        totalRows={totalItems}
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
        onStatusChange={() => fetchUsers(page)}
      />
    </div>
  );
}

export default MosqueManagers;
