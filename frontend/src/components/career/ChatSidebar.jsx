import React, { useState } from "react";

function ChatSidebar({ activeChat, setActiveChat, onNewChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const chatHistory = [
    {
      id: 1,
      title: "Resume Improvement",
      preview: "How can I improve my resume?",
      date: "Today",
    },
    {
      id: 2,
      title: "Backend Developer Skills",
      preview: "What skills should I learn?",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Technical Interview Prep",
      preview: "Help me prepare for an interview",
      date: "Yesterday",
    },
  ];

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 md:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl">
            ✨
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Career Assistant
            </h2>
            <p className="text-xs text-slate-500">AI-powered guidance</p>
          </div>
        </div>

        {/* New Chat */}
        <div className="p-4">
          <button
            onClick={() => {
              onNewChat();
              setIsOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            <span className="text-lg">+</span>
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recent Chats
          </div>

          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`w-full rounded-xl p-3 text-left transition ${
                  activeChat === chat.id
                    ? "bg-indigo-600/20 ring-1 ring-indigo-500/40"
                    : "hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-sm text-indigo-400">💬</div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-slate-200">
                      {chat.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {chat.preview}
                    </p>

                    <span className="mt-2 block text-[10px] text-slate-600">
                      {chat.date}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom User Section */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
              AC
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">
                Career Profile
              </p>
              <p className="text-xs text-slate-500">Personal workspace</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default ChatSidebar;