import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { videoStore } from "../stores/videoStore";
import { formatDate } from "../utils/functions";
import { Loader } from "../components/Loader";
import { authStore } from "../stores/authStore";
import { formatVideoViewsCount } from "../utils/functions";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";

export const VideoDetails = () => {
  const { user } = authStore();
  const { video, fetchVideoById, loading, downloadVideo, videos, fetchVideos } =
    videoStore();

  const { videoId } = useParams();

  useEffect(() => {
    fetchVideoById(videoId);
  }, [fetchVideoById, videoId]);

  useEffect(() => {
    fetchVideos();
  }, [videoId]);

  const handleDownload = () => {
    downloadVideo(videoId);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-5 mt-5 bg-success rounded-4 d-flex flex-column bg-opacity-75 mb-5">
      <Container className="d-flex justify-content-center gap-5 align-content-center mb-5 rounded-4 bg-success p-5">
        <div>
          <img
            src={video.fileUrl}
            alt="Video Thumbnail"
            className="rounded-3 img-thumbnail"
          />
        </div>
        <div>
          <div className="d-flex flex-column justify-content-center align-items-start">
            <h2 className="text-light mb-2 mt-2">{video.title}</h2>
            <small className="text-light mb-2">
              {video.views}
              {formatVideoViewsCount(video.views)} Views .{" "}
              {formatDate(video.uploadDate)}
            </small>
            <p className="text-white fw-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              earum natus facilis eveniet, commodi modi provident libero animi
              asperiores blanditiis repellat porro
            </p>
            <ButtonGroup>
              <Button
                variant="danger btn-sm fw-bold"  
                onClick={handleDownload}
                disabled={!user.hasPaid}
              >
                Download
              </Button>
              <Button variant="primary btn-sm text-light fw-bold">
                <Link
                  to="/videos"
                  className="text-light fw-bold text-decoration-none"
                >
                  {" "}
                  View More
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Container>

      {/* Recommendations */}
      <Container className="mt-5 p-5 bg-light bg-opacity-80 rounded-5">
        <h1 className="text-center p-1 text-success mb-5 mt-1">
          You Might Also Like
        </h1>
        <Row>
          {videos?.map((video) => (
            <Col xs={12} md={4} lg={3} className="mb-4" key={video._id}>
              <Link
                to={`/videos/${video._id}`}
                className="text-decoration-none"
              >
                <div className="bg-success rounded-4">
                  <div className="text-white p-3">
                    <img
                      className="w-100 rounded-4 img-thumbnail"
                      src={video.fileUrl}
                      alt="Video Thumbnail"
                    />
                    <h4 className="mt-2 mb-5">{video.title}</h4>

                    {/* VIEWS AND VIEW MORE */}
                    <div className="d-flex justify-content-between mt-3 align-items-start">
                      <span className="fw-bold text-white">
                        {video.views}
                        {formatVideoViewsCount(video.views)} Views
                      </span>
                      {user?.hasPaid && (
                        <Button
                          variant="danger fw-bold fw-bold rounded-5"
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
    </div>
  );
};
