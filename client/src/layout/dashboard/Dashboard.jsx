import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../main/Navbar";
import { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={`top-14 bg-[#CEC0D4] fixed z-20 pt-6 left-0 w-[220px] h-[100vh]  ${!sidebarOpen && 'hidden'}`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="grid grid-cols-12 pt-3">
          <div className={'col-span-12 '}>
            <div className='h-full max-w-7xl mt-20 mx-6'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
