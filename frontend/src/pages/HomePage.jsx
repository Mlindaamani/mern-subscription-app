import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RealTimeChat } from "./RealtimeChat";
import { ScrollableTabsButtonAuto } from "../../../UI/Material";

export const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="mt-5 p-5 bg-success vh-100">
        <h1 className="mt-5 text-center p-5 mb-5 text-white">
          CREDOR THE DANCER
        </h1>

        <div className="container">
          <RealTimeChat />
        </div>
        <h5 className="mt-5 text-center p-5 mb-5 text-white">
          ENJOY COOL MUSIC FROM CREDOR
        </h5>

        <div className="text-center">
          <Link
            to={"/videos"}
            className="text-center text-decoration-none mt-4 text-light bg-primary p-4 rounded-5"
          >
            View Our Latest Videos
          </Link>
        </div>
      </div>

      <ScrollableTabsButtonAuto />
    </motion.div>
  );
};
