import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/app/Sidebar";
import Topbar from "../components/app/Topbar";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() =>
            setIsSidebarCollapsed((previous) => !previous)
          }
        />

        {/* Main Application Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;