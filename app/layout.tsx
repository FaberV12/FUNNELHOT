import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Funnelhot - Gestión de Asistentes IA",
  description: "Sistema de gestión de asistentes de IA para automatizar interacciones con leads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
