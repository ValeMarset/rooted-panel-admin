import React from "react";
import CrudAdmins from "../components/Admins/CrudAdmins";
import Sidebar from "../components/home/Sidebar";
import NavbarPanel from "../components/home/NavbarPanel";

export default function AdminPage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <CrudAdmins />
      </div>
    </>
  );
}
