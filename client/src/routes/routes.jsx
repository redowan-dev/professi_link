import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/main/Main";
import AccountCreator from "../pages/register/AccountCreator";
import Home from "../pages/home/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import AddJob from "../pages/employeeDashboard/AddJob";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile/Profile";
import AppliedJobs from "../pages/candidateDashboard/AppliedJobs";
import JobManagement from "../pages/employeeDashboard/JobManagement";
import CandidateLists from "../pages/employeeDashboard/CandidateLists";
import UserProfile from "../pages/Profile/UserProfile";
import ProfileDetails from "../pages/Profile/ProfileDetails";
import BlogPage from "../pages/Blogs/BlogPage";
import AddBlog from "../pages/Blogs/AddBlog";
import BlogDetails from "../pages/Blogs/BlogDetails";
import { server_url } from "../environment/variables";
import ManageBlog from "../pages/Blogs/ManageBlog";
import ManageUser from "../pages/user/ManageUser";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/blogs/:id",
        loader:({params})=> fetch(`${server_url}blog/${params.id}`) ,
        element: <BlogDetails />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/profile/:id",
        element: <ProfileDetails />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <ProfileDetails />,
      },
      {
        path: "add_job",
        element: <AddJob />,
      },
      {
        path: "add_blog",
        element: <AddBlog />,
      },
      {
        path: "all_blogs",
        element: <ManageBlog />,
      },
      {
        path: "add_job/:id",
        element: <AddJob />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "Applied_jobs",
        element: <AppliedJobs />,
      },
      {
        path: "candidates",
        element: <JobManagement />,
      },
      {
        path: "manage",
        element: <ManageUser />,
      },
      {
        path: "candidates/:id",
        element: <CandidateLists />,
      },
    ],
  },
]);

export default routes;
