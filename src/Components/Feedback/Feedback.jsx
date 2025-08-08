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
} from "@mui/material";
import { format } from "date-fns";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
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
                  <TableCell>{feedback.comments}</TableCell>
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
    </MainLayout>
  );
}

export default Feedback;
