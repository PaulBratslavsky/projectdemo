import React from "react";
import useQuery from "../../hooks/useQuery";
import { Spinner, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import BackButton from '../BackButton/backButton';

const API_URL = "http://localhost:1337";
const articleURL = "http://localhost:1337/articles/";

export default function ArticleDetail() {
  const { articleID } = useParams();
  const { data, loading, error } = useQuery(articleURL + articleID);

  if (loading) return <Spinner animation="grow" variant="info" />;
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

      { thumbnail && <Image src={API_URL + thumbnail.formats.large.url} /> }

      <ReactMarkdown>{content}</ReactMarkdown>

      <div className="d-flex justify-content-between">
        { author && <span>author: {author.username}</span> }
        <span>Posted on {date}</span>
      </div>

      <BackButton />
    </div>
  );
}
