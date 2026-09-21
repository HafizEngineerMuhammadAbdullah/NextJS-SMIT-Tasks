import React from 'react'
import { SiGooglegemini } from "react-icons/si";
import { SiClaude } from "react-icons/si";


const ChatArea = ({ messages, loading, sendMessage, messageEndRef }) => {
  return (
        // ChatArea component displaying either a welcome message with suggestions or the chat messages and input field
        <div className="chat-area">

          {messages.length === 0 ? (

            <div className="welcome">

              <div className="welcome-icon">
                {/* ✦ */}
                {/* <SiGooglegemini /> */}
                {/* <SiClaude color="#4CAF50" /> */}
                <SiClaude color="brown" />
              </div>

              <h1>
                What can I help you build?
              </h1>

              <p>
                Describe your idea and let AI help
                you turn it into reality.
              </p>

              <div className="suggestions">

                <button
                  onClick={() =>
                    sendMessage(
                      "Build a modern agriculture dashboard"
                    )
                  }
                >
                  <span>🌱</span>
                  Agriculture dashboard
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Build an AI interview platform"
                    )
                  }
                >
                  <span>🤖</span>
                  AI interview platform
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Build a modern e-commerce website"
                    )
                  }
                >
                  <span>🛒</span>
                  E-commerce website
                </button>

                <button
                  onClick={() =>
                    sendMessage(
                      "Create a SaaS landing page"
                    )
                  }
                >
                  <span>🚀</span>
                  SaaS landing page
                </button>

              </div>

            </div>

          ) : (

            <div className="messages">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`message-row ${message.role
                    }`}
                >

                  <div
                    className={`message-avatar ${message.role
                      }`}
                  >
                    {message.role === "user"
                      ? "U"
                      : "✦"}
                  </div>

                  <div className="message-content">

                    <div className="message-name">
                      {message.role === "user"
                        ? "You"
                        : "SaylaniGPT"}
                    </div>

                    <div className="message-text">
                      {message.content}
                    </div>

                  </div>

                </div>

              ))}

              {loading && (

                <div className="message-row assistant">

                  <div className="message-avatar assistant">
                    ✦
                  </div>

                  <div className="message-content">

                    <div className="message-name">
                      SaylaniGPT
                    </div>

                    <div className="typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>

                </div>

              )}

              <div ref={messageEndRef} />

            </div>

          )}

        </div>

  )
}

export default ChatArea
