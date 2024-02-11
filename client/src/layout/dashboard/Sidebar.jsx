import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Sidebar = ({ sidebarOpen }) => {
  console.log(sidebarOpen);
  const { user } = useContext(AuthContext);
  const candidateRoutes = [
    {
      path: "Applied_jobs",
      name: "Applied Jobs",
    },
    {
      path: "profile",
      name: "Update Profile",
    },
    {
      path: "add_blog",
      name: "Add Blog",
    },
    {
      path: "all_blogs",
      name: "All Published Blog",
    },
  ];

  const employeRoutes = [
    {
      path: "add_job",
      name: "Add New Job",
    },
    {
      path: "candidates",
      name: "All Jobs",
    },
    {
      path: "add_blog",
      name: "Add Blog",
    },
    {
      path: "all_blogs",
      name: "All Published Blog",
    },
    {
      path: "profile",
      name: "Update Profile",
    },
  ];
  const adminRoutes = [
    {
      path: "profile",
      name: "Update Profile",
    },
    {
      path: "add_job",
      name: "Add New Job",
    },
    {
      path: "candidates",
      name: "All Jobs",
    },
    {
      path: "add_blog",
      name: "Add Blog",
    },

    {
      path: "all_blogs",
      name: "All Published Blog",
    },
    { path: "manage",
     name: "Manage User"
     }
    ];
  return (
    <div className={`bg-primary/10 col-span-2 h-screen  sticky top-0 `}>
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        {user?.role == "candidate" &&
          candidateRoutes?.map(({ path, name }, i) => (
            <li key={i}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {name}
              </Link>
            </li>
          ))}

        {user?.role == "recruiter" &&
          employeRoutes?.map(({ path, name }, i) => (
            <li key={i}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {name}
              </Link>
            </li>
          ))}
        {user?.role == "admin" &&
          adminRoutes?.map(({ path, name }, i) => (
            <li key={i}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
