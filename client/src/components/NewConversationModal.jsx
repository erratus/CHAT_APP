"use client"
import React from "react"

import { useState } from "react"
import { X, MessageSquare, Check } from "lucide-react"
import { useContacts } from "../contexts/ContactsProvider"
import { useConversations } from "../contexts/ConversationsProvider"

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelected) =>
      prevSelected.includes(contactId) ? prevSelected.filter((id) => id !== contactId) : [...prevSelected, contactId],
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (selectedContactIds.length > 0) {
      createConversation(selectedContactIds)
      closeModal()
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">New Conversation</h2>
        </div>
        <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No contacts available</p>
            ) : (
              contacts.map((contact) => (
                <label
                  key={contact.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedContactIds.includes(contact.id)}
                      onChange={() => handleCheckboxChange(contact.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors duration-200 ${
                        selectedContactIds.includes(contact.id) ? "bg-green-500 border-green-500" : "border-gray-300"
                      }`}
                    >
                      {selectedContactIds.includes(contact.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>

                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-xs">{contact.name.charAt(0).toUpperCase()}</span>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500 font-mono">{contact.id.slice(0, 8)}...</p>
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedContactIds.length === 0}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
            >
              Start Chat ({selectedContactIds.length})
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
