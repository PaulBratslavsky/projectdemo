import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import useQuery from '../../hooks/useQuery';
import EditArticle from '../EditArticle/editArticle';

const ADD_ARTICLE_URL = 'http://localhost:1337/articles';
export default function WhatWrapper() {
  const { articleID } = useParams();
  const { data, loading, error } = useQuery(ADD_ARTICLE_URL + "/" + articleID);

  if (loading) return <Spinner animation="grow" variant="info" />;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <EditArticle prevsData={data} />
    </div>
  )
}
