import { Outlet } from "react-router-dom";
import Navbar from "../components/public/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main>
        <Outlet />
      </main>

      {/* Footer will be added later */}
    </div>
  );
}

export default PublicLayout;