import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BackButton({ text = "Back" }) {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(-1)}>{text}</Button>;
}
