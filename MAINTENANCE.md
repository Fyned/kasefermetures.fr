# MAINTENANCE.md — Bakım Sayfası Görevi

> Bu dosya Claude Code'un takip edeceği görev direktifidir.
> Önce CLAUDE.md'yi oku, sonra bu dosyayı uygula.

---

## Görev

React + Vite + TypeScript + Tailwind CSS ile profesyonel bir **maintenance (bakım/coming soon) sayfası** oluştur. Müşteri bu sayfayı gördüğünde firmanın ciddiyetinden ve profesyonelliğinden etkilenmeli.

---

## Adım 1: Proje Kurulumu

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install framer-motion react-helmet-async
```

### Tailwind Konfigürasyonu

`vite.config.ts` içine Tailwind plugin ekle:
```ts
import tailwindcss from '@tailwindcss/vite'
// plugins dizisine tailwindcss() ekle
```

`src/styles/globals.css`:
```css
@import "tailwindcss";
```

### tailwind.config.ts

Projenin renk paletini extend et (CLAUDE.md'deki renk değerlerini kullan):
- `anthracite`, `anthracite-deep`, `anthracite-light`, `charcoal`
- `kase-green`, `kase-green-dark`, `kase-green-light`
- Font family: `heading: ['Outfit', 'sans-serif']`, `body: ['DM Sans', 'sans-serif']`

### Google Fonts

`index.html` içinde `<head>`'e ekle:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
```

### Favicon

`kasefermetures-favicon-logo.svg` dosyasını `public/favicon.svg` olarak kopyala.
`index.html` head'ine: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`

---

## Adım 2: Logo Dosyaları

Logo dosyaları projede `src/assets/logos/` altında zaten mevcut:
- `kasefermetures-header-beyaz-logo.svg` → Koyu arka plan üzerinde kullanılacak
- `kasefermetures-header-siyah-logo.svg` → Açık arka plan üzerinde (bu sayfada kullanılmayacak)
- `kasefermetures-favicon-logo.svg` → Favicon

**Logoları React component olarak import et:**
```tsx
import logoBeyaz from '@/assets/logos/kasefermetures-header-beyaz-logo.svg'
// Kullanım: <img src={logoBeyaz} alt="KASE Fermetures" />
```

> ⛔ ASLA yeni logo çizme, SVG oluşturma veya logo yerine metin koyma. Sadece mevcut dosyaları kullan.

---

## Adım 3: Sayfa Tasarım Direktifleri

Tek sayfa, tek route (`/`). Tüm içerik bu sayfada olacak. Aşağıdaki sectionları yukarıdan aşağıya sırayla oluştur.

---

### Section A: Header (Sticky Değil — Basit)

**Yapı:**
- Sol taraf: Beyaz logo (`kasefermetures-header-beyaz-logo.svg`), yükseklik ~44px
- Sağ taraf: Telefon numarası — yeşil yuvarlak ikon içinde telefon SVG ikonu + "07 82 98 44 36" text
- Telefon numarası `<a href="tel:+33782984436">` olarak link

**Stil:**
- Arka plan: Şeffaf (hero ile kaynaşacak)
- Padding: üst-alt 24px
- Flex, justify-between, items-center
- Mobile'da logo ortalanır, telefon numarası text gizlenir sadece ikon kalır

**Animasyon:** Framer Motion ile yukarıdan fade-in (delay: 0s, duration: 0.6s)

---

### Section B: Hero — Tam Ekran Etki Alanı

Bu section sayfanın en kritik kısmı. Müşteri ilk bunu görüyor — etkilenmeli.

**İçerik (yukarıdan aşağıya):**

1. **Badge:** Küçük pill/capsule şeklinde badge
   - İçinde küçük yeşil yanıp sönen dot (pulse animasyon) + "Site en construction" yazısı
   - Arka plan: yeşilin çok hafif transparan versiyonu (rgba), ince yeşil border
   - Uppercase, küçük font, letter-spacing geniş

2. **Ana Başlık (h1):**
   ```
   Votre expert en
   menuiserie dans
   les Vosges
   ```
   - Font: Outfit, font-weight 800, çok büyük (clamp ile responsive: ~2.8rem mobile, ~5rem desktop)
   - Renk: Beyaz
   - "menuiserie" kelimesi yeşil renkte (accent), altında ince yeşil çizgi efekti
   - Letter-spacing: -1.5px (tight)
   - Line-height: 1.05

