import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies library",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider>
          <NavBar />
          <main className="flex min-h-screen min-w-screen bg-slate-500">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
