import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import authorities from "../config/Authorities";
import BlogDetailPage from "../components/pages/BlogPage/BlogDetailPage";
import UserHomePage from "../components/pages/HomePage/UserHomePage";
import BlogPostPublicPage from "../components/pages/BlogPage/BlogPostPublicPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      {/* All guests and users have access to the following pages: */}
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/blogs"} element={<BlogPostPublicPage />} />
      <Route path={"/blog/:Id"} element={<BlogDetailPage />} />

      {/* Only logged in users have access to the following pages: TBD*/}
      <Route
        path={"/home"}
        element={
          <PrivateRoute
            requiredAuths={[]}
            element={<UserHomePage />}
          ></PrivateRoute>
        }
      />

      {/* Only Admins have access to the following pages: TBD*/}
      <Route
        path={"/users"}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute
            requiredAuths={[
              authorities.USER_DEACTIVATE,
              authorities.USER_CREATE,
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_READ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
