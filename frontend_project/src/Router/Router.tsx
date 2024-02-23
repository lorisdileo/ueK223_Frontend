import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import BlogPostTable from "../components/pages/BlogPage/BlogPostTable";
import BlogPostPage from "../components/pages/BlogPage/BlogPostPage";
import UserHomePage from "../components/pages/HomePage/UserHomePage";
import BlogPostPublicPage from "../components/pages/BlogPage/BlogPostPublicPage";
import BlogPostsPublicPage from "../components/pages/BlogPage/BlogPostsPublicPage";
import authorities from "../config/Authorities";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import AdminTable from "../components/pages/AdminPage/AdminTable";
/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <Routes>
      {/* All visitors and users have access to the following routes */}
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/blog/feed"} element={<BlogPostsPublicPage />} />
      <Route path={"/blog/:blogPostId"} element={<BlogPostPublicPage />} />

      {/* Only logged in users can access the following pages */}
      <Route
        path={"/home"}
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.DEFAULT, name: authorities.DEFAULT },
            ]}
            element={<UserHomePage />}
          ></PrivateRoute>
        }
      />
      <Route
        path={"/dashboard/:userId"}
        element={
          <PrivateRoute
            authorities={[
              {
                id: authorities.BLOG_MODIFY_BY_ID,
                name: authorities.BLOG_MODIFY_BY_ID,
              },
            ]}
            element={<BlogPostTable />}
          ></PrivateRoute>
        }
      />
      <Route
        path={"/createBlog"}
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.BLOG_CREATE, name: authorities.BLOG_CREATE },
            ]}
            element={<BlogPostPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path={"/blogedit/:blogPostId"}
        element={
          <PrivateRoute
            authorities={[
              {
                id: authorities.BLOG_MODIFY_BY_ID,
                name: authorities.BLOG_MODIFY_BY_ID,
              },
              {
                id: authorities.BLOG_DELETE_BY_ID,
                name: authorities.BLOG_DELETE_BY_ID,
              },
            ]}
            element={<BlogPostPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute
            authorities={[
              {
                id: authorities.DEFAULT,
                name: authorities.DEFAULT,
              },
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      {/* Only admins have access to these pages */}
      <Route
        path={"/admin"}
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY },
            ]}
            element={<AdminTable />}
          ></PrivateRoute>
        }
      />
      <Route
        path={"/adminedit/:blogPostId"}
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY },
            ]}
            element={<AdminPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path={"/users"}
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY },
            ]}
            element={<UserTable />}
          />
        }
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute
            authorities={[
              { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY },
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
          <div>
            <div>Not Found</div>
            <button onClick={handleBackHome}>Back Home</button>
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
