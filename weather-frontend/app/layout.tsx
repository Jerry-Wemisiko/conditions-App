import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "A weather app built with Next.js and Laravel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-geist-mono">{children}</body>
    </html>
  );
}