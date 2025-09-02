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
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import BlogAPI from "../../api/blog";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import useImageCompression from "../../hooks/useImageCompression";

function CreateBlog({ fetchBlogs, handleCloseModal }) {
  const [formValues, setFormValues] = useState({
    title: "",
    metaTitle: "",
    description: "",
    paraLink: "",
  });
  const [showToast, setShowToast] = useState(true);
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
    if (!showToast) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  useEffect(() => {
    setContentCounters(content.replace(/<[^>]*>/g, "").length);
  }, [content]);

  const handleCreateBlog = async () => {
    if (!formValues.title) {
      if (showToast) {
        setShowToast(false);
        toast.error("Please enter the Title!");
      }
      return;
    }
    if (!formValues.paraLink) {
      if (showToast) {
        setShowToast(false);
        toast.error("Please enter the Parma Link!");
      }

      return;
    }
    if (formValues.metaTitle.length < 50 || formValues.metaTitle.length > 60) {
      if (showToast) {
        setShowToast(false);
        toast.error("Meta Title must be 50–60 characters");
      }
      return;
    }
    if (
      formValues.description.length < 5 ||
      formValues.description.length > 160
    ) {
      if (showToast) {
        setShowToast(false);
        toast.error("Meta Description must be 5–160 characters");
      }
      return;
    }
    if (!content) {
      if (showToast) {
        setShowToast(false);
        toast.error("Please enter the blog content!");
      }
      return;
    }
    if (!thumbnailFile) {
      if (showToast) {
        setShowToast(false);
        toast.error("Please upload the blog thumbnail!");
      }
      return;
    }
    if (!coverFile && !coverPreview) {
      if (showToast) {
        setShowToast(false);
        toast.error("Please upload the blog cover image!");
      }
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

      await BlogAPI.createBlog(formData);
      toast.success("Blog created successfully!");
      resetForm();
      handleCloseModal(true);
      fetchBlogs();
    } catch (error) {
      if (Array.isArray(error?.response?.data?.message?.message)) {
        toast.error(error?.response?.data?.message?.message[0]);
      } else {
        toast.error(error?.response?.data?.message || "Failed to create blog");
      }
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
      await handleCreateBlog();
    } else if (action === "no") {
      handleCloseModal(true);
      resetForm();
    }
  };

  // const handleUploadChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const { compressedFile, previewUrl } = await compressImage(file);
  //     setThumbnailFile(compressedFile);
  //     setThumbnailPreview(previewUrl);
  //   }
  // };
  const handleUploadChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        if (showToast) {
          setShowToast(false);
          toast.error("Please upload a valid image file!");
        }
        return;
      }

      // Create an image object to check dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = async () => {
        const aspectRatio = img.width / img.height;
        if (aspectRatio <= 1) {
          if (showToast) {
            setShowToast(false);
            toast.error("Please upload a landscape image (width > height)!");
          }
          URL.revokeObjectURL(objectUrl);
          return;
        }

        // If the image is landscape, proceed with compression and preview
        const { compressedFile, previewUrl } = await compressImage(file);
        setThumbnailFile(compressedFile);
        setThumbnailPreview(previewUrl);
        URL.revokeObjectURL(objectUrl);
      };

      img.onerror = () => {
        if (showToast) {
          setShowToast(false);
          toast.error("Failed to load the image!");
        }
        URL.revokeObjectURL(objectUrl);
      };
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

  return (
    <>
      <style jsx>{`
        .ql-snow .ql-tooltip {
          left: 9px !important;
        }
        .simple-editor-wrapper {
          width: auto !important;
          height: auto !important;
        }
      `}</style>
      <Box sx={{ maxHeight: 550, overflowY: "auto", p: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            required
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
            required
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
            required
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
            // error={!formValues.paraLink}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <SimpleEditor content={content} setContent={setContent} />
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
                style={{ maxWidth: "200px", maxHeight: "200px" }}
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
            onClick={handleCreateBlog}
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
          <Button onClick={() => handleConfirmAction("cancel")} sx={{ px: 4 }}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirmAction("no")} sx={{ px: 4 }}>
            No
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

export default CreateBlog;
