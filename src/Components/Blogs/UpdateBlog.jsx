import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new"; // Change this line
import "react-quill-new/dist/quill.snow.css"; // Update the CSS import
import BlogAPI from "../../api/blog";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import useImageCompression from "../../hooks/useImageCompression";

function UpdateBlog({ fetchBlogs, handleCloseModal, id }) {
  const [formValues, setFormValues] = useState({
    title: "",
    metaTitle: "",
    description: "",
    paraLink: "",
  });
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [contentCounters, setContentCounters] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rawCoverFile, setRawCoverFile] = useState(null);
  const { compressImage, isCompressing } = useImageCompression();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const response = await BlogAPI.getBlog(id);
        const blogData = response?.data?.data;
        setFormValues({
          title: blogData?.title || "",
          metaTitle: blogData?.metaTitle || "",
          description: blogData?.description || "",
          paraLink: blogData?.paraLink || "",
        });
        setIsPopular(blogData?.isPopular || false);
        setContent(blogData?.content || "");
        setThumbnailPreview(blogData?.blogThumbnailUrl || null);
        if (blogData?.blogCoverUrl) {
          setCoverPreview(blogData.blogCoverUrl);
          setCoverFile(blogData.blogCoverUrl);
        }
      } catch (error) {
        toast.error("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    setContentCounters(content.replace(/<[^>]*>/g, "").length);
  }, [content]);

  const handleUpdateBlog = async () => {
    if (!formValues.paraLink) {
      toast.error("Please enter the Parma Link!");
      return;
    }
    if (formValues.metaTitle.length < 50 || formValues.metaTitle.length > 60) {
      toast.error("Meta Title must be 50–60 characters");
      return;
    }
    if (
      formValues.description.length < 5 ||
      formValues.description.length > 160
    ) {
      toast.error("Meta Description must be 5–160 characters");
      return;
    }
    if (!content) {
      toast.error("Please enter the blog content!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("metaTitle", formValues.metaTitle);
      formData.append("description", formValues.description);
      formData.append("paraLink", formValues.paraLink);
      formData.append("content", content);
      formData.append("isPopular", isPopular);
      if (thumbnailFile) {
        formData.append("blogThumbnail", thumbnailFile);
      }
      if (coverFile) {
        formData.append("blogCover", coverFile);
      }
      await BlogAPI.updateBlog(id, formData);
      toast.success("Blog updated successfully!");
      resetForm();
      handleCloseModal(true);
      fetchBlogs();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      title: "",
      metaTitle: "",
      description: "",
      paraLink: "",
    });
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setCoverFile(null);
    setCoverPreview(null);
    setRawCoverFile(null);
    setIsPopular(false);
    setContent("");
  };

  const handleCloseAttempt = () => {
    const hasChanges =
      formValues.title ||
      formValues.metaTitle ||
      formValues.description ||
      formValues.paraLink ||
      content ||
      thumbnailFile ||
      coverFile;
    if (hasChanges) {
      setShowConfirmModal(true);
    } else {
      handleCloseModal(true);
    }
  };

  const handleConfirmAction = async (action) => {
    setShowConfirmModal(false);
    if (action === "yes") {
      await handleUpdateBlog();
    } else if (action === "no") {
      resetForm();
      handleCloseModal(true);
    }
  };

  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { compressedFile, previewUrl } = await compressImage(file);
      setThumbnailFile(compressedFile);
      setThumbnailPreview(previewUrl);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    if (!coverPreview || !croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(
      coverPreview,
      croppedAreaPixels,
      rawCoverFile?.name
    );
    setCoverFile(croppedImage.file);
    setCoverPreview(croppedImage.url);
    setShowCropModal(false);
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    setRawCoverFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "paraLink" ? value.toLowerCase().replace(/\s+/g, "-") : value,
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <style jsx>{`
        .ql-snow .ql-tooltip {
          left: 9px !important;
        }
      `}</style>
      <Box sx={{ maxHeight: 550, overflowY: "auto", p: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter blog title"
            inputProps={{ maxLength: 100 }}
            helperText={`${formValues.title.length} characters`}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Meta Title"
            name="metaTitle"
            value={formValues.metaTitle}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter blog title (50–60 characters)"
            inputProps={{ maxLength: 60, minLength: 50 }}
            helperText={`${formValues.metaTitle.length}/60 characters`}
            error={
              formValues.metaTitle.length > 0 &&
              (formValues.metaTitle.length < 50 ||
                formValues.metaTitle.length > 60)
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Meta Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter blog description (5–160 characters)"
            inputProps={{ maxLength: 160, minLength: 5 }}
            helperText={`${formValues.description.length}/160 characters`}
            error={
              formValues.description.length > 0 &&
              (formValues.description.length < 5 ||
                formValues.description.length > 160)
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Parma Link"
            name="paraLink"
            value={formValues.paraLink}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter blog Parma Link"
            required
            helperText={
              formValues.paraLink
                ? `${formValues.paraLink.length} characters`
                : "Required"
            }
            error={!formValues.paraLink}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: 350, overflowY: "auto" }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                [{ font: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["blockquote", "code-block"],
                ["clean"],
              ],
            }}
          />
        </FormControl>

        <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
          Content Length: {contentCounters} characters
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Thumbnail
          </Typography>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="thumbnail-upload"
            onChange={handleUploadChange}
          />
          <Button
            style={{ backgroundColor: "#21ABA5", color: "white" }}
            onClick={() => document.getElementById("thumbnail-upload").click()}
            disabled={isCompressing}
            startIcon={isCompressing ? <CircularProgress size={20} /> : null}
          >
            Select Image
          </Button>
          {thumbnailPreview && (
            <Box sx={{ mt: 1 }}>
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <Button
                sx={{ mt: 1 }}
                onClick={() => {
                  setThumbnailFile(null);
                  setThumbnailPreview(null);
                }}
              >
                Remove Image
              </Button>
            </Box>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Cover Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="cover-upload"
            onChange={handleCoverChange}
          />
          <Button
            style={{ backgroundColor: "#21ABA5", color: "white" }}
            onClick={() => document.getElementById("cover-upload").click()}
            disabled={isCompressing}
            startIcon={isCompressing ? <CircularProgress size={20} /> : null}
          >
            Select Cover Image
          </Button>
          {coverPreview && (
            <Box sx={{ mt: 1 }}>
              <img
                src={coverPreview}
                alt="Cover preview"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <Button sx={{ mt: 1 }} onClick={handleRemoveCover}>
                Remove Image
              </Button>
            </Box>
          )}
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
            />
          }
          label="Popular Blog"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleCloseAttempt}
            disabled={loading}
            sx={{ px: 4 }}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#21ABA5", color: "white" }}
            onClick={handleUpdateBlog}
            disabled={loading || isCompressing}
            sx={{ px: 4 }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showConfirmModal}
        onClose={() => handleConfirmAction("cancel")}
      >
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Do you want to save before closing?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmAction("no")} sx={{ px: 4 }}>
            No
          </Button>
          <Button onClick={() => handleConfirmAction("cancel")} sx={{ px: 4 }}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#21ABA5", color: "white" }}
            onClick={() => handleConfirmAction("yes")}
            disabled={loading}
            sx={{ px: 4 }}
          >
            {loading ? <CircularProgress size={24} /> : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showCropModal}
        onClose={() => setShowCropModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crop Cover Image</DialogTitle>
        <DialogContent>
          {coverPreview && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                bgcolor: "#333",
              }}
            >
              <Cropper
                image={coverPreview}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCropModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCropSave}>
            Crop
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateBlog;
