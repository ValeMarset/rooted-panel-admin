import React from "react";
import CrudCategories from "../components/Categories/CrudCategories";
import Sidebar from "../components/home/Sidebar";
import NavbarPanel from "../components/home/NavbarPanel";

export default function CategoriesPage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <CrudCategories />
      </div>
    </>
  );
}
