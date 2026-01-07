import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-dark-50 rounded-lg shadow-lg p-8 border border-primary-800/30 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-300 mb-6">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}

