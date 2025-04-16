import { Inter, Instrument_Sans, Average_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import Header from "@/components/Header";
import "./globals.css";

// Load fonts
const instrumentSans = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument'
});

const averageSans = Average_Sans({
    subsets: ['latin'],
    weight: ['400'], // Check available weights
    variable: '--font-average'
});


const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-plusjakarta'
});


export const metadata = {
    title: "Bishop Pharmacy",
    description: "Bishop Pharmacy",
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" className={`!scroll-smooth ${instrumentSans.variable} ${averageSans.variable} ${plusJakarta.variable}`}>
            <body >
                <Header />
                {children}
            </body>
        </html>
    );
}