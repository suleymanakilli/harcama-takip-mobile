# Harcama Takip

Modern, hızlı ve kullanımı kolay kişisel finans takip uygulaması.

## 🚀 Özellikler

- **3 Saniye Kuralı**: Harcama girişi maksimum 3 saniye sürer
- **Görsel Dashboard**: Gelir/Gider/Kalan özeti tek bakışta
- **Pasta Grafik**: Kategorilere göre harcama dağılımı
- **Hızlı Giriş**: Büyük NumPad ve son kullanılan kategoriler
- **CSV/PDF Export**: Verilerinizi kolayca paylaşın
- **Google Auth**: Güvenli giriş
- **Offline Cache**: Zustand ile yerel önbellek

## 📱 Tech Stack

- **Frontend**: Expo SDK 52 (React Native)
- **Backend**: Supabase (PostgreSQL + RLS)
- **Auth**: Google OAuth (expo-auth-session)
- **Charts**: react-native-chart-kit
- **State**: Zustand (persist middleware)

## 🛠️ Kurulum

### 1. Bağımlılıkları yükle
```bash
npm install
```

### 2. Environment dosyasını düzenle
`.env` dosyasını oluştur:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### 3. Supabase Veritabanı
`supabase/schema.sql` dosyasını Supabase SQL Editor'da çalıştır.

### 4. Google OAuth
1. Google Cloud Console'da proje oluştur
2. OAuth 2.0 credentials ekle
3. Authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

### 5. Uygulamayı başlat
```bash
npx expo start
```

## 📂 Proje Yapısı

```
├── app/                    # Expo Router ekranları
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Dashboard
│   ├── login.tsx          # Giriş ekranı
│   ├── transactions.tsx   # Tüm işlemler
│   ├── categories.tsx     # Kategori yönetimi
│   └── settings.tsx       # Ayarlar
├── src/
│   ├── components/        # UI bileşenleri
│   ├── constants/         # Theme, colors
│   ├── hooks/             # Custom hooks
│   ├── services/          # Supabase API
│   ├── store/             # Zustand store
│   ├── types/             # TypeScript types
│   └── utils/             # Yardımcı fonksiyonlar
└── supabase/
    └── schema.sql         # Veritabanı şeması
```

## 📏 Kod Standartları

- Screen files: Max 200 satır
- Components: Max 120 satır
- Hooks: Max 60 satır
- Services: Max 80 satır
- Utils: Max 40 satır

## 📄 Lisans

MIT

