import { Container } from "react-bootstrap";
import Articles from './components/Articles/articles';
import ArticleDetail from './components/ArticleDetail/articleDetail';
import AddArticle from './components/AddArticle/addArticle';
import WhatWrapper from './components/WhatWrapper/whatWrapper';
import NotFound from './components/NotFound/notFound';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/edit-article/:articleID" element={<WhatWrapper />} />
        <Route path="/article/:articleID" element={<ArticleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
