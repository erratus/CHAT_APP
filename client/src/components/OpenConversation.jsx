"use client"
import React from "react"

import { useState, useCallback } from "react"
import { Send, MoreVertical } from "lucide-react"
import { useConversations } from "../contexts/ConversationsProvider"

export default function OpenConversation() {
  const [text, setText] = useState("")
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim()) {
      sendMessage(
        selectedConversation.recipients.map((r) => r.id),
        text,
      )
      setText("")
    }
  }

  const recipients = selectedConversation.recipients.map((r) => r.name).join(", ")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{recipients.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{recipients}</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="space-y-4">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs lg:max-w-md ${message.fromMe ? "order-2" : "order-1"}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.fromMe
                        ? "bg-green-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className={`mt-1 text-xs text-gray-500 ${message.fromMe ? "text-right" : "text-left"}`}>
                    <span>{message.fromMe ? "You" : message.senderName}</span>
                    <span className="ml-2">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
              rows="1"
              style={{ minHeight: "44px", maxHeight: "120px" }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors duration-200 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
