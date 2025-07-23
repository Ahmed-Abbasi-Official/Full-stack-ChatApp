'use client'

import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  userId: string | null
  login: (userId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null)

  const login = (id: string) => {
    setUserId(id)
    localStorage.setItem('userId', id)
  }

  const logout = () => {
    setUserId(null)
    localStorage.removeItem('userId')
  }

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthContext missing')
  return ctx
}
