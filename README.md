# Proyecto React + Three.js + Electron

Este proyecto es una aplicación desarrollada con **React**, **TypeScript**, **Vite** y **Three.js**, diseñada para funcionar tanto como **aplicación web** como **aplicación de escritorio** utilizando **Electron**.

El objetivo principal es mantener una arquitectura flexible que permita:

- Desplegar una versión web en cualquier servidor.
- Generar ejecutables de escritorio (Windows, MacOS, Linux) desde el mismo proyecto.
- Optimizar los tamaños de las builds, separando claramente los entornos de desarrollo y producción.

---

## 🏛️ Arquitectura del Proyecto

- **Frontend**:  
  Aplicación construida con **React** + **Vite** + **Three.js** en TypeScript.

- **Electron**:  
  Vive dentro de la carpeta `electron/`, creado con **electron-forge** para empaquetar y distribuir la aplicación de escritorio.

- **Separación de builds**:

  - **Web**: Los archivos se construyen en la carpeta `dist/`.
  - **Desktop**: Los archivos de React se construyen en `electron/app/`, y luego Electron los empaqueta en ejecutables.

- **Desarrollo paralelo**:  
  Se utiliza `concurrently` para correr simultáneamente el servidor de Vite y la instancia de Electron apuntando a `localhost:5173`.

---

## ⚙️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/RRCris/game-3d-client.git
   cd game-3d-client
   ```

1. Instala las dependencias del proyecto principal::

   ```bash
   git npm install
   ```

1. Instala las dependencias del subproyecto Electron:

   ```bash
    cd electron
    npm install
    cd ..
   ```

---

## 🚀 Comandos disponibles

### Iniciar el proyecto en modo desarrollo (Web + Electron)

```bash
npm run dev
```

- Levanta Vite en localhost:5173.

- Inicia Electron apuntando al servidor local.

### Iniciar solo el servidor web de Vite

```bash
npm run dev:web
```

Levanta únicamente el servidor de desarrollo para la versión web.

### Construir para producción web (solo archivos web)

```bash
npm run build
```

Genera la carpeta dist/ lista para desplegar en servidores web.

### Construir y empaquetar la aplicación de escritorio

```bash
npm run build:app
```

- Compila TypeScript.

- Realiza el build de React.

- Empaqueta la aplicación con Electron Forge.
  Los ejecutables generados se encontrarán en:

```bash
electron/out/
```
