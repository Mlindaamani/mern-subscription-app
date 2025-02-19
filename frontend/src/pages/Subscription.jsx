import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
// import { IMAGES } from "../images/Images";
import { SubscribeButton } from "../components/SubscribeButton";
import { subscriptionStore } from "../stores/subscriptionStore";

export const Subscription = () => {
  const [plan, setPlan] = useState("");
  const { subscribe } = subscriptionStore();

  const handleClick = (planName) => {
    setPlan(planName);
    subscribe(plan);
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Container className="d-flex justify-content-center align-items-center p-3 mt-5 mb-5 vh-100 gap-5">
        <Row>
          <Col
            onClick={() => handleClick("basic")}
            style={{ cursor: "pointer" }}
          >
            {/* Basic Package */}
            <div className="d-flex p-3 flex-column align-items-center gap-4 border border-2 border-secondary w-100 rounded-4">
              <h1 className="text-center p-3 text-secondary fw-bold">BASIC</h1>
              <div className="d-flex jusify-content-between align-items-center gap-5 flex-column">
                <img
                  src="g2.png"
                  alt="Basic Image"
                  className="img-thumbnail rounded-4"
                />
                <p className="fs-1 fw-bold text-success">$50/Month</p>
                <div className="flex-column">
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5 ">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                </div>
              </div>
              <SubscribeButton
                text="SUBSCRIBE"
                style="secondary mt-2 w-100 p-2"
              />
            </div>
          </Col>
          <Col
            onClick={() => handleClick("standard")}
            style={{ cursor: "pointer" }}
          >
            {/* Standard Package */}
            <div className="d-flex p-3 flex-column align-items-center gap-4 border border-2 border-secondary w-100 rounded-4">
              <h1 className="text-center p-3 text-primary fw-bold">STANDARD</h1>
              <div className="d-flex jusify-content-between align-items-center gap-5 flex-column">
                <img
                  src="/image2.png"
                  alt="Standard Image"
                  className="img-thumbnail"
                />
                <p className="fs-1 fw-bold text-success">$100/Month</p>
                <div className="flex-column">
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5 ">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                </div>
              </div>
              <SubscribeButton
                text="SUBSCRIBE"
                style="primary mt-2 w-100 p-2"
              />
            </div>
          </Col>
          <Col
            onClick={() => handleClick("meru")}
            style={{ cursor: "pointer" }}
          >
            {/* Credor-POA Package */}
            <div className="d-flex p-3 flex-column align-items-center border border-2 border-secondary w-100 rounded-4">
              <h1 className="text-center p-3 text-success fw-bold">MERU</h1>
              <div className="d-flex jusify-content-between align-items-center gap-5 flex-column">
                <img
                  src="/image3.jpg"
                  alt="Basic Image"
                  className="img-thumbnail rounded-4"
                />
                <p className="fs-1 fw-bold text-success">$300/Month</p>
                <div className="flex-column">
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5 ">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                </div>
              </div>
              <SubscribeButton
                style={"success mt-2 w-100 p-2"}
                text={"SUBSCRIBE"}
              />
            </div>
          </Col>
          <Col
            onClick={() => handleClick("premium")}
            style={{ cursor: "pointer" }}
          >
            {/* Premium Package*/}
            <div className="d-flex p-3 flex-column align-items-center gap-4 border border-2 border-secondary w-100 rounded-4">
              <h1 className="text-center p-3 text-danger fw-bold">PREMIUM</h1>
              <div className="d-flex jusify-content-between align-items-center gap-5 flex-column">
                <img
                  src="/image4.png"
                  alt="Basic Image"
                  className="img-thumbnail rounded-4"
                />
                <p className="fs-1 fw-bold text-success">$500/Month</p>
                <div className="flex-column">
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5 ">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                  <div className="d-flex justify-content-end gap-5">
                    <span>✅</span> <p>10 Videos daily</p>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-4 justify-contentt-center align-items-center">
                <SubscribeButton
                  text="SUBSCRIBE"
                  style="danger mt-2 w-100 p-2"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};
