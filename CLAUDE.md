# KASE Fermetures — kasefermetures.fr

## Proje Özeti

KASE Fermetures, Fransa'nın Vosges (Grand Est) bölgesinde Saulcy-sur-Meurthe merkezli bir menuiserie/fermeture (kapı-pencere-kepenk) firmasıdır. Fenêtre, porte, porte de garage ve volets alanlarında hizmet veriyor.

**Site Dili:** Fransızca (fr-FR) — Tüm içerik, meta taglar, alt textler, aria-label'lar Fransızca.
**Hedef Bölge:** Vosges, Grand Est, Saint-Dié-des-Vosges çevresi

---

## Firma Bilgileri

| Alan | Değer |
|------|-------|
| Firma Adı | KASE Fermetures |
| Sahip | Ali KARAN |
| Adres | 60 Rue des Déportés, 88580 Saulcy-sur-Meurthe |
| Telefon | 07 82 98 44 36 |
| E-posta (Ana) | contact@kasefermetures.fr |
| E-posta (Alternatif) | kasefermetures@outlook.fr |
| Instagram | https://www.instagram.com/kasefermetures/ |
| Domain | kasefermetures.fr |

---

## Teknoloji Stack

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 18.x | UI Framework |
| Vite | 5.x | Build tool |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| React Router | 6.x | Routing |
| React Helmet Async | latest | SEO meta management |
| Framer Motion | latest | Animasyonlar |

---

## Marka Kimliği & Tasarım Sistemi

### Logolar (Mevcut Dosyalar)

Projede `src/assets/logos/` altında 3 adet SVG logo dosyası mevcut:

| Dosya | Kullanım Alanı |
|-------|----------------|
| `kasefermetures-header-beyaz-logo.svg` | **Koyu arka plan** üzerinde kullan (header, footer, dark section) |
| `kasefermetures-header-siyah-logo.svg` | **Açık/beyaz arka plan** üzerinde kullan |
| `kasefermetures-favicon-logo.svg` | Favicon olarak kullan — `public/favicon.svg` olarak kopyala |

> **KURAL:** Bu logoları olduğu gibi `<img>` veya React component olarak import et. Asla logo uydurmayacaksın, asla yeniden çizmeyeceksin. Sadece bu 3 dosyayı kullan.

### Renk Paleti

Kartvizit ve logodaki renklere sadık kal:

```css
:root {
  /* Ana Renkler — Logodaki tonlara sadık */
  --kase-anthracite: #2B2B2B;        /* Ana koyu arka plan */
  --kase-anthracite-deep: #1E1E1E;   /* Daha koyu varyant */
  --kase-anthracite-light: #3A3A3A;  /* Kart arka planları */
  --kase-charcoal: #444444;          /* İkincil koyu */
  --kase-green: #6BBE45;             /* Ana yeşil aksent — logodaki yeşil */
  --kase-green-dark: #5AA63A;        /* Hover/active yeşil */
  --kase-green-light: #7FD159;       /* Açık yeşil varyant */
  
  /* Nötr Renkler */
  --kase-white: #FFFFFF;
  --kase-off-white: #F5F5F5;
  --kase-light-gray: #E8E8E8;
  --kase-medium-gray: #999999;
  --kase-dark-gray: #666666;
}
```

### Tipografi (Google Fonts)

```
Heading font: 'Outfit' (wght 300-900) — Bold, modern başlıklar
Body font: 'DM Sans' (wght 300-600) — Okunabilir, profesyonel body text
```

### Genel Tasarım Kuralları

- **Estetik:** Premium, modern, endüstriyel-şık. Koyu tonlar hakim, yeşil aksent vurguları.
- **Layout:** Generous whitespace, büyük hero sectionlar, temiz grid yapısı.
- **Butonlar:** Primary → yeşil bg + beyaz text. Ghost → şeffaf + beyaz border + beyaz text.
- **Border Radius:** 12-16px kartlar, 8px butonlar.
- **Transitions:** Tüm hover/focus → `transition: all 0.3s ease`.
- **Animasyonlar:** Framer Motion ile fade-in, slide-up, stagger efektleri. Abartısız ama profesyonel.
- **Mobile-first:** Tüm componentler önce mobile sonra desktop tasarlanacak.

---

## Dosya Yapısı (Hedef)

```
kasefermetures.fr/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.svg              ← kasefermetures-favicon-logo.svg kopyası
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── logos/
│   │       ├── kasefermetures-header-beyaz-logo.svg
│   │       ├── kasefermetures-header-siyah-logo.svg
│   │       └── kasefermetures-favicon-logo.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── SectionTitle.tsx
│   │   └── sections/
│   │       └── (sayfa section componentleri)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Fenetres.tsx
│   │   ├── Portes.tsx
│   │   ├── PortesGarage.tsx
│   │   ├── Volets.tsx
│   │   ├── Contact.tsx
│   │   ├── DevisGratuit.tsx
│   │   └── MentionsLegales.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
├── .gitignore
├── CLAUDE.md
└── README.md
```

