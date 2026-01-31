
---

## 2. `non-technical.md` (Harcama Takip - Ürün Dokümantasyonu)

```markdown
# Ürün Dokümantasyonu - Harcama Takip (Non-Technical)

## 🎯 Ürün Felsefesi: "3 Saniye Kuralı"

Kullanıcı harcama yaparken uygulamayı açsın, 3 saniyede girsin, kapatsın. Bekleme, düşünme, arama yok. Bu yüzden ana ekranda tek büyük buton var, menü yok.

## 🖼️ Ekran Yapısı (Single Screen Philosophy)

### 1. Hero Dashboard (Ekranın Üst %30'u)
Sadece 3 rakam, büyük font, yüksek kontrast:

- **Gelir**: Yeşil (51CF66), büyük, üstte
- **Gider**: Kırmızı (FF6B6B), ortada  
- **Kalan**: En büyük font (36px), altta, siyah
- **Bütçe Çubuğu**: Kalan'ın altında ince bir progress bar (%80'den sonra sarı, %100'den sonra kırmızı)

### 2. Floating Action Button (FAB) - Merkezde
- **Konum**: Ekranın sağ altı değil, orta-alt (thumb erişimi kolay)
- **Boyut**: 64x64px, daire, gölge efektli
- **Animasyon**: Pulse efekt (kullanıcıyı çağırır)
- **İkon**: Beyaz "+" işareti

**Basılı Tutma**: Hızlı erişim menüsü (son 3 kategori)

### 3. Grafik Alanı (Orta %50'lik Alan - Scrollable)
**Aylık Özet Kartı:**
- Pasta Grafik (Pie): Kategorilere göre dağılım
- En büyük dilim: Kategori adı ve yüzde yazısı ortada
- Renkler: Kullanıcının seçtiği kategori renkleri
- Etkileşim: Dilime dokununca o kategorinin detayına git

**Trend Çizgisi (Line Chart):**
- Son 30 günlük harcama eğrisi
- Ortalama çizgisi (noktalı)
- "Bu hafta ortalamanın %20 altındasın" (yeşil ikon + metin)

### 4. Son İşlemler Listesi (Alt %20)
- Son 5 işlem kart şeklinde
- Sola kaydır: Sil (kırmızı arka plan)
- Sağa kaydır: Düzenle (mavi arka plan)
- Daha fazla: "Tümünü Gör" butonu (alt sayfaya yönlendirir)

## 💸 Hızlı Giriş Akışı (3 Saniye Hedefi)

**Senaryo: Kahve aldı, giriyor**

1. **Uygulama Aç**: FaceID zaten açık (0.5 sn)
2. **FAB'a Bas**: Büyük + butonu (0.5 sn)
3. **Tutar Gir**: Numpad açılır (varsayılan klavye değil, büyük rakamlı) (1 sn)
4. **Kategori Seç**: Son kullanılan 3 kategori yukarıda, tek dokunuş (1 sn)
   - Yoksa: Dikey scroll kategori listesi (ikon + renk)
5. **Kaydet**: Otomatik (0 sn) - Başka buton yok

**Toplam**: 3 saniye

## 📊 Grafik Detayları (Veri Anlatıcılığı)

**Pasta Grafik (Expense Breakdown):**
- **Boş Merkez**: "Bu Ay" yazısı ve toplam tutar
- **Dilimler**: Yuvarlatılmış köşeler (rounded)
- **Animasyon**: Saat yönünde dolum (1 saniyede)
- **İnteraktif**: Hangi dilime dokunduysa, diğerleri soluklaşır (opacity 0.3)

**Çubuk Grafik (Weekly Trend):**
- Haftanın günleri (Pzt-Paz)
- Her çubuk: O günkü toplam
- Renk: Harcama arttıkça koyulaşan gradient (açık turuncu -> koyu kırmızı)
- Referans Çizgisi: Aylık günlük ortalama (noktalı beyaz çizgi)

**Motivasyon Mesajları:**
- "%20 az harcadın" -> Yeşil kalp ikonu
- "Bütçenin %80'ine ulaştın" -> Sarı uyarı ikonu
- "Bugün hiç harcama yapmadın!" -> Yeşil rozet

## 🏷️ Kategori Yönetimi

**Kategori Oluşturma:**
- İsim (max 12 karakter)
- Emoji seçimi (native emoji picker, custom ikon kütüphanesi değil)
- Renk seçimi: 8 preset renk (soft tonlar), custom renk yok (karmaşıklık)
- Limit (opsiyonel): "Bu kategoride ayda X TL"

**Smart Kategoriler (Auto):**
- "Düzenli Harcamalar": Her ay tekrar edenler (kira, aidat)
- "Acil Durum": Limiti aşılan kategoriler

## 📤 Export/Export Kullanıcı Deneyimi

**Export (Paylaş):**
- Ayarlar çarkında "Verilerimi İndir"
- Seçenekler: "Bu Ay", "Son 3 Ay", "Tüm Zamanlar"
- Format: CSV (Excel açabilir) veya PDF (Görsel rapor)
- Paylaşım: Native share sheet (WhatsApp, Email, Drive)

**Import (Yükle):**
- "Banka Verisi Yükle" butonu
- Açıklama: "Banka uygulamanızdan CSV indirin"
- Dosya seçici açılır
- Önizleme: İlk 5 satır gösterilir (kullanıcı onaylar)
- Eşleştirme: Banka sütun isimleri otomatik tanınır, tanınmazsa kullanıcı eşleştirir

## 🎨 Görsel Dil (Finansal Minimalizm)

**Renk Psikolojisi:**
- **Kırmızı/Turuncu**: "Dikkat, para çıkıyor" ama agresif değil (soft pastel)
- **Yeşil**: "Güvenli, gelir var" (doğa tonu)
- **Gri/Siyah**: "Nötr bilgi"

**Tipografi:**
- Rakamlar: Monospace font (tabular nums) - hane hane hizalı görünüm
- Başlıklar: Bold, 24px+
- Açıklamalar: Regular, 14px, gri

**Boşluk (Whitespace):**
- Kartlar arası 16px
- İç padding 20px
- Yeterli nefes alanı (finans stresini azaltır)

## 📱 Widget Tasarımı (iOS/Android)

**Küçük Widget (1x1):**
- Sadece "Kalan Bütçe" büyük rakam
- Arkaplan: Gradient (yeşil -> sarı -> kırmızı bütçe durumuna göre)

**Orta Widget (2x1):**
- Üstte: Kalan bütçe
- Altta: Son 3 kategori mini çubuk grafik

**Büyük Widget (2x2):**
- Mini pasta grafik
- En çok harcanan 3 kategori listesi

## 🚫 Yapılmayacaklar (Anti-Features)

- Banka entegrasyonu (API maliyetli, güvenlik riskli)
- Otomatik harcama takibi (SMS okuma izni istemek kullanıcı korkutur)
- Kripto/Stock takibi (kapsam dışı)
- Sosyal paylaşım (harcama yarışması yok)
- Karmaşık bütçeleme (kavanoz sistemi, 50/30/20 kuralı - sadece toplam limit)
- Cloud backup seçeneği (Supabase zaten yapıyor, ayrı buton gerekmez)