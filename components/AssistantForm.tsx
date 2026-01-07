"use client";

import { useState, useEffect } from "react";
import { Assistant, AssistantFormData, FormErrors } from "@/types/assistant";
import Button from "./Button";

interface AssistantFormProps {
  assistant?: Assistant | null;
  onSave: (data: AssistantFormData) => void;
  onCancel: () => void;
}

export default function AssistantForm({
  assistant,
  onSave,
  onCancel,
}: AssistantFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssistantFormData>({
    name: assistant?.name || "",
    language: assistant?.language || "",
    tone: assistant?.tone || "",
    responseLength: assistant?.responseLength || { short: 0, medium: 0, long: 0 },
    audioEnabled: assistant?.audioEnabled || false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (assistant) {
      setFormData({
        name: assistant.name,
        language: assistant.language,
        tone: assistant.tone,
        responseLength: assistant.responseLength,
        audioEnabled: assistant.audioEnabled,
      });
    }
  }, [assistant]);

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.language) {
      newErrors.language = "Debes seleccionar un idioma";
    }

    if (!formData.tone) {
      newErrors.tone = "Debes seleccionar un tono";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    const total =
      formData.responseLength.short +
      formData.responseLength.medium +
      formData.responseLength.long;

    if (total !== 100) {
      newErrors.responseLength = "La suma de las longitudes debe ser 100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    } else {
      alert("Por favor, completa todos los campos requeridos correctamente.");
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      onSave(formData);
    } else {
      alert("La suma de las longitudes de respuesta debe ser 100%");
    }
  };

  const updateResponseLength = (
    type: "short" | "medium" | "long",
    value: number
  ) => {
    const numValue = Math.max(0, Math.min(100, value));
    setFormData({
      ...formData,
      responseLength: {
        ...formData.responseLength,
        [type]: numValue,
      },
    });
  };

  const totalPercentage =
    formData.responseLength.short +
    formData.responseLength.medium +
    formData.responseLength.long;

  return (
    <div className="space-y-6">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
            step >= 1
              ? "bg-primary-600 text-white"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 w-20 transition-colors ${
            step >= 2 ? "bg-primary-600" : "bg-gray-700"
          }`}
        />
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
            step >= 2
              ? "bg-primary-600 text-white"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          2
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Datos Básicos
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nombre del asistente <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 bg-dark-100 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Ej: Asistente de Ventas"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Idioma <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  language: e.target.value as AssistantFormData["language"],
                })
              }
              className={`w-full px-4 py-2 bg-dark-100 border rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.language ? "border-red-500" : "border-gray-600"
              }`}
            >
              <option value="" className="bg-dark-100">Selecciona un idioma</option>
              <option value="Español" className="bg-dark-100">Español</option>
              <option value="Inglés" className="bg-dark-100">Inglés</option>
              <option value="Portugués" className="bg-dark-100">Portugués</option>
            </select>
            {errors.language && (
              <p className="mt-1 text-sm text-red-400">{errors.language}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tono <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.tone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tone: e.target.value as AssistantFormData["tone"],
                })
              }
              className={`w-full px-4 py-2 bg-dark-100 border rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.tone ? "border-red-500" : "border-gray-600"
              }`}
            >
              <option value="" className="bg-dark-100">Selecciona un tono</option>
              <option value="Formal" className="bg-dark-100">Formal</option>
              <option value="Casual" className="bg-dark-100">Casual</option>
              <option value="Profesional" className="bg-dark-100">Profesional</option>
              <option value="Amigable" className="bg-dark-100">Amigable</option>
            </select>
            {errors.tone && (
              <p className="mt-1 text-sm text-red-400">{errors.tone}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext}>Siguiente</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Configuración de Respuestas
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Longitud de respuestas <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-4">
                La suma debe ser 100%
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300">Cortas (%)</label>
                    <span className="text-sm font-medium text-white">
                      {formData.responseLength.short}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.short}
                    onChange={(e) =>
                      updateResponseLength("short", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300">Medianas (%)</label>
                    <span className="text-sm font-medium text-white">
                      {formData.responseLength.medium}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.medium}
                    onChange={(e) =>
                      updateResponseLength("medium", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-300">Largas (%)</label>
                    <span className="text-sm font-medium text-white">
                      {formData.responseLength.long}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.long}
                    onChange={(e) =>
                      updateResponseLength("long", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-dark-100 rounded-lg border border-primary-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">
                    Total:
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      totalPercentage === 100
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {totalPercentage}%
                  </span>
                </div>
              </div>

              {errors.responseLength && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.responseLength}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="audioEnabled"
                checked={formData.audioEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, audioEnabled: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 border-gray-600 rounded focus:ring-primary-500 bg-dark-100"
              />
              <label
                htmlFor="audioEnabled"
                className="text-sm text-gray-300 cursor-pointer"
              >
                Habilitar respuestas de audio
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
