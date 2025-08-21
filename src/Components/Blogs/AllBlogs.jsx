import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import BlogAPI from "../../api/blog";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";
import BlogDetails from "./BlogDetails";
import { useSelector } from "react-redux";
import MainLayout from "../Common/MainLayout";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [createBlogKey, setCreateBlogKey] = useState(0);
  const permissions = useSelector((state) => state.auth.permissions);
  const hasCreatePermission = permissions?.create_blog;
  const hasUpdatePermission = permissions?.update_blog;
  const hasDeletePermission = permissions?.delete_blog;
  const admin = useSelector(
    (state) => state.auth?.currentUser.role === "admin"
  );

  const fetchBlogs = async () => {
    setFetchLoading(true);
    try {
      let response;
      if (hasDeletePermission || hasUpdatePermission || admin) {
        response = await BlogAPI.allBlogs(page, limit);
      } else {
        response = await BlogAPI.getPublishedBlogs(page, limit);
      }
      setBlogs(response?.data?.data?.blogs || []);
      setTotalPages(response?.data?.data?.totalPages);
    } catch (error) {
      toast.error("Failed to fetch blogs. Please try again.");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, limit]);

  const handleOpenModal = (type, id = null) => {
    setModalType(type);
    setCurrentBlogId(id);
    if (type === "create" || type === "edit") {
      setCreateBlogKey((prevKey) => prevKey + 1);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = (force = false) => {
    if ((modalType === "create" || modalType === "edit") && !force) {
      return;
    }
    setIsModalOpen(false);
    setCurrentBlogId(null);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteBlogId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteBlogId(null);
  };

  const handleDeleteBlog = async () => {
    setDeleteLoading(true);
    try {
      await BlogAPI.deleteBlog(deleteBlogId);
      setBlogs(blogs.filter((blog) => blog._id !== deleteBlogId));
      setDeleteModalOpen(false);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Failed to delete blog. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      id: "_id",
      label: "No",
      align: "center",
      render: (_serialNumber, _blog, index) => <span>{index + 1}</span>,
    },
    {
      id: "title",
      label: "Title",
      render: (text) => <span>{text.slice(0, 15)}</span>,
    },
    {
      id: "metaTitle",
      label: "Meta Title",
      render: (text) => <span>{text.slice(0, 15)}</span>,
    },
    {
      id: "blogThumbnailUrl",
      label: "Thumbnail",
      render: (url) => (
        <img
          src={url}
          alt="Thumbnail"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      id: "description",
      label: "Description",
      render: (text) => <span>{text.slice(0, 20)}</span>,
    },
    {
      id: "paraLink",
      label: "ParaLink",
      render: (link) => <span>{link.slice(0, 20)}</span>,
    },
    {
      id: "blogStatus",
      label: "Status",
      render: (status) => {
        const displayStatus =
          status === "ACTIVE"
            ? "PUBLISHED"
            : status === "INACTIVE"
            ? "DRAFT"
            : status;
        return (
          <Typography
            color={
              displayStatus === "PUBLISHED" ? "success.main" : "warning.main"
            }
          >
            {displayStatus}
          </Typography>
        );
      },
    },
    {
      id: "actions",
      label: "Actions",
      render: (_, record) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => handleOpenModal("view", record._id)}>
            <Visibility />
          </IconButton>
          {
            <IconButton onClick={() => handleOpenModal("edit", record._id)}>
              <Edit />
            </IconButton>
          }
          {
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteModal(record._id)}
            >
              <Delete />
            </IconButton>
          }
        </Box>
      ),
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            All Blogs
          </Typography>
          {
            <Button
              variant="contained"
              style={{ backgroundColor: "#21ABA5", color: "white" }}
              onClick={() => handleOpenModal("create")}
              sx={{ px: 4 }}
            >
              + Add New Blog
            </Button>
          }
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            "& .MuiTableCell-root": {
              padding: "4px 8px", // Reduced padding
              fontSize: "0.875rem", // Smaller font size (14px by default)
            },
            "& .MuiTableHead-root": {
              "& .MuiTableCell-root": {
                fontWeight: "bold", // Keep bold headers
                backgroundColor: "#f5f5f5", // Optional: light background for headers
              },
            },
            "& .MuiTableBody-root": {
              "& .MuiTableCell-root": {
                verticalAlign: "middle", // Center content vertically
              },
            },
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog, index) => (
                  <TableRow key={blog._id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.render
                          ? column.render(blog[column.id], blog, index)
                          : blog[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Items per page:</Typography>
            <Select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              size="small"
              sx={{ width: 120 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Typography>{`Page ${page} of ${totalPages}`}</Typography>
            <Button
              variant="outlined"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </Box>
        </Box>
        <Dialog
          open={isModalOpen}
          onClose={() => handleCloseModal()}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {modalType === "create"
              ? "Create Blog"
              : modalType === "edit"
              ? "Update Blog"
              : "Blog Details"}
          </DialogTitle>
          <DialogContent>
            {modalType === "create" && (
              <CreateBlog
                key={createBlogKey}
                fetchBlogs={fetchBlogs}
                handleCloseModal={handleCloseModal}
              />
            )}
            {modalType === "edit" && (
              <UpdateBlog
                fetchBlogs={fetchBlogs}
                key={createBlogKey}
                id={currentBlogId}
                handleCloseModal={handleCloseModal}
              />
            )}
            {modalType === "view" && <BlogDetails id={currentBlogId} />}
          </DialogContent>
          {modalType === "create" || modalType === "edit" ? null : (
            <DialogActions>
              <Button onClick={() => handleCloseModal(true)}>Close</Button>
            </DialogActions>
          )}
        </Dialog>
        <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography sx={{ py: 2 }}>
              Are you sure you want to delete this blog?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal} sx={{ px: 4 }}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#21ABA5", color: "white" }}
              onClick={handleDeleteBlog}
              sx={{ px: 4 }}
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} /> : "Yes"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default AllBlogs;
