import {Outlet} from "react-router-dom"
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
     
        <Navbar/>
    

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
       <Sidebar/>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;