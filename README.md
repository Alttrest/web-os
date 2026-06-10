# alttre.os

A premium, interactive, and highly customizable web-based operating system. Built as part of the Hack Club WebOS 1 mission, `alttre.os` pushes the boundaries of browser-based UIs with stunning glassmorphism, fluid animations, and a rich set of built-in applications.

![alttre.os Preview](https://via.placeholder.com/1200x600/050505/00f0ff?text=alttre.os)

## ✨ Features

- **Immersive Setup Experience:** Personalize your OS right from the start. Choose your name, taskbar style, and cursor.
- **Dynamic Wallpapers:** Choose between 3D interactive particle networks, colorful fluid simulations, a clean static gradient, or upload your own custom wallpaper.
- **Custom Cursors:** Includes a highly requested *Interactive Ring* cursor that reacts to clicks, classic pointers, or the ability to upload a custom cursor image.
- **Draggable Desktop Widgets:** Completely free-form widgets for Clock, Weather, System Hardware (Real Cores & RAM specs), and Quick Notes.
- **Advanced Window Manager:** Fully draggable, resizable, and stackable windows powered by `framer-motion`.
- **Taskbar Options:** Choose between a sleek macOS-style centered Dock or a classic Windows-style full-width taskbar.
- **Easter Eggs:** Try running `rm -rf` in the Terminal to see the authentic `alttre.os` Blue Screen of Death (BSOD)!

## 📱 Built-in Applications

- **Terminal:** A functional simulated command-line interface.
- **Browser:** Navigate the web directly inside your OS (Note: some modern sites may block iframe embedding natively).
- **InstaClone:** A mock social media feed.
- **Productivity Suite:** Calculator, Notepad, Calendar, and Clock.
- **Settings:** Customize your OS settings, view hardware specs, and change your wallpaper on the fly.
- **Games & Entertainment:** Tic Tac Toe, Memory Game, and a Music Player.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Animations:** Framer Motion
- **Styling:** Vanilla CSS (Tailored Glassmorphism & Dark Mode)
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alttre.os.git
   cd alttre.os
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder, ready to be deployed to Vercel, Netlify, GitHub Pages, or any static hosting service.

## 🎨 Design Philosophy

`alttre.os` was built with a core focus on **aesthetics and user experience**. It avoids generic UI patterns in favor of:
- Deep, tailored dark modes (`#050505` backgrounds).
- Vibrant, neon accent colors (`#00f0ff`, `#ff00ff`).
- Smooth micro-interactions on every hover and click.
- Blurry, translucent backgrounds (Glassmorphism) to create depth.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
