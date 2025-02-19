import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { videoStore } from "../stores/videoStore";
import { formatDate } from "../utils/functions";
import { Loader } from "../components/Loader";
import { authStore } from "../stores/authStore";
import { formatVideoViewsCount } from "../utils/functions";
import { Button, ButtonGroup, Container } from "react-bootstrap";

export const VideoDetails = () => {
  const { user } = authStore();
  const { video, fetchVideoById, loading, downloadVideo } = videoStore();

  const { videoId } = useParams();

  useEffect(() => {
    fetchVideoById(videoId);
  }, [fetchVideoById, videoId]);

  const handleDownload = () => {
    downloadVideo(videoId);
  };

  if (loading) return <Loader />;

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      {user.hasPaid ? (
        <div className="p-5 mt-5 bg-success rounded-4 d-flex flex-column bg-opacity-75 mb-5">
          <Container className="d-flex justify-content-center gap-5 align-content-center mb-5 rounded-4 bg-success p-5">
            <div>
              <img
                src={video.fileUrl}
                width={300}
                height={300}
                alt="Video Thumbnail"
                className="rounded-3 img-thumbnail"
              />
            </div>
            <div>
              <div className="d-flex flex-column justify-content-center align-items-start">
                <h2 className="text-light mb-2 mt-2">{video.title}</h2>
                <small className="text-light mb-2">
                  {formatVideoViewsCount(video.views)} Views •{" "}
                  {formatDate(video.uploadDate)}
                </small>
                <p className="text-white fw-bold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat earum natus facilis eveniet, commodi modi provident
                  libero animi asperiores blanditiis repellat porro
                </p>
                <ButtonGroup>
                  <Button
                    variant="secondary btn-sm fw-bold"
                    onClick={handleDownload}
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
        </div>
      ) : (
        <div className="container vh-100 d-flex justify-content-center align-items-center bg-danger-subtle">
          <h2 className="bg-body-secondary p-3 rounded-3">
            You need to have an active subscription to video this video
          </h2>
        </div>
      )}
    </div>
  );
};
