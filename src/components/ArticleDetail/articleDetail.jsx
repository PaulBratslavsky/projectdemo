import React from "react";
import useQuery from "../../hooks/useQuery";
import { Spinner, Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import BackButton from "../BackButton/backButton";
import NotFound from "../NotFound/notFound";
import useMutation from '../../hooks/useMutation';

const API_URL = "http://localhost:1337";
const articleURL = "http://localhost:1337/articles/";

export default function ArticleDetail() {
  const { articleID } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(articleURL + articleID);
  const [deleteArticle, { loading: deleteLoading }] = useMutation(articleURL + articleID)
  
  function handleDelete() {
    deleteArticle({ method: "DELETE" }).then(() => navigate("/"));
  }
  
  if (loading || deleteLoading) return <Spinner animation="grow" variant="info" />;
  if (error && error.message === "Unexpected token N in JSON at position 0")
    return <NotFound />;
  if (error) return <div>Error:{error.message}</div>;
  if (!data) return null;

  const { title, content, author, thumbnail, likes, created_at } = data;
  const date = format(new Date(created_at), "MMMM dd, yyyy");

  return (
    <div className="p-2 mb-3 shadow rounded">
      <div className="d-flex justify-content-between">
        <div>{title}</div>
        <div>likes: {likes}</div>
      </div>

      {thumbnail && <Image src={API_URL + thumbnail.formats.large.url} />}

      <ReactMarkdown>{content}</ReactMarkdown>

      <div className="d-flex justify-content-between">
        {author && <span>author: {author.username}</span>}
        <span>Posted on {date}</span>
      </div>
      <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
      <Button variant="outline-primary" onClick={() => navigate(`/edit-article/${articleID}`)}>Edit</Button>
      <BackButton />
    </div>
  );
}
