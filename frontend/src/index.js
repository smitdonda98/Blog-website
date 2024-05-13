import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Author from './pages/Author';
import CreatePosts from './pages/CreatePost';
import EditPost from './pages/EditPost';
import CategoryPosts from './pages/CategoryPosts';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import DeletePost from './pages/DeletePost';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: 'true', element: <Home /> },
      { path: 'posts/:id', element: <PostDetail /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'profile/:id', element: <UserProfile /> },
      { path: 'author', element: <Author /> },
      { path: 'create', element: <CreatePosts /> },
      { path: 'posts/categories/:category', element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: 'post/:id/edit', element: <EditPost /> },
      { path: 'post/:id/delete', element: <DeletePost /> },
      { path: 'logout', element: <Logout /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
