import React, { useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const Chatboat = () => {
  useEffect(() => {
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "w87DIeuD8N2gKyytzCr7N"; // ✅ use your Chatbase bot ID here
        script.domain = "www.chatbase.co";
        script.setAttribute("defer", "true");

        // Hide Chatbase default floating button (optional)
        script.setAttribute("data-hide-chat-button", "true");

        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
  }, []);

  // Custom button to trigger Chatbase chat
  const openChat = () => {
    if (window.chatbase) {
      window.chatbase("openChat");
    }
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
      <button
        onClick={openChat}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg shadow-lg flex items-center"
      >
        <FaRobot className="mr-2" size={24} />
        <span className="hidden md:inline">Chatbot</span>
      </button>
    </div>
  );
};

export default Chatboat;
