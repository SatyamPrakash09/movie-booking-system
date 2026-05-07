import { Outlet } from "react-router-dom";
import React from 'react'
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
        <Header/>
        <Outlet/>
      </div>
    </ThemeProvider>
  )
}
