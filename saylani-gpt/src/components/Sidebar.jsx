import React from 'react'
import { SiGooglegemini } from "react-icons/si";


const Sidebar = ({ messages, newChat, sidebarOpen }) => {


    return (
        //   Sidebar component with a top section containing the brand and new chat button, a middle section displaying recent messages, and a bottom section with settings and help links
        <aside
            className={`sidebar ${sidebarOpen ? "" : "sidebar-collapsed"}`}
        >
            {/* Top of Sidebar */}
            <div className="sidebar-top">
                <div className="brand">
                    {/* SaylaniGPT Logo */}
                    <div className="brand-logo">
                        {/* ✦ */}
                        <SiGooglegemini />
                    </div>
                    {/* SaylaniGPT Text */}
                    <span>SaylaniGPT</span>
                </div>

                {/* New Chat Button */}
                <button
                    className="new-chat"
                    onClick={newChat}
                >
                    <span>＋</span>
                    New chat
                </button>
            </div>

            {/* Sidebar Section */}
            <section className="sidebar-middle">
                {/* Sidebar Label */}
                <div className="sidebar-label">
                    Recent
                </div>

                {messages.length > 0 ? (
                    <div className="history-item">
                        {messages[0]?.content?.slice(0, 35)}
                        {messages[0]?.content?.length > 35 ? "..." : ""}
                    </div>
                ) : (
                    <div className="empty-history">
                        Your conversations will appear here.
                    </div>
                )}
            </section>

            {/* Bottom of Sidebar */}
            <div className="sidebar-bottom">

                <div className="sidebar-link">
                    <p>⚙</p>
                    <span>Settings</span>
                </div>

                <div className="sidebar-link">
                    <p>?</p>
                    <span>Help</span>
                </div>

            </div>
        </aside>

    )
}

export default Sidebar
