import { Instrument_Sans, Average_Sans, Plus_Jakarta_Sans } from "next/font/google"
import Header from "@/components/Header"
import "./globals.css"
import { AuthProvider } from "@/src/contexts/AuthContext"
import { CartProvider } from "@/src/contexts/CartContext"
import { AppProvider } from "@/src/contexts/AppContext"

// Load fonts
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
})

const averageSans = Average_Sans({
  subsets: ["latin"],
  weight: ["400"], // Check available weights
  variable: "--font-average",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plusjakarta",
})

export const metadata = {
  title: "Bishop Pharmacy",
  description: "Best pharmacy in the world, located at the heart of Bishop's Waltham",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`!scroll-smooth ${instrumentSans.variable} ${averageSans.variable} ${plusJakarta.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <AppProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  )
}
