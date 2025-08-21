import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";
// import ReactQuill from "react-quill";
// import ReactQuill from "react-quill-new"; // Change this line
// import "react-quill-new/dist/quill.snow.css"; // Update the CSS import
import dayjs from "dayjs";
import BlogAPI from "../../api/blog";
import { toast } from "react-toastify";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

function BlogDetails({ id }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await BlogAPI.getBlog(id);
        setBlog(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return <Typography>Blog not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 900, width: "100%", overflow: "hidden" }}>
        {/* Cover Image with overlayed title/meta */}
        {blog?.blogCoverUrl && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 288, md: 384 },
            }}
          >
            <CardMedia
              component="img"
              image={blog.blogCoverUrl}
              alt="Cover"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                  mb: 1,
                }}
              >
                {blog?.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "grey.200",
                  fontWeight: "medium",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                  mb: 1,
                }}
              >
                {blog?.metaTitle}
              </Typography>
            </Box>
          </Box>
        )}
        {/* Main Content */}
        <CardContent sx={{ p: { xs: 3, md: 4 }, bgcolor: "white" }}>
          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "grey.700", mb: 1 }}
            >
              Description
            </Typography>
            <Typography sx={{ color: "grey.600", lineHeight: 1.6 }}>
              {blog?.description}
            </Typography>
          </Box>

          {/* Blog Content */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "grey.700", mb: 1 }}
            >
              Content
            </Typography>
            <Box sx={{ maxWidth: "100%" }}>
              <SimpleEditor content={blog?.content} />
              {/* <ReactQuill
                value={blog?.content}
                readOnly={true}
                modules={{ toolbar: false }}
                style={{
                  border: "none",
                  background: "transparent",
                  height: "60vh",
                  overflowY: "auto",
                }}
                theme="snow"
              /> */}
            </Box>
          </Box>

          {/* Thumbnail and Details */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "grey.700", mb: 1 }}
              >
                Thumbnail
              </Typography>
              <Box
                component="img"
                src={blog?.blogThumbnailUrl}
                alt="Thumbnail"
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                  boxShadow: 1,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: "medium", color: "grey.700" }}>
                  Parma Link:
                </Typography>
                <Typography
                  sx={{ color: "primary.main", wordBreak: "break-all" }}
                >
                  {blog?.paraLink}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: "medium", color: "grey.700" }}>
                  Popular Blog:
                </Typography>
                <Chip
                  label={blog?.isPopular ? "Yes" : "No"}
                  color={blog?.isPopular ? "success" : "error"}
                  sx={{ px: 1, py: 0.5 }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: "medium", color: "grey.700" }}>
                  Status:
                </Typography>
                <Chip
                  label={blog?.blogStatus === "ACTIVE" ? "Published" : "Draft"}
                  color={blog?.blogStatus === "ACTIVE" ? "success" : "warning"}
                  sx={{ px: 1, py: 0.5 }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: "medium", color: "grey.700" }}>
                  Submitted on:
                </Typography>
                <Typography sx={{ color: "grey.500" }}>
                  {dayjs(blog?.createdAt)?.format("MMMM DD, YYYY, h:mm A")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BlogDetails;
