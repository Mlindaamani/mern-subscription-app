import React, { useEffect } from "react";
import { videoStore } from "../stores/videoStore";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { authStore } from "../stores/authStore";
import { formatVideoViewsCount } from "../utils/functions";

export const Videos = () => {
  const { fetchVideos, videos, loading } = videoStore();
  const { user } = authStore();

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (loading) return <Loader />;

  return (
    <Container className="mt-5 p-5">
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
                  />
                  <h4 className="mt-2 mb-5">{video.title}</h4>

                  {/* vIEWS AND VIEW MORE */}
                  <div className="d-flex justify-content-between mt-3 align-items-start">
                    <span className="fw-bold text-white">
                      {video.views}
                      {formatVideoViewsCount(video.views)} Views
                    </span>
                    {user?.hasPaid && (
                      <Button
                        variant="success fw-bold fw-bold rounded-5 bg-opacity-25"
                        className="btn-sm text-white"
                      >
                        View Video
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
