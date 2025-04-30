import '../styles/globals.css'

export const metadata = {
  title: 'Weather App',
  description: 'Powered by OpenWeatherMap API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
