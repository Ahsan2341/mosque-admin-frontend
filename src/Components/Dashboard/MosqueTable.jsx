import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

const mosqueColumns = [
  {
    field: "name",
    headerName: "Mosque Name",
    flex: 1.5,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={params.row.avatar}
          alt={params.value}
          sx={{ width: 26, height: 26 }}
        />
        <span>{params.row.displayName}</span>
      </Box>
    ),
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "registeredUsers",
    headerName: "Registered Users",
    flex: 1,
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "managers",
    headerName: "Managers",
    flex: 1,
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "details",
    headerName: "",
    flex: 1,
    renderCell: (params) => (
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Link
          to={`/dashboard/mosque/${params.row.id}`}
          style={{
            color: "#21ABA5",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          View/Edit Details
        </Link>
      </Box>
    ),
    sortable: false,
    headerClassName: "super-app-theme--header",
  },
];

const MosqueTable = ({
  rows,
  page = 1,
  pageSize = 10,
  totalRows = 0,
  onPageChange,
  loading,
}) => {
  // Map backend _id to id for DataGrid and calculate registeredUsers and managers
  const mappedRows = rows.map((mosque) => ({
    ...mosque,
    id: mosque._id,
    registeredUsers: mosque.followers ? mosque.followers.length : 0,
    managers: mosque.managers ? mosque.managers.length : 0,
    displayName: mosque.mosqueName ? mosque.mosqueName : "No Name",
  }));

  const pageCount = Math.ceil(totalRows / pageSize);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        borderRadius: 3,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        p: 2,
        mt: 4,
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          background: "#F7F6F9",
          fontWeight: 600,
          fontSize: 16,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        "& .MuiDataGrid-row": {
          fontSize: 14,
          minHeight: 60,
          maxHeight: 60,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #F0F0F0",
        },
        "& .MuiDataGrid-footerContainer": {
          display: "none", // Hide default footer
        },
        "& .MuiDataGrid-virtualScroller": {
          background: "#fff",
        },
      }}
    >
      <DataGrid
        rows={mappedRows}
        columns={mosqueColumns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        autoHeight
        disableColumnMenu
        disableColumnResize={true}
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
      {/* Custom Pagination */}
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

export default MosqueTable;
