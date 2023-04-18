import React from "react";
import AdminProfile from "../components/Admins/AdminProfile";
import Sidebar from "../components/home/Sidebar";
import NavbarPanel from "../components/home/NavbarPanel";

function AdminProfilePage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <AdminProfile />
      </div>
    </>
  );
}

export default AdminProfilePage;
