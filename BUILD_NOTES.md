# Build Notları

## Google OAuth Çözümü (Development Build)

### Yapılan Değişiklikler

1. **expo-dev-client** eklendi
2. **auth.ts**: `expo-linking` kullanarak sabit scheme (`harcama-takip://auth/callback`)
3. **app.json**: Android intent filters eklendi
4. **Asset dosyaları** düzeltildi (PNG placeholder'lar gerçek dosyalara dönüştürüldü)
5. **gradle.properties**: 
   - RAM ayarları düşürüldü (2GB → 1GB)
   - Android Studio JDK 21 yolu eklendi

### Supabase Ayarları Gerekli

**Authentication → URL Configuration:**
- Site URL: `harcama-takip://`
- Redirect URLs: `harcama-takip://auth/callback`

**Google Provider ayarları:**
- Web Client ID ve Secret girilmiş olmalı
- Provider enabled olmalı

### Google Cloud Console

**Authorized redirect URIs** ekle:
```
https://YOUR_PROJECT.supabase.co/auth/v1/callback
```

### Build Komutu

```bash
npx expo run:android
```

**NOT:** Expo Go artık çalışmaz! Development build kullanılmalı.

### Çalıştırma

Build tamamlandıktan sonra:
```bash
npx expo start --dev-client
```

### Sorun Giderme

#### Gradle RAM Sorunu
`android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx1024m -XX:MaxMetaspaceSize=256m
```

#### JDK Bulunamadı Hatası
`android/gradle.properties`:
```properties
org.gradle.java.home=C:\\Program Files\\Android\\Android Studio\\jbr
```

İlk build 10-15 dakika sürebilir.
