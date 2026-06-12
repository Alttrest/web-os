# alttre.os 🌌

> A premium, interactive, and highly customizable web-based operating system built for the **Stardance** / Hack Club WebOS 1 mission.

![alttre.os Preview](https://via.placeholder.com/1200x600/050505/00f0ff?text=alttre.os)

## 📖 About The Project

`alttre.os` pushes the boundaries of browser-based UIs. It's not just a collection of windows; it's an immersive experience featuring stunning glassmorphism, fluid animations, and a rich set of built-in applications. It was built with a core focus on **aesthetics and user experience**, avoiding generic UI patterns in favor of deep dark modes, vibrant neon accents, and micro-interactions.

### ✨ Features
- **Immersive Setup Experience:** Personalize your OS right from the boot screen. Choose your username, taskbar style (macOS Dock vs. Windows Taskbar), and custom cursor.
- **Dynamic Wallpapers:** 3D interactive particle networks, colorful fluid simulations, or upload your own background.
- **Advanced Window Manager:** Fully draggable, resizable, and stackable windows powered by Framer Motion.
- **Widgets:** Draggable desktop widgets for Clock, Weather, Hardware specs, and Notes.
- **Core OS Architecture:**
  - *Virtual File System (VFS):* A globally shared file system stored in `localStorage`. Create a file in one app, and it instantly appears in the others!
  - *Synthesized Audio:* Procedurally generated startup and click sounds using the Web Audio API (zero external assets).
- **Built-in Apps:** 
  - *System & Files:* File Manager (Files), Terminal (integrated with VFS for `ls`, `mkdir`, `cat` etc.), Devlog Reader.
  - *Productivity:* Browser, Calculator, Notepad, Calendar.
  - *Media & Camera:* Photo Booth (saves directly to VFS), Music Player, YouTube WebWrapper.
  - *Social:* InstaClone (Mock feed).
  - *Games:* Game Center (includes Snake, Tic Tac Toe, Memory, Dice & Coin).
- **Easter Eggs:** Try running `rm -rf` in the Terminal for a surprise!

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite
- **Animations:** Framer Motion
- **Styling:** Vanilla CSS (Glassmorphism & Tailored Dark Mode)
- **Icons:** Lucide React

## 🚀 How to Run Locally

You can run `alttre.os` directly on your local machine. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Alttrest/web-os.git
   cd web-os
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the project:**
   Open your browser and navigate to the localhost link (usually `http://localhost:5173`).

## 📓 Devlog

*(Stardance gereksinimi: Geliştirme sürecinizi buraya ekleyebilirsiniz)*
- **[Tarih] - Başlangıç:** Proje iskeleti ve Vite + React kurulumu yapıldı.
- **[Tarih] - Pencere Yöneticisi:** Framer Motion kullanılarak sürüklenebilir pencere sistemi entegre edildi.
- **[Tarih] - Uygulamalar:** Terminal, Yılan Oyunu ve InstaClone gibi temel uygulamalar eklendi.
- **[Tarih] - Dev Güncelleme:** Sanal Dosya Sistemi (VFS) kuruldu! Dosya yöneticisi, çalışan Terminal komutları (ls, cd, touch), web kamerasından fotoğraf çeken Kamera uygulaması ve işletim sisteminin içinden yazılabilen Devlog uygulaması eklendi. Ses sentezleyici ile tıklama sesleri oluşturuldu.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
