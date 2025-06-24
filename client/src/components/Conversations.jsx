"use client"
import React from "react"
import { useConversations } from "../contexts/ConversationsProvider"
import { MessageCircle } from "lucide-react"

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <MessageCircle className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-center">No conversations yet</p>
        <p className="text-sm text-center mt-1">Start a new chat to begin messaging</p>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-full">
      {conversations.map((conversation, index) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1]
        const recipients = conversation.recipients.map((r) => r.name).join(", ")

        return (
          <div
            key={index}
            onClick={() => selectConversationIndex(index)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
              conversation.selected ? "bg-green-50 border-r-4 border-r-green-500" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">{recipients.charAt(0).toUpperCase()}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{recipients}</h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </div>

                {lastMessage && (
                  <p className="text-sm text-gray-600 truncate">
                    {lastMessage.fromMe ? "You: " : `${lastMessage.senderName}: `}
                    {lastMessage.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
