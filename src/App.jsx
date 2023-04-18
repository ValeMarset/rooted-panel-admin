import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import ProductsPage from "./pages/ProductsPage";
//import Login from "./Components/Access/Login";
import HomePage from "./pages/HomePage";
// import OrderPage from "./pages/OrderPage";
// import OrdersPage from "./pages/OrdersPage";
// import CategoriesPage from "./pages/CategoriesPage";
// import AdminPage from "./pages/AdminPage";
// import CreateProduct from "./Components/Products/CreateProduct";
// import UpdateProduct from "./Components/Products/UpdateProduct";
// import CreateCategory from "./Components/Categories/CreateCategory";
// import UpdateCategory from "./Components/Categories/UpdateCategory";
// import CreateAdmin from "./Components/Admins/CreateAdmin";
// import AdminProfilePage from "./pages/AdminProfilePage";

export default function App() {
  const admin = useSelector((state) => state.admin);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/" element={<HomePage />} />

        {/* <Route
          path="/"
          element={admin ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/products"
          element={admin ? <ProductsPage /> : <Navigate to="/login" replace />}
        /> */}
        {/* <Route
          path="/products/create"
          element={admin ? <CreateProduct /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products/update/:id"
          element={admin ? <UpdateProduct /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/orders"
          element={admin ? <OrdersPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/orders/:id"
          element={admin ? <OrderPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/categories"
          element={
            admin ? <CategoriesPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/categories/create"
          element={
            admin ? <CreateCategory /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/categories/update/:id"
          element={
            admin ? <UpdateCategory /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admins"
          element={admin ? <AdminPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admins/create"
          element={admin ? <CreateAdmin /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile/:adminId"
          element={
            admin ? <AdminProfilePage /> : <Navigate to="/login" replace />
          }
        /> */}
      </Routes>
      <Toaster />
    </div>
  );
}
