"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Assistant } from "@/types/assistant";
import { getAssistantById, updateAssistant } from "@/lib/storage";
import { getRandomResponse } from "@/lib/chat-responses";
import Button from "@/components/Button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}


export default function TrainingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [rules, setRules] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Asegurar que solo se ejecute en el cliente
    if (typeof window === "undefined") return;

    const assistantData = getAssistantById(id);
    if (!assistantData) {
      router.push("/");
      return;
    }
    setAssistant(assistantData);
    setRules(assistantData.rules || "");

    // Cargar mensajes del localStorage si existen
    try {
      const savedMessages = localStorage.getItem(`chat_${id}`);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }

    // Verificar soporte de síntesis de voz
    try {
      if ("speechSynthesis" in window) {
        setSynthesisSupported(true);
        synthesisRef.current = window.speechSynthesis;
      }
    } catch (error) {
      console.error("Error inicializando síntesis de voz:", error);
    }
  }, [id, router]);

  const handleSaveRules = async () => {
    if (!assistant) return;

    setIsSaving(true);
    try {
      // Simular delay de guardado
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updated = updateAssistant(id, { rules });
      if (updated) {
        setAssistant(updated);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving rules:", error);
      alert("Error al guardar el entrenamiento.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping || !assistant) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    // Guardar mensajes en localStorage
    const updatedMessages = [...messages, userMessage];
    try {
      localStorage.setItem(`chat_${id}`, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error guardando mensajes:", error);
    }

    // Simular respuesta del asistente con delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const responseText = getRandomResponse();
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);

    // Guardar mensajes actualizados
    const finalMessages = [...updatedMessages, assistantMessage];
    try {
      localStorage.setItem(`chat_${id}`, JSON.stringify(finalMessages));
    } catch (error) {
      console.error("Error guardando mensajes:", error);
    }

    // Reproducir respuesta en voz si está habilitado
    if (assistant.audioEnabled && synthesisSupported && synthesisRef.current && typeof window !== "undefined") {
      try {
        // Cancelar cualquier síntesis anterior
        synthesisRef.current.cancel();
        
        const utterance = new SpeechSynthesisUtterance(responseText);
        
        // Mapear idiomas para síntesis
        const languageMap: Record<string, string> = {
          "Español": "es-ES",
          "Inglés": "en-US",
          "Portugués": "pt-BR",
        };
        
        utterance.lang = languageMap[assistant.language] || "es-ES";
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onerror = (event) => {
          console.error("Error en síntesis de voz:", event);
        };
        
        synthesisRef.current.speak(utterance);
      } catch (error) {
        console.error("Error al reproducir voz:", error);
      }
    }
  };

  const handleResetChat = () => {
    if (confirm("¿Estás seguro de que deseas reiniciar la conversación?")) {
      setMessages([]);
      localStorage.removeItem(`chat_${id}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!assistant) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con información del asistente */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="mb-4 text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al listado
          </button>

          <div className="bg-dark-50 rounded-lg shadow-lg p-6 border border-primary-800/30">
            <h1 className="text-2xl font-bold text-white mb-2">
              {assistant.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <div>
                <span className="font-medium">Idioma:</span> {assistant.language}
              </div>
              <div>
                <span className="font-medium">Tono:</span>{" "}
                <span className="px-2 py-1 bg-primary-600/30 text-primary-300 border border-primary-500/50 rounded-full">
                  {assistant.tone}
                </span>
              </div>
              {assistant.audioEnabled && (
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Audio habilitado</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Entrenamiento */}
        <div className="bg-dark-50 rounded-lg shadow-lg p-6 border border-primary-800/30 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Entrenamiento
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prompts / Instrucciones
              </label>
              <textarea
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Escribe las instrucciones y reglas para el asistente..."
              />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleSaveRules} isLoading={isSaving}>
                Guardar
              </Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Entrenamiento guardado exitosamente
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Chat Simulado */}
        <div className="bg-dark-50 rounded-lg shadow-lg border border-primary-800/30 flex flex-col h-[600px]">
          <div className="p-4 border-b border-primary-800/30 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Chat Simulado
            </h2>
            <Button variant="ghost" onClick={handleResetChat}>
              Reiniciar conversación
            </Button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-100">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p>Inicia una conversación con el asistente</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-dark-50 text-gray-200 border border-primary-800/30"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-primary-200"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-dark-50 text-gray-200 border border-primary-800/30 rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input de mensaje */}
          <div className="p-4 border-t border-primary-800/30">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                rows={2}
                className="flex-1 px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="self-end"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
