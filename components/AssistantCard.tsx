"use client";

import { Assistant } from "@/types/assistant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onDelete: (id: string) => void;
}

export default function AssistantCard({
  assistant,
  onEdit,
  onDelete,
}: AssistantCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${assistant.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      onDelete(assistant.id);
      // Pequeño delay para feedback visual
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTrain = () => {
    router.push(`/${assistant.id}`);
  };

  return (
    <div
      className={`bg-dark-50 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-200 p-6 border border-primary-800/30 ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {assistant.name}
          </h3>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="font-medium">Idioma:</span>
              <span>{assistant.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Tono:</span>
              <span className="px-2 py-1 bg-primary-600/30 text-primary-300 border border-primary-500/50 rounded-full text-xs">
                {assistant.tone}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-white hover:bg-primary-900/30 rounded-lg transition-colors"
            aria-label="Menú de acciones"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-dark-50 rounded-lg shadow-xl border border-primary-800/30 z-20 py-1">
                <button
                  onClick={() => {
                    onEdit(assistant);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-primary-900/30 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Editar
                </button>
                <button
                  onClick={handleTrain}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-primary-900/30 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Entrenar
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
