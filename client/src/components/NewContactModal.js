import React, { useRef } from 'react'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  function handleSubmit(e) {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Contact</h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        >
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contact-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact ID
            </label>
            <input
              id="contact-id"
              type="text"
              ref={idRef}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter contact's unique ID"
            />
          </div>
          
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Name
            </label>
            <input
              id="contact-name"
              type="text"
              ref={nameRef}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter display name"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </>
  )
}