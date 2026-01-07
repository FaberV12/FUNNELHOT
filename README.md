Funnelhot - Gestión de Asistentes IA
AUTOR: FABER ALEJANDRO VANEGAS GALLO
Sistema de gestión de asistentes de inteligencia artificial para automatizar interacciones con leads. Desarrollado con Next.js 14, TypeScript y Tailwind CSS.

 INICIO RÁPIDO 
OPCIÓN 1: Método Más Simple (Recomendado para Windows)

1. Asegúrate de tener Node.js instalado (descarga desde https://nodejs.org/)
2. Haz doble clic en el archivo `INICIAR.bat`
3. ¡Listo! El programa se abrirá automáticamente en tu navegador

Para detener el servidor:
- Haz doble clic en `DETENER.bat` o cierra la ventana de comandos

OPCIÓN 2: Método Tradicional

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta: `npm install` (solo la primera vez)
3. Ejecuta: `npm run dev`
4. Abre http://localhost:3000 en tu navegador



 Características Implementadas

Funcionalidades Principales

Página Principal (Listado de Asistentes)
- Visualización de asistentes en formato de tarjetas responsive
- Cada tarjeta muestra: nombre, idioma, tono/personalidad
- Menú de acciones (Editar, Eliminar, Entrenar) con dropdown
- Botón para crear nuevos asistentes
- Estado vacío cuando no hay asistentes
- Diseño responsive para mobile y desktop

Modal de Creación/Edición (2 Pasos)
Paso 1 - Datos Básicos:
  - Nombre del asistente (validación: mínimo 3 caracteres)
  - Idioma (select: Español, Inglés, Portugués)
  - Tono (select: Formal, Casual, Profesional, Amigable)
  - Validación en tiempo real
  - Indicador visual de pasos

Paso 2 - Configuración de Respuestas:
  - Longitud de respuestas con sliders interactivos (Cortas, Medianas, Largas)
  - Validación: suma debe ser exactamente 100%
  - Indicador visual del porcentaje total
  - Checkbox para habilitar respuestas de audio
  - Botones de navegación (Atrás, Guardar)

Página de Entrenamiento
- Información del asistente en la parte superior
- Sección de entrenamiento con área de texto para prompts/instrucciones
- Guardado con feedback visual de éxito
- Persistencia en localStorage
- Chat simulado con:
  - Interfaz de chat moderna y responsive
  - Input para enviar mensajes (soporta Enter para enviar)
  - Respuestas simuladas con delay de 1-2 segundos
  - Indicador de "escribiendo..."
  - Botón para reiniciar conversación
  - Persistencia de mensajes en localStorage

Funcionalidad de Eliminación
- Confirmación antes de eliminar
- Feedback visual durante la eliminación
- Actualización inmediata de la lista

Características Técnicas

-  Next.js 14 con App Router
- TypeScript con tipado estricto
- Persistencia en localStorage
- Diseño completamente responsive
- Estados de carga (loading states)
- Manejo de errores apropiado
- Validaciones en tiempo real
- Componentes reutilizables
- Estructura de carpetas escalable
- Código bien documentado

Requisitos Previos

- Node.js 18+ (descarga desde https://nodejs.org/)
- npm (viene incluido con Node.js)

Instalación Detallada

**Para usuarios técnicos o desarrolladores:**

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd FUNNELHOT
```

2. Instala las dependencias (solo la primera vez):
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

Nota: Los scripts `INICIAR.bat` y `DETENER.bat` automatizan estos pasos para usuarios no técnicos.

 Estructura del Proyecto


FUNNELHOT/
├── INICIAR.bat               - Script para iniciar el servidor (Windows)
├── DETENER.bat               - Script para detener el servidor (Windows)
├── app/
│   ├── [id]/
│   │   └── page.tsx          - Página de entrenamiento
│   ├── globals.css           - Estilos globales
│   ├── layout.tsx            - Layout principal
│   └── page.tsx               - Página principal (listado)
├── components/
│   ├── AssistantCard.tsx      - Tarjeta de asistente
│   ├── AssistantForm.tsx      - Formulario de creación/edición
│   ├── Button.tsx             - Componente de botón reutilizable
│   └── Modal.tsx              - Componente de modal reutilizable
├── lib/
│   ├── chat-responses.ts      - Respuestas simuladas para el chat
│   └── storage.ts             -Utilidades de localStorage
├── types/
│   └── assistant.ts           - Tipos e interfaces TypeScript
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

Decisiones de Diseño

Paleta de Colores
- Primario: Azul Indigo #6366f1 - Para acciones principales y elementos destacados
- Fondos: Dark #1a1b26 -Para fondos y contenedores
- Adicionales: Verde para éxito, rojo para errores/eliminación

Tipografía
- Sistema de fuentes del sistema para mejor rendimiento
- Jerarquía clara con diferentes tamaños y pesos
- Tamaños legibles en todos los dispositivos

 Componentes UI
- **Botones**: Variantes (primary, secondary, danger, ghost) con estados hover/active
- **Modal**: Backdrop con blur, animaciones suaves
- **Cards**: Sombras sutiles, hover effects
- **Formularios**: Validación visual con bordes rojos, mensajes de error claros

Responsive Design
- Grid adaptativo: 1 columna en mobile, 2 en tablet, 3 en desktop
- Modal responsive con padding adaptativo
- Chat con altura fija pero scrollable
- Navegación táctil-friendly en mobile

 Decisiones Técnicas

 1. Next.js App Router
Elegí Next.js 14 con App Router porque:
- Mejor rendimiento con Server Components
- Routing más intuitivo y moderno
- Mejor integración con React 18

2. TypeScript
- Tipado estricto para prevenir errores
- Mejor autocompletado y DX
- Interfaces claras para los datos

3. Tailwind CSS
- Desarrollo rápido sin CSS personalizado
- Diseño responsive fácil
- Clases utilitarias consistentes

 4. LocalStorage
- Persistencia local sin necesidad de backend
- Sincronización inmediata
- Datos de ejemplo pre-cargados

 5. Componentes Reutilizables
- Button: Variantes y estados consistentes
- Modal: Reutilizable para cualquier contenido
- AssistantCard: Lógica encapsulada

 6. Manejo de Estado
- Estado local con `useState` (suficiente para esta app)
- Efectos para sincronizar con localStorage
- Estados de carga y error apropiados

Funcionalidades Adicionales Implementadas

1. Indicador de porcentaje en tiempo real en el formulario de longitudes
2. Animaciones sutiles en transiciones y hover states
3. Feedback visual en todas las acciones (guardar, eliminar, etc.)
4. Persistencia de mensajes del chat en localStorage
5. Indicador de "escribiendo..." en el chat
6. Validación visual con colores (verde cuando suma 100%, rojo cuando no)
7. Estados de carga con spinners
8. Confirmaciones antes de acciones destructivas
9. Navegación con breadcrumb en la página de entrenamiento
10. Diseño moderno y profesional con atención a los detalles

 Datos de Ejemplo

La aplicación se inicializa automáticamente con 2 asistentes de ejemplo:
- Asistente de Ventas (Español, Profesional)
- Soporte Técnico (Inglés, Amigable)

Estos datos se cargan automáticamente en el primer uso.

Qué se Priorizó y Qué se Dejó Fuera

Priorizado
- Todas las funcionalidades requeridas
- Diseño responsive completo
- Validaciones robustas
- Experiencia de usuario fluida
- Código limpio y escalable

 Dejado Fuera (No requerido)
- Autenticación de usuarios (no requerido)
- Backend/API real (se usa localStorage)
- Tests unitarios (no especificado en requisitos)
- Internacionalización completa (solo español en UI)
- Exportar/importar asistentes

Tiempo Aproximado de Dedicación

- Configuración inicial: 30 minutos
- Estructura y tipos: 45 minutos
- Componentes base: 1.5 horas
- Página principal: 1 hora
- Modal de creación/edición: 2 horas
- Página de entrenamiento: 2 horas
- Estilos y responsive: 1.5 horas
- Ajustes y mejoras: 1 hora
- Documentación: 1 hora

Total aproximado: 11 horas

 Criterios de Evaluación Cumplidos

Funcionalidad
- Todas las funcionalidades requeridas funcionan correctamente
- Manejo apropiado de errores con try/catch y mensajes claros
- Persistencia de datos en localStorage funcionando

 Código
- Estructura clara y organizada por features
- TypeScript con tipado estricto
- Componentes reutilizables (Button, Modal, Card)
- Convenciones de nomenclatura consistentes
- Comentarios donde es necesario

UI/UX
- Diseño completamente responsive
- Experiencia de usuario fluida con transiciones
- Estados de carga y error claros
- Diseño moderno y profesional
- Atención a los detalles (hover states, animaciones)

Extras
- README bien documentado
- Datos de ejemplo pre-cargados
- Validaciones visuales mejoradas
- Persistencia de chat
- Feedback visual en todas las acciones

Scripts Disponibles

```bash
Desarrollo
npm run dev

Build de producción
npm run build

Iniciar servidor de producción
npm start

Linting
npm run lint
```

Próximas Mejoras Potenciales

Si se continuara el desarrollo, se podrían agregar:
- Tests unitarios y de integración
- Backend real con API REST
- Autenticación de usuarios
- Exportar/importar asistentes
- Historial de cambios
- Búsqueda y filtros en el listado
- Drag & drop para reordenar
- Temas claro/oscuro
- Notificaciones push
- Integración con APIs de IA reales


Este proyecto fue desarrollado como parte de una prueba técnica.


Desarrollado  usando Next.js, TypeScript y Tailwind CSS Ejecutado con Node.js
