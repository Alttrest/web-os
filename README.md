# alttre.os

**Liquid Glass | Cyberpunk | Immersive OS**

alttre.os is a browser-based operating system that pushes the boundaries of modern web technologies. Steering clear of standard interface patterns, it is designed with deep dark modes, neon accents, and fluid micro-interactions.

[Live Demo](#) | [Hack Club WebOS 1 Mission](#)

## Core Features

- **Immersive Boot:** A customizable user experience right from the first startup.
- **Fluid UI:** Dynamic window management powered by Framer Motion, with a strong focus on glassmorphism.
- **Virtual File System (VFS):** A globally shared file system running on localStorage that provides data synchronization across applications.
- **Audio Synthesis:** Procedurally generated sound effects using the Web Audio API without any external resources.
- **Deep Customization:** 3D interactive backgrounds, custom cursors, and modular taskbar designs.

## The Tech Stack

| Component | Technology |
| :--- | :--- |
| Engine | React 18 + Vite |
| Motion | Framer Motion |
| Styling | Custom Vanilla CSS (Glassmorphism) |
| Icons | Lucide React |

## Development Log

- **[10.06.2026] – Genesis:** Established project architecture, Vite/React configuration, and implemented the window management system with Framer Motion.
- **[11.06.2026] – Core Update:** Integrated VFS (Virtual File System). Included Terminal (ls, mkdir, cat), Camera, Devlog, and Procedural Audio Synthesizer into the system.

## Local Deployment

Clone the repository:
```bash
git clone https://github.com/Alttrest/web-os.git
cd web-os
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
