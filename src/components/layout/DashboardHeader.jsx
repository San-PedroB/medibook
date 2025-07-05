// src/components/layout/DashboardHeader.jsx
import React from "react";
import { motion } from "framer-motion";

// Variantes de animación para el header
const headerVariants = {
  hidden:   { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * DashboardHeader es un componente genérico que puede mostrar:
 * - Un título fijo (title) o el greeting + name.
 * - Un subtítulo fijo (subtitle) o el subText + companyName.
 *
 * Props:
 * - title?: string
 * - subtitle?: string
 * - greeting?: string (por defecto "Bienvenido")
 * - name?: string
 * - subText?: string (por defecto "Panel de administración de:")
 * - companyName?: string
 */
export default function DashboardHeader({
  title,
  subtitle,
  greeting = "Bienvenido",
  name,
  subText = "Panel de administración de:",
  companyName,
}) {
  return (
    <motion.div
      className="bg-primary text-white p-4 rounded-4 shadow-sm mb-5 mt-4 text-center"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="mb-2">
        {title ?? (
          <>
            {greeting},{" "}
            <span className="text-primary fw-semibold">{name}</span>
          </>
        )}
      </h2>
      <p className="text-white">
        {subtitle ?? (
          <>
            {subText} <strong>{companyName}</strong>
          </>
        )}
      </p>
    </motion.div>
  );
}