3. **Alt Başlık (p):**
   ```
   Installation et remplacement de fenêtres, portes, portes de garage et volets. 
   Artisan de confiance à Saulcy-sur-Meurthe. Devis gratuit et sans engagement.
   ```
   - Font: DM Sans, regular
   - Renk: Gri (#999)
   - Max-width: 600px, ortalanmış
   - Font-size: ~1.1rem

4. **CTA Butonları (2 adet yan yana):**
   - **Primary:** "Devis Gratuit" — yeşil bg, beyaz text, telefon ikonu, `href="tel:+33782984436"`, hover'da yukarı kayma + gölge artışı
   - **Ghost:** "Nous Contacter" — şeffaf bg, beyaz ince border, email ikonu, `href="mailto:contact@kasefermetures.fr"`, hover'da yeşil border + yeşil text
   - Mobile'da alt alta (flex-col), tam genişlik

**Arka Plan Efektleri:**
- Ana arka plan: `--anthracite-deep` (#1E1E1E)
- Sağ üst köşede büyük, blur'lü yeşil radial gradient (çok hafif, %10-15 opacity) — yavaş pulse animasyonu
- Sol alt köşede ikinci bir daha küçük yeşil glow
- Üzerine ince grid pattern overlay (yeşilin %3 opacity'si ile çizgiler, 80px aralıklı)

**Animasyon:** Tüm hero içeriği Framer Motion ile aşağıdan fade-in, stagger children (0.1s aralıkla)

---

### Section C: Hizmetler — 4 Kart Grid

**Üst Kısım:**
- Label: "NOS EXPERTISES" — yeşil, uppercase, küçük font, letter-spacing 3px, ortalanmış
- Başlık: "Des solutions sur mesure pour votre habitat" — beyaz, Outfit bold, ortalanmış

**4 Kart Grid:**
- Desktop: 4 kolon
- Tablet: 2 kolon
- Mobile: 2 kolon (dar kartlar)

**Her Kart:**
- Arka plan: Hafif gradient (anthracite-mid → anthracite-light), ince border (%6 beyaz opacity)
- Border-radius: 16px
- Padding: 36px 28px
- Ortlanmış içerik

- **İkon:** 64x64 kutu, yeşil transparan bg, border-radius 16px, içinde ilgili SVG ikon (stroke, yeşil renk). Lucide benzeri temiz line ikonlar kullan:
  - Fenêtres: Pencere ikonu (kare, ortada dikey+yatay çizgi)  
  - Portes: Kapı ikonu (dikdörtgen + kapı kolu)
  - Portes de Garage: Garaj ikonu (ev çatısı + yatay çizgiler)
  - Volets: Kepenk ikonu (kare + yatay çizgiler/lameller)

- **Başlık (h3):** Kart hizmet adı — Outfit, 700, beyaz
- **Açıklama (p):** Kısa Fransızca açıklama — DM Sans, gri

**Hover Efektleri:**
- Kart yukarı kayar (translateY -6px)
- Üst kenarda yeşil 3px çizgi belirir (scaleX 0→1 animasyonu)
- Border yeşile döner (hafif)
- Gölge artar + yeşil glow
- İkon kutusu yeşil dolu olur, ikon beyaza döner

**Fransızca İçerikler:**

| Kart | Başlık | Açıklama |
|------|--------|----------|
| 1 | Fenêtres | PVC, aluminium et bois. Performance thermique et acoustique supérieure. |
| 2 | Portes | Portes d'entrée sur mesure. Sécurité renforcée et design personnalisé. |
| 3 | Portes de Garage | Sectionnelles, basculantes et enroulables. Motorisation disponible. |
| 4 | Volets | Volets roulants et battants. Isolation optimale et protection accrue. |

**Animasyon:** Framer Motion stagger — kartlar sırayla aşağıdan fade-in

---

### Section D: Ayırıcı (Divider)

Basit dekoratif ayırıcı:
- Ortalanmış: ince çizgi + ortada yeşil küçük kare (45 derece döndürülmüş diamond) + ince çizgi
- Çizgiler gradient (transparent → yeşilin %40 → transparent)

---

### Section E: İletişim Bilgileri — 3 Blok

**Yapı:** 3 kolonlu grid, aralarında dikey ince separator çizgiler

**Desktop:** 3 kolon yan yana, dikey çizgilerle ayrılmış
**Mobile:** Tek kolon, yatay çizgilerle ayrılmış

**Her Blok (ortalanmış):**
1. İkon (48x48 kutu, yeşil transparan bg, ilgili ikon)
2. Label (küçük, uppercase, yeşil, letter-spacing)
3. Bilgi (beyaz, linkler tıklanabilir)

| Blok | Label | İçerik |
|------|-------|--------|
| 1 — Adres | ADRESSE | 60 Rue des Déportés<br>88580 Saulcy-sur-Meurthe<br>Vosges, Grand Est |
| 2 — Telefon | TÉLÉPHONE | 07 82 98 44 36 (tel: link) |
| 3 — Email | EMAIL | contact@kasefermetures.fr (mailto: link) |

**Animasyon:** Fade-in, section görünürlüğünde tetiklensin

---

### Section F: Footer

**Yapı:** Flex, justify-between, üstte ince border (beyaz %6)

- **Sol:** "© 2025 KASE Fermetures — Tous droits réservés" — küçük, koyu gri
- **Sağ:** Instagram sosyal medya ikonu
  - 40x40 kutu, koyu arka plan, ince border, border-radius 10px
  - İçinde Instagram SVG ikonu (gri fill)
  - Hover: yeşil bg, beyaz ikon, yukarı kayma + gölge
  - Link: `https://www.instagram.com/kasefermetures/` — target="_blank", rel="noopener noreferrer"

**Mobile:** Flex-col, ortalanmış

---

## Adım 4: SEO (index.html head)

```html
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KASE Fermetures — Expert en Menuiserie dans les Vosges | Bientôt en ligne</title>
  <meta name="description" content="KASE Fermetures, votre expert en menuiserie extérieure à Saulcy-sur-Meurthe dans les Vosges. Fenêtres, portes, portes de garage et volets. Devis gratuit au 07 82 98 44 36." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://kasefermetures.fr/" />
  <meta property="og:title" content="KASE Fermetures — Expert en Menuiserie dans les Vosges" />
  <meta property="og:description" content="Fenêtres, portes, portes de garage et volets. Votre artisan menuisier de confiance dans les Vosges." />
  <meta property="og:url" content="https://kasefermetures.fr/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
</head>
```

React Helmet ile Schema.org LocalBusiness JSON-LD ekle (CLAUDE.md'deki schema'yı kullan).

---

## Adım 5: Ek Dosyalar

### public/robots.txt
```
User-agent: *
Allow: /
Sitemap: https://kasefermetures.fr/sitemap.xml
```

### public/.htaccess
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### .gitignore
```
node_modules/
dist/
.env
.env.local
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/
```

---

## Adım 6: GitHub Actions Deploy

`.github/workflows/deploy.yml` dosyasını CLAUDE.md'deki workflow'a göre oluştur.

⚠️ **KRİTİK KONTROL:** 
- `local-dir: ./dist/` — Sondaki `/` şart
- `server-dir: /public_html/` — Sondaki `/` şart
- Bu sayede dist/ İÇİNDEKİLER doğrudan public_html/ köküne gider
- İç içe klasör OLUŞMAZ

---

## Adım 7: Build & Test

```bash
npm run build
```

- Build hatasız tamamlanmalı
- `dist/` klasöründe `index.html`, `assets/` ve `.htaccess` olmalı
- Favicon `dist/favicon.svg` olarak bulunmalı

---

## Kalite Kontrol Listesi

- [ ] Proje `npm run build` ile hatasız derleniyor
- [ ] Logo dosyaları doğru import edilmiş, görseller görünüyor
- [ ] Favicon tarayıcıda doğru görünüyor
- [ ] Tüm metinler Fransızca
- [ ] Telefon ve email linkleri çalışıyor (tel:, mailto:)
- [ ] Instagram linki doğru ve yeni sekmede açılıyor
- [ ] Mobile responsive (320px'den itibaren)
- [ ] Hero section etkileyici ve profesyonel
- [ ] Hizmet kartları hover efektleri çalışıyor
- [ ] Framer Motion animasyonları düzgün
- [ ] SEO meta tagları ve Schema.org doğru
- [ ] GitHub Actions workflow dosyası mevcut
- [ ] `.htaccess` dist/ içine dahil ediliyor
- [ ] `dist/` içinde gereksiz dosya yok
