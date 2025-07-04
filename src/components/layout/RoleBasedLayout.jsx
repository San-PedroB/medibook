// src/components/layout/RoleBasedLayout.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";
import AgentLayout from "./AgentLayout";

export default function RoleBasedLayout({ children }) {
  const { user } = useAuth();

  if (!user || !user.role) {
    return null; // O puedes renderizar un loader o mensaje de error
  }

  if (user.role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (user.role === "agent") {
    return <AgentLayout>{children}</AgentLayout>;
  }

  return null;
}
