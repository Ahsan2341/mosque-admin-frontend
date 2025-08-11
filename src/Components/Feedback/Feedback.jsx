import React, { useEffect, useState } from "react";
import MainLayout from "../Common/MainLayout";
import FeedbackAPI from "../../api/feedback/feedback";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { format } from "date-fns";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");

  useEffect(() => {
    FeedbackAPI.getAllFeedbacks().then((response) => {
      setFeedbacks(response.data.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format date to human-readable format
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, hh:mm a");
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Handle opening the modal with the selected comment
  const handleOpenModal = (comment) => {
    setSelectedComment(comment);
    setOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedComment("");
  };

  // Calculate the feedbacks to display based on pagination
  const paginatedFeedbacks = feedbacks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Feedback List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feedback table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comments</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFeedbacks.length > 0 ? (
              paginatedFeedbacks.map((feedback) => (
                <TableRow
                  key={feedback._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell
                    sx={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleOpenModal(feedback.comments)}
                  >
                    {feedback.comments.length > 50
                      ? `${feedback.comments.substring(0, 50)}...`
                      : feedback.comments}
                  </TableCell>
                  <TableCell>{formatDate(feedback.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No feedback available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={feedbacks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="comment-modal-title"
        aria-describedby="comment-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
          className="bg-white"
        >
          <Typography
            id="comment-modal-title"
            variant="h6"
            component="h2"
            className="mb-4"
          >
            Comment
          </Typography>
          <Typography
            id="comment-modal-description"
            sx={{ mt: 2, mb: 4 }}
            className="text-gray-700"
          >
            {selectedComment}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{
              bgcolor: "#21ABA5",
              "&:hover": { bgcolor: "#1c908b" }, // Slightly darker shade for hover
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </MainLayout>
  );
}

export default Feedback;
