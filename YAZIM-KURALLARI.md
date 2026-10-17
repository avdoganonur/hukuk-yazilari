# Yazım kuralları

Bu dosya, siteye eklenecek her yazının biçimini ve içerik kurallarını tanımlar. Yazıları ister Claude ister Av. Onur Doğan eklesin, bu kurallar geçerlidir. `python build.py --kontrol` komutu biçim kurallarının çoğunu otomatik denetler; kurala uymayan yazı yayımlanmaz.

## Dosya

- Her yazı `content/yazilar/` altında tek bir `.md` dosyasıdır.
- Dosya adı yazının adresidir: yalnızca küçük harf, rakam ve tire, Türkçe karakter yok. Örnek: `ise-iade-davasi-sartlar-ve-sureler.md` → `/yazilar/ise-iade-davasi-sartlar-ve-sureler/`
- Yayımlanmış bir yazının dosya adı değiştirilmez (bağlantılar bozulur).

## Bilgi bölümü

Dosya `---` satırları arasındaki bilgi bölümüyle başlar:

```yaml
---
baslik: "Soruyu okurun diliyle soran başlık (10–110 karakter)"
aciklama: "Arama sonuçlarında görünen özet (50–160 karakter)"
tarih: 2026-10-17          # yayım tarihi; ileri tarihli yazı o gün gelene kadar yayımlanmaz
guncelleme: 2026-11-02     # isteğe bağlı; yazı sonradan güncellenirse
alan: is-hukuku            # site.yaml içindeki alanlardan biri
taslak: false              # isteğe bağlı; true ise yayımlanmaz
dayanak:                   # en az bir tane; yazının dayandığı kanun maddeleri
  - ad: "4857 sayılı İş Kanunu m. 18"
    not: "Kısa açıklama"
    baglanti: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=4857&MevzuatTur=1&MevzuatTertip=5"
sss:                       # 3–4 soru önerilir
  - soru: "..."
    cevap: "..."
---
```

- `dayanak` satırlarında `ad` her zaman "<sayı> sayılı <Kanun adı> m. <madde>" biçiminde yazılır; site aynı kanunun maddelerini bu sayede gruplar.
- `baglanti`, kanunun mevzuat.gov.tr adresidir; aynı kanun için bir kez yazmak yeterlidir.

## Metin

- Okur hukukçu değildir. Sade Türkçe; terimler ilk geçtiği yerde açıklanır.
- Uzunluk: metin ve sık sorulan sorular birlikte 900–1.200 kelime.
- Ana başlık (`# `) kullanılmaz; ara başlıklar `## ` ile yazılır, 3–5 ara başlık.
- Retorik soru başlıkları, "Sonuç olarak" ile başlayan özet paragrafları, gereksiz kalın yazı kullanılmaz.
- Sona "Bu yazı genel bilgilendirme amaçlıdır..." notu eklenmez; site bunu kendisi ekler.

## Doğruluk (atlanamaz)

- Her kanun maddesi, süre, tutar ve oran yayımdan önce mevzuat.gov.tr'deki güncel metinden kontrol edilir.
- Yargı kararı künyesi yalnızca resmî karar arama kaynağında bulunduysa verilir; bulunamayan künye yazılmaz.
- Değişebilen tutarlar (asgari ücret, kıdem tavanı, harçlar) yalnızca resmî kaynaktan doğrulandıysa ve dönemi belirtilerek yazılır.
- Doğrulanamayan bilgi metinden çıkarılır. Metinde `[doğrulanacak]` işareti kalırsa site derlenmez.

## Reklam yasağı

Avukatlık Kanunu m. 55 ve TBB Reklam Yasağı Yönetmeliği gereği yazılar yalnızca bilgilendiricidir:

- Övücü ifade ("en iyi", "uzman", "garantili"), başarı ya da kazanılan dava anlatımı, ücret bilgisi yok.
- "Hemen arayın", "bize ulaşın" gibi iş çağrısı yok; yazı içinde telefon veya iletişim yönlendirmesi yok.
- Müvekkil bilgisi, müvekkil yorumu ya da somut dosya ayrıntısı yok.

## Alanlar ve sıra

Yazılar alanlar arasında dönüşümlü ilerler: iş hukuku, aile hukuku, taşınmaz ve kira, ceza hukuku, miras hukuku, icra hukuku, tazminat hukuku, vergi hukuku. Aynı soru iki kez işlenmez; mevzuat değiştiyse eski yazı güncellenir ve `guncelleme` tarihi eklenir.
