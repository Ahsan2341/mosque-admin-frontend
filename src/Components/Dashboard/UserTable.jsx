import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  MenuItem,
  Select,
  Avatar,
  Box,
  Pagination,
  PaginationItem,
} from "@mui/material";
import UsersAPI from "../../api/users";
import { useState } from "react";

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={params.row.avatar || ""}
          alt={params.value}
          sx={{ width: 32, height: 32 }}
        />
        <span>{params.value}</span>
      </Box>
    ),
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Account Status",
    flex: 1,
    renderCell: (params) => (
      <span
        style={{
          color: params.value === "Active" ? "#21ABA5" : "#E53935",
          fontWeight: 500,
        }}
      >
        {params.value}
      </span>
    ),
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "changeStatus",
    headerName: "",
    flex: 1,
    renderCell: () => (
      <Select
        value="Change Status"
        variant="standard"
        disableUnderline
        sx={{ fontWeight: 500, fontSize: 14, color: "#757575", minWidth: 120 }}
        IconComponent={() => (
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
            <path
              d="M1 1L8 7L15 1"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      >
        <MenuItem value="Change Status" disabled>
          Change Status
        </MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Blocked">Blocked</MenuItem>
      </Select>
    ),
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
];

const UserTable = ({
  rows,
  page,
  pageSize,
  totalRows,
  onPageChange,
  loading,
  onStatusChange,
}) => {
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  // Map backend _id to id for DataGrid
  const mappedRows = rows.map((user) => ({
    ...user,
    id: user._id,
    status: user.isActive ? "Active" : "Blocked",
  }));

  const pageCount = Math.ceil(totalRows / pageSize);

  const handleChangeStatus = async (user, newStatus) => {
    setStatusLoadingId(user.id);
    try {
      if (newStatus === "Active") {
        await UsersAPI.activateUser(user.id);
      } else if (newStatus === "Blocked") {
        await UsersAPI.deactivateUser(user.id);
      }
      if (onStatusChange) onStatusChange();
    } catch (err) {
      console.log(err);
    }
    setStatusLoadingId(null);
  };

  const columnsWithActions = columns.map((col) =>
    col.field === "changeStatus"
      ? {
          ...col,
          renderCell: (params) => (
            <Select
              value=""
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: "#757575",
                minWidth: 120,
                "& .MuiSelect-icon": {
                  width: 16,
                  height: 8,
                  top: "calc(50% - 4px)",
                },
              }}
              IconComponent={(props) => (
                <svg
                  {...props}
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  fill="none"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    d="M1 1L8 7L15 1"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              onChange={(e) => handleChangeStatus(params.row, e.target.value)}
              disabled={statusLoadingId === params.row.id}
              renderValue={(value) => (value ? value : "Change Status")} // Display "Change Status" when closed
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Blocked">Blocked</MenuItem>
            </Select>
          ),
        }
      : col
  );

  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        borderRadius: 3,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        p: 2,
        mt: 4,
      }}
    >
      <DataGrid
        rows={mappedRows}
        columns={columnsWithActions}
        disableColumnResize={true}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        autoHeight
        disableColumnMenu
        hideFooterSelectedRowCount
        pagination
        page={page - 1}
        loading={loading}
        onPageChange={(params) => onPageChange(params + 1)}
        sx={{
          border: "none",
          fontFamily: "Inter, sans-serif",
        }}
        hideFooter
      />
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                minWidth: 44,
                height: 44,
                borderRadius: 2,
                fontWeight: item.selected ? 700 : 500,
                fontSize: 16,
                border: item.selected
                  ? "2px solid #232323"
                  : "1px solid #E0E0E0",
                color: "#232323",
                background: item.selected
                  ? "#fff"
                  : item.disabled
                  ? "#E5E8EB"
                  : "#fff",
                boxShadow: "none",
                mx: 0.5,
                ...(item.type === "start-ellipsis" ||
                item.type === "end-ellipsis"
                  ? {
                      border: "none",
                      background: "transparent",
                      minWidth: 32,
                      height: 44,
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#232323",
                    }
                  : {}),
                ...(item.type === "previous" || item.type === "next"
                  ? {
                      border: "1px solid #E0E0E0",
                      background: item.disabled ? "#E5E8EB" : "#fff",
                      color: "#B0B0B0",
                      minWidth: 44,
                      height: 44,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: 18,
                    }
                  : {}),
              }}
            />
          )}
          siblingCount={1}
          boundaryCount={2}
          hidePrevButton={false}
          hideNextButton={false}
        />
      </Box>
    </Box>
  );
};

export default UserTable;
