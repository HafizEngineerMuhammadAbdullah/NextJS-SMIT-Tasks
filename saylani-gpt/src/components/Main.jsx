import React from 'react'
import Header from './Header'
import ChatArea from './ChatArea'
import InputField from './InputField'

const Main = ({ messages,  messageEndRef, input, textareaRef, loading, sidebarOpen ,setSidebarOpen, handleKeyDown, handleInputChange, sendMessage }) => {
  return (
     // Main component containing the Header and chat area with messages and input field
      <main className="main">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <ChatArea messages={messages} messageEndRef={messageEndRef} loading={loading} sendMessage={sendMessage} />

        <InputField input={input} loading={loading} textareaRef={textareaRef} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}
        sendMessage={sendMessage} />
      </main>
  )
}

export default Main
