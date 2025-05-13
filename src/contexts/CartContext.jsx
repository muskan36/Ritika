"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create the Cart Context
const CartContext = createContext(undefined)

// Cart Provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("vaccineCart")
    
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart data:", error)
        localStorage.removeItem("vaccineCart")
      }
    }
    
    setLoading(false)
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("vaccineCart", JSON.stringify(cart))
    }
  }, [cart, loading])

  // Calculate totals based on quantities
  const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
  const tax = subtotal * 0.05
  const grandTotal = subtotal + tax

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.name === product.name)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { 
        ...product, 
        quantity: 1,
        vaccineID: product.vaccineID,
        _original: product._original || product
      }])
    }
  }

  // Remove item from cart
  const removeFromCart = (productName) => {
    setCart(cart.filter((item) => item.name !== productName))
  }

  // Increase item quantity
  const increaseQuantity = (productName) => {
    setCart(cart.map(item =>
      item.name === productName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  }

  // Decrease item quantity
  const decreaseQuantity = (productName) => {
    setCart(cart.map(item =>
      item.name === productName
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1
          }
        : item
    ))
  }

 // Clear cart
const clearCart = () => {
  // Only update state if cart is not already empty
  if (cart.length > 0) {
    setCart([]);
  }
  
  // Always remove from localStorage to ensure consistency
  if (typeof window !== 'undefined') {
    localStorage.removeItem("vaccineCart");
  }
}

  const value = {
    cart,
    loading,
    subtotal,
    tax,
    grandTotal,
    itemCount: cart.reduce((total, item) => total + item.quantity, 0),
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 