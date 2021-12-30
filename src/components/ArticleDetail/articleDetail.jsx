import React from "react";
import useResource from "../../hooks/useResource";
import { Spinner, Button, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

const API_URL = "http://localhost:1337";
const articleURL = "http://localhost:1337/articles/";

export default function ArticleDetail() {
  const { articleID } = useParams();
  const { data, loading, error } = useResource(articleURL + articleID);
  const navigate = useNavigate();

  if (loading) return <Spinner animation="grow" variant="info" />;
  if (error) return <div>Error:{error.message}</div>;
  if (!data) return null;

  const { title, content, author, thumbnail, likes, created_at } = data;
  const { url: imageURL } = thumbnail.formats.large;
  const date = format(new Date(created_at), "MMMM dd, yyyy");

  return (
    <div className="p-2 mb-3 shadow rounded">
      <div className="d-flex justify-content-between">
        <div>{title}</div>
        <div>likes: {likes}</div>
      </div>

      <Image src={API_URL + imageURL} />
      <ReactMarkdown>{content}</ReactMarkdown>

      <div className="d-flex justify-content-between">
        <span>author: {author.username}</span>
        <span>Posted on {date}</span>
      </div>

      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}
