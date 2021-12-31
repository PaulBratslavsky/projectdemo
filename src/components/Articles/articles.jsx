import useQuery from "../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import Article from '../Article/article';
const articlesURL = "http://localhost:1337/articles";

export default function Articles() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(articlesURL);
  
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (error) return <div>Error:{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <Button variant="primary" onClick={() => navigate("/add-article")}>Add Article</Button>
      {data.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}
 