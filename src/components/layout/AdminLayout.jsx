// src/components/layout/AdminLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdminSidebar from "./AdminSidebar";
import AnimatedBackground from "../animatedbackground/AnimatedBackground";

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="d-flex flex-column flex-grow-1" style={{ minHeight: "100vh" }}>
        <Navbar />
        <AnimatedBackground />

        {/* Esto es lo importante: main crece, footer siempre al fondo */}
        <main className="flex-grow-1 d-flex flex-column">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
