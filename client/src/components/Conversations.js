import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversations yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Start a new conversation to begin messaging
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation, index) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1]
        const recipients = conversation.recipients.map(r => r.name).join(', ')
        
        return (
          <div
            key={index}
            onClick={() => selectConversationIndex(index)}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
              conversation.selected ? 'bg-green-50 dark:bg-green-900/20 border-r-2 border-green-500' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-lg">
                  {recipients.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {recipients}
                  </h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                
                {lastMessage ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {lastMessage.fromMe ? 'You: ' : `${lastMessage.senderName}: `}
                    {lastMessage.text}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-500 italic mt-1">
                    No messages yet
                  </p>
                )}
              </div>
              
              {/* Unread indicator (placeholder for future feature) */}
              {conversation.selected && (
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}