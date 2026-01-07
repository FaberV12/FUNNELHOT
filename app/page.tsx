"use client";

import { useState, useEffect } from "react";
import { Assistant } from "@/types/assistant";
import { AssistantFormData } from "@/types/assistant";
import {
  getAssistants,
  createAssistant,
  updateAssistant,
  deleteAssistant,
} from "@/lib/storage";
import AssistantCard from "@/components/AssistantCard";
import Modal from "@/components/Modal";
import AssistantForm from "@/components/AssistantForm";
import Button from "@/components/Button";

export default function Home() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAssistants();
  }, []);

  const loadAssistants = () => {
    setIsLoading(true);
    try {
      const data = getAssistants();
      setAssistants(data);
    } catch (error) {
      console.error("Error loading assistants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAssistant(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assistant: Assistant) => {
    setEditingAssistant(assistant);
    setIsModalOpen(true);
  };

  const handleSave = (formData: AssistantFormData) => {
    try {
      // Validar que los campos requeridos no estén vacíos
      if (!formData.language || !formData.tone) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      // Convertir a tipo Assistant (sin string vacío)
      const assistantData = {
        ...formData,
        language: formData.language as "Español" | "Inglés" | "Portugués",
        tone: formData.tone as "Formal" | "Casual" | "Profesional" | "Amigable",
      };

      if (editingAssistant) {
        updateAssistant(editingAssistant.id, assistantData);
      } else {
        createAssistant(assistantData);
      }
      loadAssistants();
      setIsModalOpen(false);
      setEditingAssistant(null);
    } catch (error) {
      console.error("Error saving assistant:", error);
      alert("Error al guardar el asistente. Por favor, intenta nuevamente.");
    }
  };

  const handleDelete = (id: string) => {
    try {
      if (deleteAssistant(id)) {
        loadAssistants();
      } else {
        alert("Error al eliminar el asistente.");
      }
    } catch (error) {
      console.error("Error deleting assistant:", error);
      alert("Error al eliminar el asistente.");
    }
  };

  return (
    <div className="min-h-screen bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Gestión de Asistentes IA
              </h1>
              <p className="mt-2 text-gray-300">
                Administra y entrena tus asistentes de inteligencia artificial
              </p>
            </div>
            <Button onClick={handleCreate}>Crear Asistente</Button>
          </div>
        </div>

        {/* Listado de asistentes */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : assistants.length === 0 ? (
          <div className="text-center py-16 bg-dark-50 rounded-lg shadow-lg border border-primary-800/30">
            <svg
              className="mx-auto h-12 w-12 text-primary-400"
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
            <h3 className="mt-4 text-lg font-medium text-white">
              No hay asistentes
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Comienza creando tu primer asistente de IA
            </p>
            <div className="mt-6">
              <Button onClick={handleCreate}>Crear Asistente</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {assistants.map((assistant) => (
              <div key={assistant.id} className="w-full max-w-sm">
                <AssistantCard
                  assistant={assistant}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* Modal de creación/edición */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAssistant(null);
          }}
          title={editingAssistant ? "Editar Asistente" : "Crear Asistente"}
        >
          <AssistantForm
            assistant={editingAssistant}
            onSave={handleSave}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingAssistant(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
}
