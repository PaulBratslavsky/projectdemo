import React from "react";
import BackButton from "../BackButton/backButton";
import useMutation from "../../hooks/useMutation";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import useFormFields from "../../hooks/useFormFields";
import stringToSlug from "../../utils/stringToSlug";
const ADD_ARTICLE_URL = "http://localhost:1337/articles";

const INITIAL_FORM_STATE = {
  title: "",
  slug: "",
  content: "",
  // thumbnail: "",
};

export default function AddArticle() {
  const { fields, handleSetFields, resetFields } =
    useFormFields(INITIAL_FORM_STATE);
  const [addArticle, { loading, error, data }] = useMutation(ADD_ARTICLE_URL);

  function handleSubmit(event) {
    event.preventDefault();
    const dataToSend = { ...fields, slug: stringToSlug(fields.title) };
    addArticle({ 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
     });
  }

  if (loading) return <Spinner animation="grow" variant="info" />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Add Article</h2>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <Form.Group as={Col} controlId="formGridGitHub">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={fields.title}
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
              value={stringToSlug(fields.slug) || stringToSlug(fields.title)}
              onChange={handleSetFields}
              onBlur={handleSetFields}
              type="text"
              placeholder="Slug"
              disabled
              required
            />
          </Form.Group>

          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add Image</Form.Label>
            <Form.Control
              name="thumbnail"
              onChange={handleSetFields}
              type="file"
              required
            />
          </Form.Group> */}

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
            Submit
          </Button>
        </fieldset>
      </Form>
      <BackButton />
    </div>
  );
}