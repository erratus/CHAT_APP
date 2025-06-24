"use client"
import React from "react"

import { useState } from "react"
import { MessageSquare, Users, Plus, Copy } from "lucide-react"
import Conversations from "./Conversations"
import Contacts from "./Contacts"
import NewContactModal from "./NewContactModal"
import NewConversationModal from "./NewConversationModal"

const CONVERSATIONS_KEY = "conversations"
const CONTACTS_KEY = "contacts"

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = activeKey === CONVERSATIONS_KEY

  function closeModal() {
    setModalOpen(false)
  }

  function copyId() {
    navigator.clipboard.writeText(id)
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">ChatApp</h1>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveKey(CONVERSATIONS_KEY)}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeKey === CONVERSATIONS_KEY ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chats
          </button>
          <button
            onClick={() => setActiveKey(CONTACTS_KEY)}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeKey === CONTACTS_KEY ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Contacts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">{activeKey === CONVERSATIONS_KEY ? <Conversations /> : <Contacts />}</div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">Your ID:</span>
          <button
            onClick={copyId}
            className="flex items-center text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <span className="font-mono mr-1">{id.slice(0, 8)}...</span>
            <Copy className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New {conversationsOpen ? "Chat" : "Contact"}
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            {conversationsOpen ? (
              <NewConversationModal closeModal={closeModal} />
            ) : (
              <NewContactModal closeModal={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
