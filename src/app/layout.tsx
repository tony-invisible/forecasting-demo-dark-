import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forecasting 2.0 Demo',
  description: 'Interactive forecasting demo for Neuron',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}


