import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

const API_URL = "http://localhost:1337";
export default function Article({ article }) {
  
  const { id, title, content, author, thumbnail, likes, created_at } = article;
  const { url: imageURL } = thumbnail.formats.large;
  const date = format(new Date(created_at), "MMMM dd, yyyy");

  return (
    <div className="p-2 mb-3 shadow rounded">
      <div className="d-flex justify-content-between">
        <div>{title}</div>
        <div>likes: {likes}</div>
      </div>

      <Link to={`/article/${id}`}>
        <Image src={API_URL + imageURL} />
        <ReactMarkdown>{content}</ReactMarkdown>
      </Link>

      <div className="d-flex justify-content-between">
        <span>author: {author.username}</span>
        <span>Posted on {date}</span>
      </div>
    </div>
  );
}
