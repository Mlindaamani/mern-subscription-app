import React, { useEffect, useState } from "react";
import { videoStore } from "../stores/videoStore";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { authStore } from "../stores/authStore";
import { formatVideoViewsCount } from "../utils/functions";
import { SearchComponent } from "../components/Search";

export const Videos = () => {
  const { fetchVideos, videos, loading } = videoStore();
  const { user } = authStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (loading) return <Loader />;

  return (
    <Container className="mt-5 p-5">
      {/* Search component */}
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2 className="text-dark mt-5 px-3">Videos</h2>
      <Row>
        {videos?.map((video) => (
          <Col xs={12} md={4} lg={3} className="mb-4" key={video._id}>
            <Link to={`/videos/${video._id}`} className="text-decoration-none">
              <div className="bg-success rounded-4">
                <div className="text-white p-3">
                  <img
                    className="w-100 rounded-4 img-thumbnail"
                    src={video.fileUrl}
                    alt="Video Thumbnail"
                    width={50}
                    height={50}
                  />
                  <h4 className="mt-2 mb-5">{video.title}</h4>

                  {/* VIEWS AND VIEW MORE */}
                  <div className="d-flex justify-content-between mt-3 align-items-start">
                    <span className="fw-bold text-white">
                      {formatVideoViewsCount(video.views)} Views
                    </span>
                    {user?.hasPaid && (
                      <Button
                        variant="success fw-bold fw-bold rounded-5 bg-opacity-50"
                        className="btn-sm text-white"
                      >
                        {user.hasPaid ? "View Video" : "Pay to View Video"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
