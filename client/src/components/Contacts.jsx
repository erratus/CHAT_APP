import { useContacts } from "../contexts/ContactsProvider"
import { User, Users } from "lucide-react"
import React from "react"

export default function Contacts() {
  const { contacts } = useContacts()

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <Users className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-center">No contacts yet</p>
        <p className="text-sm text-center mt-1">Add contacts to start chatting</p>
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-full">
      {contacts.map((contact) => (
        <div key={contact.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{contact.name}</h3>
              <p className="text-xs text-gray-500 font-mono truncate">{contact.id}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
