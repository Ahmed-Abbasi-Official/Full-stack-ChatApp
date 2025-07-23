'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userId', username)
    router.push('/chat')
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}
