import NavbarPanel from "../components/home/NavbarPanel";
import Sidebar from "../components/home/Sidebar";
import Order from "../components/Order/Order";

export default function OrderPage() {
  return (
    <>
      <NavbarPanel />
      <div className="d-flex">
        <Sidebar />
        <Order />
      </div>
    </>
  );
}
