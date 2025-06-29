import React from "react"
import Login from "./Login"
import useLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import { ContactsProvider } from "../contexts/ContactsProvider"
import { ConversationsProvider } from "../contexts/ConversationsProvider"
import { SocketProvider } from "../contexts/SocketProvider"

function App() {
  const [id, setId] = useLocalStorage("id")

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return <div className="h-screen bg-gray-50">{id ? dashboard : <Login onIdSubmit={setId} />}</div>
}

export default App
