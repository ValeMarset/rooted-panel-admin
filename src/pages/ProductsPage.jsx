import React from "react";
import CrudProducts from "../components/Products/CrudProducts";
import Sidebar from "../components/home/Sidebar.jsx";
import NavbarPanel from "../components/home/NavbarPanel";

export default function ProductsPage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <CrudProducts />
      </div>
    </>
  );
}
