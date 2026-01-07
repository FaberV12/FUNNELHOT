import { Assistant } from "@/types/assistant";

const STORAGE_KEY = "funnelhot_assistants";

// Datos de ejemplo iniciales
const initialData: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: {
      short: 30,
      medium: 50,
      long: 20,
    },
    audioEnabled: true,
    rules: "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos.",
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: {
      short: 20,
      medium: 30,
      long: 50,
    },
    audioEnabled: false,
    rules: "Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar.",
  },
];

export const getAssistants = (): Assistant[] => {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Inicializar con datos de ejemplo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveAssistants = (assistants: Assistant[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
};

export const getAssistantById = (id: string): Assistant | null => {
  const assistants = getAssistants();
  return assistants.find((a) => a.id === id) || null;
};

export const createAssistant = (assistant: Omit<Assistant, "id">): Assistant => {
  const assistants = getAssistants();
  const newAssistant: Assistant = {
    ...assistant,
    id: Date.now().toString(),
  };
  assistants.push(newAssistant);
  saveAssistants(assistants);
  return newAssistant;
};

export const updateAssistant = (id: string, updates: Partial<Assistant>): Assistant | null => {
  const assistants = getAssistants();
  const index = assistants.findIndex((a) => a.id === id);
  
  if (index === -1) return null;
  
  assistants[index] = { ...assistants[index], ...updates };
  saveAssistants(assistants);
  return assistants[index];
};

export const deleteAssistant = (id: string): boolean => {
  const assistants = getAssistants();
  const filtered = assistants.filter((a) => a.id !== id);
  
  if (filtered.length === assistants.length) return false;
  
  saveAssistants(filtered);
  return true;
};
