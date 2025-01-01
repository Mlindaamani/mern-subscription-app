import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { videoStore } from "../stores/videoStore";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { loading, uploadVideo } = videoStore();
  const navigate = useNavigate();

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    formData.append("description", description);
    formData.append("title", title);
    uploadVideo(formData, navigate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.4,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="d-flex justify-contents-center align-items-center vh-100 w-100 flex-column mt-5 bg-white">
        <Form className="mt-5" onSubmit={handleVideoSubmit}>
          <h5 className="text-center p-5 mb-3 text-secondary">UPLOAD VIDEO</h5>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">
              Video Title
            </Form.Label>
            <Form.Control
              type="text"
              className="p-2 m-1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">
              Video Description
            </Form.Label>
            <Form.Control
              as={"textarea"}
              className="p-2 m-1"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold text-secondary">
              Upload Video
            </Form.Label>
            <Form.Control
              type="file"
              className="p-2 m-1"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </Form.Group>
          <Button
            className="p-2 m-2 w-100 mt-4"
            variant="success"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </Form>
      </div>
    </motion.div>
  );
};
