import React from "react"
import Sidebar from "./Sidebar"
import OpenConversation from "./OpenConversation"
import { useConversations } from "../contexts/ConversationsProvider"
import { ChatCircle } from "phosphor-react"

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()

  return (
    <div className="h-screen flex bg-white">
      <Sidebar id={id} />
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <OpenConversation />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatCircle className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
