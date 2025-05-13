"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create the App Context
const AppContext = createContext(undefined)

// App Provider component
export function AppProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  // Initialize notifications from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem("pharmacy_notifications")
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications))
      } catch (error) {
        console.error("Failed to parse notifications:", error)
        localStorage.removeItem("pharmacy_notifications")
      }
    }
    setLoading(false)
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("pharmacy_notifications", JSON.stringify(notifications))
    }
  }, [notifications, loading])

  // Add notification
  const addNotification = (notification) => {
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      timestamp: new Date().toISOString(),
      read: false,
      ...notification 
    }])
  }

  // Mark notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    )
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  const value = {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    loading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
} 