'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (userId) {
      router.push('/chat') // If user already logged in
    }
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Private Chat App</h1>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => router.push('/signup')}
        >
          Signup
        </button>
      </div>
    </main>
  )
}
