import React from 'react'
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts } = useContacts()

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No contacts yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Add contacts to start conversations
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {contacts.map(contact => (
        <div key={contact.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {contact.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {contact.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                ID: {contact.id}
              </p>
            </div>
            
            {/* Online status (placeholder for future feature) */}
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
          </div>
        </div>
      ))}
    </div>
  )
}