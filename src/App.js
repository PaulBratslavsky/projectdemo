import { Container } from 'react-bootstrap';
import Article from './components/Article/article';
import useResource from "./hooks/useResource";

const articlesURL = "http://localhost:1337/articles";

function App() {
  const { data, loading, error } = useResource(articlesURL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;

  console.log(data);

  return <Container className="App">
    {data.map(article => <Article key={article.id} article={article} />)}
  </Container>;
}

export default App;
