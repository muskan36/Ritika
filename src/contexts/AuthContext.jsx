"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create the Auth Context
const AuthContext = createContext(undefined)

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user data from localStorage
  const loadUserFromStorage = () => {
    if (typeof window === 'undefined') return null;
    
    const storedUser = localStorage.getItem("pharmacy_user")
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Ensure we have all required user data
        if (parsedUser && parsedUser.id && parsedUser.name && parsedUser.mobile) {
          return parsedUser
        } else {
          console.error("Invalid user data in localStorage")
          localStorage.removeItem("pharmacy_user")
        }
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("pharmacy_user")
      }
    }
    return null
  }

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const userData = loadUserFromStorage()
    if (userData) {
      setUser(userData)
    }
    
    setLoading(false)

    // Add storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "pharmacy_user" || e.key === null) {
        const updatedUserData = loadUserFromStorage()
        if (updatedUserData) {
          console.log("Auth context updated from storage event", updatedUserData)
          setUser(updatedUserData)
        } else if (e.key === "pharmacy_user") {
          // Only clear if the pharmacy_user key was specifically changed/removed
          setUser(null)
        }
      }
    }

    // Also handle the custom event for direct component communication
    const handleStorageEvent = () => {
      const updatedUserData = loadUserFromStorage()
      if (updatedUserData) {
        console.log("Auth context updated from custom event", updatedUserData)
        setUser(updatedUserData)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('storage', handleStorageEvent)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      // Ensure we're storing all required user data
      const userDataToStore = {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        clientID: user.clientID,
        userID: user.userID,
        createdAt: user.createdAt || new Date().toISOString()
      }
      localStorage.setItem("pharmacy_user", JSON.stringify(userDataToStore))
    }
  }, [user])

  // Login function
  const login = (userData) => {
    // Ensure we have all required user data
    if (!userData.id || !userData.name || !userData.mobile) {
      console.error("Missing required user data for login")
      return false
    }

    setUser(userData)
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("pharmacy_user")
    localStorage.removeItem("vaccineCart") // Clear cart data on logout
  }

  // Register function
  const register = (userData) => {
    // Ensure we have all required user data
    if (!userData.name || !userData.mobile) {
      console.error("Missing required user data for registration")
      return { success: false, message: "Missing required user data" }
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      mobile: userData.mobile,
      clientID: userData.clientID,
      userID: userData.userID,
      createdAt: new Date().toISOString()
    }
    
    setUser(newUser)
    return { success: true, user: newUser }
  }

  // Update user profile
  const updateProfile = (updatedData) => {
    if (!user) return { success: false, message: "User not authenticated" }
    
    const updatedUser = { 
      ...user, 
      ...updatedData,
      // Ensure we don't lose any critical user data
      id: user.id,
      name: updatedData.name || user.name,
      mobile: updatedData.mobile || user.mobile,
      clientID: updatedData.clientID || user.clientID,
      userID: updatedData.userID || user.userID
    }
    
    setUser(updatedUser)
    return { success: true, user: updatedUser }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 