import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sah Tracker",
  description: "Trip finance tracker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fontSans.variable} antialiased`}
    >
      <body className="pb-8">
        {children}
        <Toaster
          position="top-center"
          duration={3000}
          toastOptions={{
            className: "!rounded-xl !px-4 !py-3 !shadow-none !border",
            classNames: {
              success:
                "!bg-success-bg !border-success/20 !text-success !shadow-none",
              error: "!bg-danger-bg !border-danger/20 !text-danger !shadow-none",
            },
          }}
        />
      </body>
    </html>
  );
}
