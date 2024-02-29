import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import BlogListOfUser from "../components/pages/BlogPage/BlogListOfUser";
import BlogCreation from "../components/pages/BlogPage/BlogCreation";
import UserHomePage from "../components/pages/HomePage/UserHomePage";
import BlogDetailPage from "../components/pages/BlogPage/BlogDetailPage";
import BlogList from "../components/pages/BlogPage/BlogList";
import authorities from "../config/Authorities";
import AdminPage from "../components/pages/AdminPage/AdminBlogEdit";
import AdminBlogList from "../components/pages/AdminPage/AdminBlogList";
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
      <Route path={"/blogs"} element={<BlogList />} />
      <Route path={"/blog/:blogPostId"} element={<BlogDetailPage />} />

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
            element={<BlogListOfUser />}
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
            element={<BlogCreation />}
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
            element={<BlogCreation />}
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
            element={<AdminBlogList />}
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
