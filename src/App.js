import { useContext } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Articles from "./components/Articles/articles";
import ArticleDetail from "./components/ArticleDetail/articleDetail";
import AddArticle from "./components/AddArticle/addArticle";
import WhatWrapper from "./components/WhatWrapper/whatWrapper";
import NotFound from "./components/NotFound/notFound";
import { Routes, Route } from "react-router-dom";
import { UserContext } from './context/UserContext';
function PrivateRoute({ children, auth }) {
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useContext(UserContext);
  return (
    <Container className="App">
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </Nav>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-article"
          element={
            <PrivateRoute auth={user}>
              <AddArticle />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-article/:articleID"
          element={
            <PrivateRoute auth={user}>
              <WhatWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/article/:articleID"
          element={
            <PrivateRoute auth={user}>
              <ArticleDetail />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
