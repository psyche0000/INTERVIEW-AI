import { useEffect, useState } from "react";

const CHAT_DATE_KEY = "career_chat_date";
const CHAT_MESSAGES_KEY = "career_chat_messages";

// Returns today's date in local time.
const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Initial welcome message.
const INITIAL_MESSAGE = {
  id: 1,
  sender: "ai",
  text: "Hi! I'm your Career Assistant. Ask me anything about jobs, interviews, resumes, skills, or career growth.",
  time: "Just now",
  sources: [],
};

const SUGGESTED_QUESTIONS = [
  "How can I improve my resume?",
  "What skills should I learn for a backend developer job?",
  "How should I prepare for an interview?",
  "What projects should I add to my portfolio?",
];

function CareerAssistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Load today's chat when the component opens.
  useEffect(() => {
    const today = getToday();
    const savedDate = localStorage.getItem(CHAT_DATE_KEY);
    const savedMessages = localStorage.getItem(CHAT_MESSAGES_KEY);

    // If the saved chat belongs to a previous day, start a new chat.
    if (savedDate !== today) {
      localStorage.setItem(CHAT_DATE_KEY, today);
      localStorage.setItem(
        CHAT_MESSAGES_KEY,
        JSON.stringify([INITIAL_MESSAGE])
      );

      setMessages([INITIAL_MESSAGE]);
      return;
    }

    // Restore today's messages.
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        setMessages([INITIAL_MESSAGE]);
      }
    }
  }, []);

  // Save messages whenever the chat changes.
  useEffect(() => {
    localStorage.setItem(CHAT_DATE_KEY, getToday());
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  // Automatically refresh the chat when a new day starts.
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getToday();
      const savedDate = localStorage.getItem(CHAT_DATE_KEY);

      if (savedDate !== today) {
        localStorage.setItem(CHAT_DATE_KEY, today);
        localStorage.setItem(
          CHAT_MESSAGES_KEY,
          JSON.stringify([INITIAL_MESSAGE])
        );

        setMessages([INITIAL_MESSAGE]);
        setInput("");
        setIsTyping(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Generate a temporary AI response.
  const generateResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("resume")) {
      return "Keep your resume focused on measurable achievements, relevant technical skills, and projects. For each project, mention the problem, technologies used, and your contribution.";
    }

    if (
      lowerQuestion.includes("backend") ||
      lowerQuestion.includes("skill")
    ) {
      return "For backend development, focus on Python, FastAPI, REST APIs, SQL, PostgreSQL, authentication, Git, testing, and basic system design. Build projects that demonstrate these skills together.";
    }

    if (lowerQuestion.includes("interview")) {
      return "Prepare by practicing Python fundamentals, SQL queries, REST API concepts, system design basics, and project explanations. You should be able to clearly explain your decisions and trade-offs.";
    }

    if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio")) {
      return "Choose projects that solve practical problems. A strong portfolio can include a REST API, authentication, PostgreSQL integration, deployment, documentation, and a clean frontend.";
    }

    return "That's a good career question. Focus on building practical skills, completing projects, and regularly improving your resume and interview communication.";
  };

  // Send a message.
  const handleSend = (messageText = input) => {
    const text = messageText.trim();

    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: "Just now",
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    // Temporary response delay.
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: generateResponse(text),
        time: "Just now",

        // Replace these demo sources with backend-generated citations later.
        sources: [
          {
            title: "Career Development Resources",
            domain: "career-guide.example.com",
            url: "#",
          },
          {
            title: "Professional Skills Guide",
            domain: "skills.example.com",
            url: "#",
          },
        ],
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);

      setIsTyping(false);
    }, 1200);
  };

  // Submit message using Enter.
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        
        {/* Header */}
        <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
              ✨
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Career Assistant
              </h1>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online
                <span className="text-slate-300">•</span>
                Daily conversation
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
          
          {/* Suggested Questions */}
          {messages.length === 1 && !isTyping && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Suggested questions
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="rounded-xl border border-indigo-100 bg-white px-3 py-3 text-left text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[75%] ${
                  message.sender === "user"
                    ? "items-end"
                    : "items-start"
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.sender === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.text}
                </div>

                {/* Message Time */}
                <p
                  className={`mt-1 px-1 text-[11px] text-slate-400 ${
                    message.sender === "user"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {message.time}
                </p>

                {/* Citation Cards */}
                {message.sender === "ai" &&
                  message.sources &&
                  message.sources.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-slate-500">
                        Sources
                      </p>

                      {message.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:bg-indigo-50"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm">
                            🔗
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {source.title}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {source.domain}
                            </p>
                          </div>

                          <span className="text-slate-400">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your career..."
              rows={1}
              className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-slate-400">
            Your conversation automatically refreshes each day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CareerAssistant;