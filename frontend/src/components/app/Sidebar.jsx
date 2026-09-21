import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Mic,
  Route,
  Settings,
  UserRound,
  Video,
  X,
} from "lucide-react";

// ====================
// Main Navigation Items
// ====================
const navigation = [
  {
    label: "Dashboard",
    emoji: "🏠",
    path: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Resume Analyzer",
    emoji: "📄",
    path: "/app/resume",
    icon: FileText,
  },
  {
    label: "Jobs",
    emoji: "💼",
    path: "/app/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "AI Interviews",
    emoji: "🤖",
    path: "/app/interview",
    icon: MessageSquare,
  },
  {
    label: "Voice Interview",
    emoji: "🎙️",
    path: "/app/voice-interview",
    icon: Mic,
  },
  {
    label: "Multimodal Interview",
    emoji: "🎥",
    path: "/app/multimodal-interview",
    icon: Video,
  },
  {
    label: "Career Assistant",
    emoji: "🧠",
    path: "/app/career-assistant",
    icon: GraduationCap,
  },
  {
    label: "Career Roadmap",
    emoji: "🗺️",
    path: "/app/career-roadmap",
    icon: Route,
  },
  {
    label: "Analytics",
    emoji: "📊",
    path: "/app/analytics",
    icon: BarChart3,
  },
];

// ====================
// Account Navigation
// ====================
const accountNavigation = [
  {
    label: "Profile",
    emoji: "👤",
    path: "/app/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    emoji: "⚙️",
    path: "/app/settings",
    icon: Settings,
  },
];

// ====================
// Sidebar Component
// ====================
function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  return (
    <>
      {/* ====================
          Mobile Overlay
      ==================== */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
        />
      )}

      {/* ====================
          Sidebar Container
      ==================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* ====================
            Sidebar Header
        ==================== */}
        <div
          className={`flex h-20 items-center border-b border-slate-100 dark:border-slate-800 ${
            isCollapsed ? "justify-center px-3" : "justify-between px-6"
          }`}
        >
          {/* ====================
              Application Branding
          ==================== */}
          <NavLink
            to="/app/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            {/* ====================
                AI Logo
            ==================== */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-lg shadow-lg shadow-indigo-600/20">
              🤖
            </div>

            {/* ====================
                Application Name
            ==================== */}
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  InterviewAI
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Career Copilot
                </p>
              </div>
            )}
          </NavLink>

          {/* ====================
              Mobile Close Button
          ==================== */}
          {!isCollapsed && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* ====================
            Navigation Section
        ==================== */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          {/* ====================
              Workspace Heading
          ==================== */}
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Workspace
            </p>
          )}

          {/* ====================
              Main Navigation Links
          ==================== */}
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  {/* ====================
                      Navigation Emoji
                  ==================== */}
                  <span className="text-base">{item.emoji}</span>

                  {/* ====================
                      Navigation Icon
                  ==================== */}
                  <Icon size={18} strokeWidth={2} />

                  {/* ====================
                      Navigation Label
                  ==================== */}
                  {!isCollapsed && (
                    <span className="flex-1">{item.label}</span>
                  )}

                  {/* ====================
                      AI Badge
                  ==================== */}
                  {!isCollapsed && item.label === "AI Interviews" && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* ====================
              Account Divider
          ==================== */}
          <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

          {/* ====================
              Account Heading
          ==================== */}
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Account
            </p>
          )}

          {/* ====================
              Account Navigation
          ==================== */}
          <div className="space-y-1">
            {accountNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isCollapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  {/* ====================
                      Account Emoji
                  ==================== */}
                  <span className="text-base">{item.emoji}</span>

                  {/* ====================
                      Account Icon
                  ==================== */}
                  <Icon size={18} />

                  {/* ====================
                      Account Label
                  ==================== */}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ====================
            Sidebar User Profile
        ==================== */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <div
            className={`flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {/* ====================
                Profile Avatar
            ==================== */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
              AC
            </div>

            {/* ====================
                Profile Information
            ==================== */}
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  Arka Chandra
                </p>

                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Career Explorer 🚀
                </p>
              </div>
            )}

            {/* ====================
                Online Status
            ==================== */}
            {!isCollapsed && (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            )}
          </div>
        </div>

        {/* ====================
            Desktop Collapse Button
        ==================== */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 lg:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;