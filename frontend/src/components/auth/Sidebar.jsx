import { FaHome, FaUser, FaComments, FaBars, FaForumbee, FaAddressCard, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen, role, login }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`bg-gray-900 text-white min-h-screen transition-all duration-300 ${open ? "w-48 p-4" : "w-16 p-2"}`}
    >
      <div className="flex flex-col gap-10">
        <button className="mb-6">
          <FaBars size={30} />
        </button>

        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <FaHome size={25} />
          {open && <span>Home</span>}
        </button>

        <button onClick={() => navigate("/cart")} className="flex items-center gap-3">
          <FaCartPlus size={25} />
          {open && <span>Cart</span>}
        </button>

        <button onClick={() => navigate("/profile")} className="flex items-center gap-3">
          <FaUser size={25} />
          {open && <span>Profile</span>}
        </button>


        {/* Show Login only if not logged in */}
        {!login && (
          <button onClick={() => navigate("/LoginSignup")} className="flex items-center gap-3">
            <FaAddressCard size={25} />
            {open && <span>Login</span>}
          </button>
        )}

        {/* Only show Product Form for seller or admin */}
        {(role === "seller" || role === "admin") && (
          <button onClick={() => navigate("/productform")} className="flex items-center gap-3">
            <FaForumbee size={25} />
            {open && <span>Product Form</span>}
          </button>
        )}

        {/* Only show Admin Panel for admin */}
        {role === "admin" && (
          <button onClick={() => navigate("/admin")} className="flex items-center gap-3">
            <FaUser size={25} />
            {open && <span>Admin Panel</span>}
          </button>
        )}
      </div>
    </div>
  );
}