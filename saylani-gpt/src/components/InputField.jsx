import React from 'react'

const InputField = ({ input, loading, textareaRef, handleInputChange, handleKeyDown, sendMessage}) => {
    return (
        // InputField component with a textarea for user input, attach and search buttons, and a send button
        <div className="input-container">
            <div className="input-box">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything or describe what you want to build..."
                    rows={1}
                />
                <div className="input-bottom">
                    <div className="input-tools">

                        <button title="Attach">
                            ＋
                        </button>

                        <button title="Search">
                            ◉
                        </button>

                    </div>
                    <div className="input-actions">
                        <span className="shortcut">
                            Enter ↵
                        </span>
                        <button
                            className="send-button"
                            onClick={() => sendMessage()}
                            disabled={
                                loading ||
                                !input.trim()
                            }
                        >
                            ↑
                        </button>
                    </div>
                </div>

            </div>
            <div className="disclaimer">
                SaylaniGPT can make mistakes. Check important
                information.
            </div>

        </div>
    )
}

export default InputField
