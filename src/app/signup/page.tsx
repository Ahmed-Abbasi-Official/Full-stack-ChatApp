'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Signup() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userId', username)
    router.push('/chat')
  }

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
