import React from "react";
import BackButton from "../BackButton/backButton";
import useMutation from "../../hooks/useMutation";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import useFormFields from "../../hooks/useFormFields";
import stringToSlug from "../../utils/stringToSlug";
import { Navigate } from "react-router-dom";
const ADD_ARTICLE_URL = "http://localhost:1337/articles";

export default function EditArticle({ prevsData }) {

  const { fields, handleSetFields } = useFormFields({
    title: prevsData.title,
    slug: prevsData.slug,
    content: prevsData.content,
  });
  const [editArticle, { loading, error, data }] = useMutation(ADD_ARTICLE_URL + "/" + prevsData.id);

  function handleSubmit(event) {
    event.preventDefault();

    const dataToSend = {};
    dataToSend.title = fields.title;
    dataToSend.slug = stringToSlug(fields.title);
    dataToSend.content = fields.content;

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataToSend));

    editArticle({
      method: "PUT",
      body: formData,
    }).then((data) => console.log(data, "Article edited"));
  }

  if (data) return <Navigate to={"/article/" + prevsData.id} />;

  return (
    <div>
      <h2>Edit Article</h2>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={fields.title }
              onChange={handleSetFields}
              type="text"
              placeholder="Title"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              name="slug"
              value={(stringToSlug(fields.title))}
              onChange={handleSetFields}
              onBlur={handleSetFields}
              type="text"
              placeholder="Slug"
              disabled
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTextarea">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="content"
              value={fields.content}
              onChange={handleSetFields}
              as="textarea"
              placeholder="Enter project description"
              rows={3}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm Edit
          </Button>
          <div className="text-danger d-flex justify-content-center">
            {error && error.message}
            {loading && <Spinner animation="grow" variant="info" />}
          </div>
        </fieldset>
      </Form>
      <BackButton />
    </div>
  );
}
