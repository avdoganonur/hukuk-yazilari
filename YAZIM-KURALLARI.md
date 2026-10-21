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
kisaca:                    # zorunlu; yazının başındaki "Kısaca" kutusu
  - "Okurun sorusuna doğrudan cevap veren kısa cümle."
  - "En önemli şart ya da süre."
  - "Dikkat edilecek sonuç."
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
- `kisaca`: 3 madde (gerekirse 2 ya da 4); her madde tek cümle, 40–150 karakter, noktayla biter, çift tırnak içermez. Yalnızca yazının metninde açıkça yazan bilgiyi kısaltır; yeni bilgi, yorum ya da metinde olmayan süre/oran eklenmez.

## Metin

Av. Onur Doğan'ın 21.10.2026 kararıyla bu tarihten sonra yazılan yazıların okuru **hukuki bir soruna cevap arayan meslektaşlardır** (avukat, stajyer, hukukçu). Yazı, somut bir uyuşmazlıkta izlenecek çözüm yolunu göstermelidir. Daha önce halka yönelik yazılmış yazılar olduğu gibi kalır.

- Hukuk dili kullanılır; temel kavramlar açıklanmaz, ama uygulamada karıştırılan noktalar netleştirilir.
- Uzunluk: metin ve sık sorulan sorular birlikte 1.500–2.800 kelime.
- 5–8 ara başlık (`## `). Önerilen sıra:
  1. Sorun ve kısa cevap (hangi hükümler, hangi yol).
  2. Hukuki dayanak ve şartlar (madde madde, lafza sadık).
  3. Uygulamada tartışmalı noktalar ve öğretideki görüşler.
  4. Usul: görevli ve yetkili mahkeme, dava şartı arabuluculuk ya da idari başvuru, süreler (hak düşürücü / zamanaşımı ve başlangıcı), harç türü (nispi / maktu; tutar yazılmaz), ispat yükü ve deliller, ihtiyati tedbir / haciz imkânı, kanun yolu.
  5. Dilekçede ve dosyada dikkat edilecekler: talep sonucunun nasıl kurulacağı, sık yapılan usul hataları, karşı tarafın muhtemel savunmaları.
  6. Gerekirse kısa örnek olay ya da hesap (gerçek veri olmadığı belirtilerek).
- Paragraflar en fazla 4–5 cümle; sayılabilen şartlar ve adımlar madde listesiyle yazılır. Karşılaştırma gerekiyorsa tablo kullanılabilir.
- Ana başlık (`# `) kullanılmaz. Retorik soru başlıkları, "Sonuç olarak" ile başlayan özet paragrafları, gereksiz kalın yazı kullanılmaz.
- Sık sorulan sorular meslektaşın soracağı usul sorularıdır (ör. "Belirsiz alacak davası açılabilir mi?" — 7589 sonrası durumu kontrol ederek).
- Sona "Bu yazı genel bilgilendirme amaçlıdır..." notu eklenmez; site bunu kendisi ekler.

## Doğruluk (atlanamaz)

- Her kanun maddesi, süre, tutar ve oran yayımdan önce mevzuat.gov.tr'deki güncel metinden kontrol edilir.
- Yargı kararı künyesi yalnızca resmî karar arama kaynağında (karararama.yargitay.gov.tr, emsal.uyap.gov.tr, Anayasa Mahkemesi ve Danıştay karar arama) bulunduysa verilir; daire, esas ve karar numarası ile tarih eksiksiz yazılır. Karar metninden alıntı en çok iki cümledir ve tırnak içinde verilir. Bulunamayan künye yazılmaz; uygulama yalnızca akademik bir kaynağa dayanıyorsa bu açıkça belirtilir ("öğretide aktarıldığına göre").
- Değişebilen tutarlar (asgari ücret, kıdem tavanı, harçlar) yalnızca resmî kaynaktan doğrulandıysa ve dönemi belirtilerek yazılır.
- Doğrulanamayan bilgi metinden çıkarılır. Metinde `[doğrulanacak]` işareti kalırsa site derlenmez.

## Reklam yasağı

Avukatlık Kanunu m. 55 ve TBB Reklam Yasağı Yönetmeliği gereği yazılar yalnızca bilgilendiricidir:

- Övücü ifade ("en iyi", "uzman", "garantili"), başarı ya da kazanılan dava anlatımı, ücret bilgisi yok.
- "Hemen arayın", "bize ulaşın" gibi iş çağrısı yok; yazı içinde telefon veya iletişim yönlendirmesi yok.
- Müvekkil bilgisi, müvekkil yorumu ya da somut dosya ayrıntısı yok.

## Alanlar ve sıra

Yazılar alanlar arasında dönüşümlü ilerler: iş hukuku, aile hukuku, taşınmaz ve kira, ceza hukuku, miras hukuku, icra hukuku, tazminat hukuku, vergi hukuku. Aynı soru iki kez işlenmez; mevzuat değiştiyse eski yazı güncellenir ve `guncelleme` tarihi eklenir.
