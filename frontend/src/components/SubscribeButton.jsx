import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SubscribeButton = ({ text, style }) => {
  return (
    <Button variant={style}>
      <Link to="/checkout" className="text-light text-decoration-none">{text}</Link>
    </Button>
  );
};
