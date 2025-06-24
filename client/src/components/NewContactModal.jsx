"use client"
import React from "react"
import { useRef } from "react"
import { X, User } from "lucide-react"
import { useContacts } from "../contexts/ContactsProvider"

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
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Add New Contact</h2>
        </div>
        <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-id" className="block text-sm font-medium text-gray-700 mb-2">
              Contact ID
            </label>
            <input
              id="contact-id"
              type="text"
              ref={idRef}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter contact's ID"
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              id="contact-name"
              type="text"
              ref={nameRef}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter display name"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
