import { Bell, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ====================
// Topbar Component
// ====================
function Topbar({ onMenuClick }) {
  // ====================
  // Theme Hook
  // ====================
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 sm:px-6 lg:px-8">
      {/* ====================
          Left Section
      ==================== */}
      <div className="flex min-w-0 items-center gap-3">
        {/* ====================
            Mobile Menu Button
        ==================== */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex shrink-0 items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>

        {/* ====================
            Workspace Information
        ==================== */}
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
            Career Workspace
          </h2>

          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Build your next opportunity 🚀
          </p>
        </div>
      </div>

      {/* ====================
          Topbar Actions
      ==================== */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* ====================
            Theme Toggle
        ==================== */}
        {/*<button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:p-3"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>*/}

        {/* ====================
            Notification Button
        ==================== */}
        <button
          type="button"
          className="hidden rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:block"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* ====================
            User Avatar
        ==================== */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
          AC
        </div>
      </div>
    </header>
  );
}

export default Topbar;