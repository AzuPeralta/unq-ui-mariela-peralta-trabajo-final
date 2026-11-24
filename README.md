# Palabras Encadenadas

Juego de palabras encadenadas hecho en React para el Trabajo Final Integrador de
Construcción de Interfaces de Usuario (UNQ, 2° cuatrimestre 2026).

El objetivo es formar la cadena más larga posible de palabras válidas antes de que se
agote el tiempo: cada palabra tiene que empezar con la última letra de la anterior.

## Requisitos

- [Node.js](https://nodejs.org/) (`v24.12.0`)
- npm

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/AzuPeralta/unq-ui-mariela-peralta-trabajo-final.git
   cd unq-ui-mariela-peralta-trabajo-final
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de variables de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   (En Windows con CMD: `copy .env.example .env`)

   El archivo `.env` contiene la URL de la API de validación de palabras. Sin este paso,
   la aplicación no puede validar palabras.

## Ejecución

```bash
npm run dev
```

Abrir en el navegador la URL que muestra la terminal (por defecto, `http://localhost:5173`).

## Cómo se juega

- La primera palabra puede ser cualquier palabra válida del diccionario español.
- A partir de la segunda, cada palabra tiene que empezar con la última letra de la anterior.
- No se puede repetir una palabra durante la partida.
- Cada letra de una palabra válida suma 1 punto.
- Cada turno dura 15 segundos. El contador arranca con la primera palabra válida y vuelve
  a 15 con cada palabra válida. Si llega a 0, la partida termina.
- Si al terminar el puntaje entra en el top 10, se puede guardar con tus iniciales (3 letras).
- Desde los botones del gabinete se pueden ver las reglas, los récords o reiniciar la partida.

---

## Validación de palabras

- **Se valida localmente todo lo posible antes de llamar a la API**: caracteres
  inválidos, palabras de una letra, palabras repetidas y la regla de encadenamiento.
  Solo se consulta la API para saber si la palabra existe.
- **Solo se aceptan letras**: no se permiten números, espacios ni símbolos.
- **Tildes, diéresis y mayúsculas no cuentan**: "Árbol" y "arbol" son la misma palabra,
  tanto para detectar repetidas como para encadenar.
- **La ñ es una letra distinta de la n.** Limitación conocida: la API trata la ñ como n,
  así que puede aceptar palabras con ñ que no existen (por ejemplo, "sañ", que valida como "san").
- **Palabras de una letra:** solo valen "a", "e", "o", "u" e "y". La API acepta cualquier
  letra suelta ("i", "d"), pero no son palabras del español.
- **Los errores se borran al empezar a escribir** la siguiente palabra.
- **Si falla la conexión con la API**, se muestra un aviso y se puede seguir intentando:
  la palabra no se agrega y la partida no termina.

## Tiempo

- **El contador se pausa mientras se espera la respuesta de la API.** Así, la demora de la
  red no le quita tiempo al jugador. Las validaciones locales son instantáneas y no lo pausan.
- El input se bloquea mientras se valida una palabra, para evitar envíos superpuestos.
- **El contador también se pausa mientras hay un modal abierto** (reglas, récords o reinicio).

## Leaderboard

- Se guarda en el `localStorage` del navegador.
- Solo se ofrece guardar si el puntaje entra en el top 10, y es opcional.
- Para entrar con el ranking lleno hay que **superar** al último: en caso de empate, se
  queda el puntaje que ya estaba.

## Interfaz

- **Reiniciar pide confirmación solo si hay una partida en curso**, para no perderla por accidente.
- **La cadena tiene altura fija con scroll** y siempre muestra las últimas palabras.
- **Los textos en fuente pixel van sin tilde**, porque la fuente no dibuja las letras acentuadas.
- **No es responsive**: está pensado para pantallas de escritorio.

## Estado de la aplicación

- Se guarda el mínimo estado posible. El puntaje, la próxima letra y si la partida está
  en curso o terminó **se derivan** de la cadena de palabras y del tiempo restante.

## Estructura del proyecto

```
src/
├── assets/icons/              // íconos pixel de los botones
├── components/
│   ├── Game.jsx               // una partida: cadena, validación, tiempo y modales
│   └── ...                    // componentes de la interfaz
├── hooks/
│   └── useTimer.js            // cuenta regresiva con pausa
├── services/
│   ├── api.js                 // API de validación
│   └── leaderboardStorage.js  // lectura y escritura del ranking en localStorage
├── utils/
│   ├── normalizeWord.js       // ignora tildes y mayúsculas al comparar
│   └── validations.js         // reglas de validación de palabras e iniciales
├── App.jsx
└── main.jsx                   // punto de entrada
```

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [axios](https://axios-http.com/) para las llamadas HTTP
- CSS propio, sin librerías de estilos
- Fuentes [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) y
  [VT323](https://fonts.google.com/specimen/VT323) de Google Fonts
- [ESLint](https://eslint.org/) como linter