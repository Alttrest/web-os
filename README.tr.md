# alttre.os 🌌

> **Stardance** / Hack Club WebOS 1 görevi için oluşturulmuş, birinci sınıf, etkileşimli ve son derece özelleştirilebilir web tabanlı bir işletim sistemi.

![alttre.os Preview](https://via.placeholder.com/1200x600/050505/00f0ff?text=alttre.os)

## 📖 Proje Hakkında

`alttre.os` tarayıcı tabanlı kullanıcı arayüzlerinin sınırlarını zorluyor. Sadece bir pencere koleksiyonu değil; çarpıcı cam efekti (glassmorphism), akıcı animasyonlar ve zengin yerleşik uygulamalar içeren sürükleyici bir deneyim. **Estetik ve kullanıcı deneyimi** odaklı olarak, jenerik UI desenleri yerine derin karanlık modlar, canlı neon vurgular ve mikro etkileşimler tercih edilerek tasarlandı.

### ✨ Özellikler
- **Sürükleyici Kurulum Deneyimi:** İşletim sisteminizi başlatma ekranından itibaren kişiselleştirin. Kullanıcı adınızı, görev çubuğu stilini (macOS Dock veya Windows Taskbar) ve özel imlecinizi seçin.
- **Dinamik Duvar Kağıtları:** 3D etkileşimli parçacık ağları, renkli akışkan simülasyonları veya kendi arka planınızı yükleyin.
- **Gelişmiş Pencere Yöneticisi:** Framer Motion ile güçlendirilmiş tamamen sürüklenebilir, yeniden boyutlandırılabilir ve üst üste bindirilebilir pencereler.
- **Araç Takımları (Widgets):** Saat, Hava Durumu, Donanım özellikleri ve Notlar için sürüklenebilir masaüstü araç takımları.
- **Temel OS Mimarisi:**
  - *Sanal Dosya Sistemi (VFS):* `localStorage` üzerinde çalışan, küresel olarak paylaşılan bir dosya sistemi. Bir uygulamada dosya oluşturduğunuzda diğerlerinde anında belirir!
  - *Sentezlenmiş Ses:* Web Audio API kullanılarak prosedürel olarak oluşturulmuş başlatma ve tıklama sesleri (harici varlık kullanılmaz).
- **Yerleşik Uygulamalar:** 
  - *Sistem & Dosyalar:* Dosya Yöneticisi (Files), Terminal (ls, mkdir, cat vb. için VFS ile entegre), Devlog Okuyucu.
  - *Üretkenlik:* Tarayıcı, Hesap Makinesi, Not Defteri, Takvim.
  - *Medya & Kamera:* Fotoğraf Kulübesi (doğrudan VFS'ye kaydeder), Müzik Çalar, YouTube Web Sarıcısı.
  - *Sosyal:* InstaClone (Sahte akış).
  - *Oyunlar:* Oyun Merkezi (Yılan, Tic Tac Toe, Hafıza, Zar ve Yazı Tura içerir).
- **Sürprizler (Easter Eggs):** Sürpriz bir sonuç için Terminal'de `rm -rf` çalıştırmayı deneyin!

## 🛠️ Teknoloji Yığını
- **Çerçeve:** React 18 + Vite
- **Animasyonlar:** Framer Motion
- **Stillendirme:** Vanilla CSS (Cam Efekti & Özel Karanlık Mod)
- **İkonlar:** Lucide React

## 🚀 Yerelde Nasıl Çalıştırılır

`alttre.os`'u doğrudan kendi makinenizde çalıştırabilirsiniz.

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/Alttrest/web-os.git
   cd web-os
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Projeyi görüntüleyin:**
   Tarayıcınızı açın ve localhost bağlantısına gidin (genellikle `http://localhost:5173`).

## 📓 Devlog

*(Stardance gereksinimi: Geliştirme sürecinizi buraya ekleyebilirsiniz)*
- **[Tarih] - Başlangıç:** Proje iskeleti ve Vite + React kurulumu yapıldı.
- **[Tarih] - Pencere Yöneticisi:** Framer Motion kullanılarak sürüklenebilir pencere sistemi entegre edildi.
- **[Tarih] - Uygulamalar:** Terminal, Yılan Oyunu ve InstaClone gibi temel uygulamalar eklendi.
- **[Tarih] - Dev Güncelleme:** Sanal Dosya Sistemi (VFS) kuruldu! Dosya yöneticisi, çalışan Terminal komutları (ls, cd, touch), web kamerasından fotoğraf çeken Kamera uygulaması ve işletim sisteminin içinden yazılabilen Devlog uygulaması eklendi. Ses sentezleyici ile tıklama sesleri oluşturuldu.

## 📄 Lisans
Bu proje açık kaynaktır ve [MIT Lisansı](LICENSE) altında kullanılabilir.
