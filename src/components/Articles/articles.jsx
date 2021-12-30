import useResource from "../../hooks/useResource";
import { Spinner } from "react-bootstrap";
import Article from '../Article/article';
const articlesURL = "http://localhost:1337/articles";

export default function Articles() {
  const { data, loading, error } = useResource(articlesURL);

  if (loading) return <Spinner animation="grow" variant="info" />;
  if (error) return <div>Error:{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}
 