---

## GitHub Actions — FTP Deploy

### Workflow Dosyası: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          port: ${{ secrets.FTP_PORT }}
          local-dir: ./dist/
          server-dir: /public_html/
          dangerous-clean-slate: false
```

### GitHub Secrets (Ayarlanması Gereken)

```
FTP_SERVER    = 77.37.34.32
FTP_USERNAME  = u130676702.kasefermetures.fr
FTP_PASSWORD  = Bengisu860.
FTP_PORT      = 21
```

> ⚠️ KRİTİK: `local-dir: ./dist/` → `server-dir: /public_html/` — dist içeriği doğrudan public_html kök dizinine gider. İç içe public_html klasörü oluşturmayacaksın.

---

## SPA Routing (.htaccess)

Build sonrası `dist/` içine `.htaccess` dosyası da dahil et (vite config veya public/ altında):

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## SEO Gereksinimleri

### Her Sayfa İçin

- `<title>` unique ve Fransızca
- `<meta name="description">` 155-160 karakter, Fransızca
- `<link rel="canonical">` her sayfada
- Open Graph meta tagları (og:title, og:description, og:url, og:locale="fr_FR")
- `lang="fr"` html tag'inde

### Schema.org LocalBusiness (Ana Sayfada)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KASE Fermetures",
  "description": "Expert en menuiserie extérieure dans les Vosges : fenêtres, portes, portes de garage et volets.",
  "url": "https://kasefermetures.fr",
  "telephone": "+33782984436",
  "email": "contact@kasefermetures.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "60 Rue des Déportés",
    "addressLocality": "Saulcy-sur-Meurthe",
    "postalCode": "88580",
    "addressRegion": "Grand Est",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.238,
    "longitude": 6.965
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.238,
      "longitude": 6.965
    },
    "geoRadius": "50000"
  },
  "sameAs": ["https://www.instagram.com/kasefermetures/"]
}
```

---

## Sayfa Yapısı & İçerik Planı (Tam Site İçin)

### 1. Accueil `/` — Ana Sayfa

- **Hero:** Tam ekran, koyu bg, büyük başlık "Expert en menuiserie dans les Vosges", CTA "Devis Gratuit"
- **Services:** 4 kart grid — Fenêtres, Portes, Portes de Garage, Volets
- **À Propos:** Firma tanıtımı, yerel güven mesajı
- **Pourquoi Nous:** Avantajlar (devis gratuit, artisan local, produits certifiés vb.)
- **CTA Section:** Yeşil gradient, büyük CTA
- **Contact Preview:** Adres, telefon, email

### 2. Hizmet Sayfaları `/fenetres`, `/portes`, `/portes-de-garage`, `/volets`

- Hero banner + detaylı açıklama + malzeme seçenekleri + CTA

### 3. Contact `/contact`

- İletişim formu + harita + bilgiler

### 4. Devis Gratuit `/devis-gratuit`

- Detaylı teklif formu

### 5. Mentions Légales `/mentions-legales`

- RGPD uyumlu yasal bilgiler

---

## Hizmetlerin Fransızca İçerikleri

### Fenêtres (Pencereler)
- PVC, aluminium, bois
- Isolation thermique et acoustique
- Double et triple vitrage
- Sur mesure, toutes dimensions

### Portes (Kapılar)
- Portes d'entrée (giriş kapıları)
- Aluminium, PVC, bois, mixte
- Sécurité renforcée, serrures multipoints
- Design personnalisé

### Portes de Garage (Garaj Kapıları)
- Sectionnelles, basculantes, enroulables
- Motorisation et télécommande
- Isolation thermique
- Différents coloris et finitions

### Volets (Kepenk/Panjur)
- Volets roulants (stor kepenk)
- Volets battants (kanatlı kepenk)
- Aluminium, PVC
- Motorisation, commande à distance
- Isolation et sécurité

---

## Geliştirme Kuralları

1. **Her session başında** bu CLAUDE.md dosyasını oku.
2. **Logo dosyalarını** `src/assets/logos/` altındaki mevcut SVG'leri kullan, yeni logo üretme.
3. **Tüm metinler Fransızca** — hata mesajları, aria-label, alt text dahil.
4. **Commit mesajları** İngilizce, açıklayıcı: `feat:`, `fix:`, `chore:` prefix kullan.
5. **Responsive** her component sonrası kontrol et.
6. **Accessibility:** Semantic HTML, ARIA attributelar, klavye navigasyonu.
7. **Build test:** Her değişiklik sonrası `npm run build` çalıştır, hata varsa düzelt.

---

## Mevcut Durum

**Aktif Görev:** MAINTENANCE.md — Bakım sayfası oluşturma
**Aşama:** 1 — Maintenance page
**Son Güncelleme:** 2026-03-10
