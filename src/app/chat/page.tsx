'use client'

import { useEffect, useState } from 'react'
import socket from '../../../lib/socket'

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null

  useEffect(() => {
  if (!userId) {
    alert("plaeas login")
  };

  socket.connect();
  socket.emit('event:register', { userId });

  const handleMessage = (data:any) => {
    // console.log(data)
    const { message, from } = data;
    console.log('Received:', data);
    setMessages((prev) => [...prev, `From ${from}: ${message}`]);
  };

  socket.on('message', handleMessage);

  return () => {
    socket.off('message', handleMessage); // cleanup
    socket.disconnect();
  };
}, [userId]);


  const handleSend = () => {
    if (input && receiverId) {
      socket.emit('event:message', {
        toUserId: receiverId,
        message: input,
      })
      setMessages((prev) => [...prev, `You to ${receiverId}: ${input}`])
      setInput('')
    }
  }

  return (
    <div>
      <h1>Welcome, {userId}</h1>
      <input
        placeholder="To User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <input
        placeholder="Message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
