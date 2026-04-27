import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginAPI, registerAPI } from '../services/authAPI'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      // Verify token on app load
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      setUser(userData)
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const response = await loginAPI.login(credentials)
      const { token, user: userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(token)
      setUser(userData)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
      return { success: false, error: error.response?.data }
    }
  }

  const register = async (userData) => {
    try {
      const response = await registerAPI.register(userData)
      toast.success('Registration successful! Please login.')
      return { success: true, user: response.data }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
      return { success: false, error: error.response?.data }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    toast.success('Logged out successfully!')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ADMIN'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}