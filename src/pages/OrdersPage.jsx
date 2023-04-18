import NavbarPanel from "../components/home/NavbarPanel";
import Sidebar from "../components/home/Sidebar";
import Orders from "../components/Orders/Orders";

export default function OrdersPage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <Orders />
      </div>
    </>
  );
}
