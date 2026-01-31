# Android SHA-1 Fingerprint Alma Kılavuzu

## DEVELOPMENT (Debug Keystore)

### Windows:
```powershell
cd %USERPROFILE%\.android
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Mac/Linux:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Çıktıda şuna benzer satırı arayın:
```
SHA1: A1:B2:C3:D4:E5:F6:G7:H8:I9:J0:K1:L2:M3:N4:O5:P6:Q7:R8:S9:T0
```

---

## PRODUCTION (Release Keystore)

### Eğer henüz keystore oluşturmadıysanız:
```bash
keytool -genkey -v -keystore harcama-takip-release.keystore -alias harcama-takip -keyalg RSA -keysize 2048 -validity 10000
```

### Mevcut keystore'dan SHA-1 almak:
```bash
keytool -list -v -keystore harcama-takip-release.keystore -alias harcama-takip
```

---

## EXPO EAS BUILD kullanıyorsanız:

```bash
# EAS credentials'dan SHA-1 alma
eas credentials
```

Sonra:
1. Select platform: Android
2. Select action: Keystore (View)
3. SHA-1 ve SHA-256 değerleri gösterilecek

---

## Google Cloud Console'da Kullanım:

1. https://console.cloud.google.com/apis/credentials
2. Create Credentials → OAuth client ID → Android
3. Package name: com.harcamatakip.app
4. SHA-1 certificate fingerprint: (yukarıdaki komutlardan alınan değer)
5. Create → Client ID kopyala
6. .env dosyasında EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID değerine yapıştır
