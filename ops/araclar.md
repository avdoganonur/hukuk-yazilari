# Hesaplama araçları: yapım kuralları

Site: https://avukatonurdogan.com (Av. Onur Doğan, Kayseri Barosu). Araçlar /hesaplama-araclari/ altında yayınlanır, menüde "Hesaplama araçları" başlığı vardır. Yalnızca Türk hukuku. Araçlar avukatın adıyla yayınlandığı için **doğruluk her şeyden önce gelir**.

## Dosyalar
- Her araç: `content/araclar/<slug>.html` (slug: küçük harf, rakam, tire; Türkçe karakter yok; sonu genelde `-hesaplama`).
- Örnek ve biçim kaynağı: `content/araclar/miras-payi-hesaplama.html` (baştan sona oku, aynı yapıyı kullan).
- Ortak yardımcılar: `static/araclar/ortak.js` (HA nesnesi: `HA.bagla`, `HA.sayi`, `HA.tl`, `HA.yuzde`, `HA.tarih`, `HA.tarihYaz`, `HA.gunEkle`, `HA.ayEkle`, `HA.yilEkle`, `HA.gunFarki`, `HA.donem`, `HA.goster`). Bu dosyayı DEĞİŞTİRME; eksik bir yardımcıya ihtiyacın olursa kendi aracının betiğine yaz.
- Döneme bağlı oran ve tutarlar: `static/araclar/veri-<ad>.js` dosyası. Yalnızca sana verilen veri dosyalarını oluştur/düzenle. Dosya `window.HV = window.HV || {}; HV.<ad> = {...}` biçiminde olsun. Her değerin yanında yorum satırıyla kaynak (Resmî Gazete tarihi/sayısı ya da resmî kurum sayfası) ve geçerlilik başlangıcı yaz. Döneme bağlı listeler `[{baslangic: "YYYY-AA-GG", deger: ...}]` biçiminde, artan sırada (HA.donem ile okunur).
- Aracın bilgi bölümünde `veri: [ad1, ad2]` yazarsan sayfa `/araclar/veri-ad1.js` dosyalarını yükler.
- Başka hiçbir dosyayı (build.py, style.css, ortak.js, başka ekibin araçları) değiştirme. git commit/push yapma.

## Bilgi bölümü (YAML)
baslik (sayfa başlığı), kisa_ad (kart adı, 1–4 kelime), aciklama (50–160 karakter, ne hesapladığını söyler), grup (sure-faiz | harc-vergi | is | ucret | miras | sgk | diger), sira (grup içi sıra), guncelleme (bugün: 2026-10-19), veri (isteğe bağlı), ilgili_yazilar (sitede GERÇEKTEN olan yazı slugları; `ls content/yazilar/` ile kontrol et), kaynaklar (ad, url, not), nasil (markdown: hesabın kuralları, hangi maddeye dayandığı, aracın neyi hesaba katmadığı; 150–400 kelime, sade Türkçe).

## Gövde
- `<form class="arac-form" id="...">` + `<div class="arac-sonuc" id="..." aria-live="polite" hidden></div>` + `<script>` (IIFE, `HA.bagla(form, kutu, function (f) { ...; return {baslik, ana, basliklar, satirlar, notlar}; })`).
- Alan düzeni: `.alan` (label + input + `.ipucu`), yan yana iki alan için `.alan-cift`, onay kutusu `label.secim`, grup için `fieldset` + `legend`. Para alanları: `inputmode="decimal" data-para`. Tarih alanları `type="date"`. Düğmeler `.arac-dugmeler` içinde `.dugme` (Hesapla) ve `.dugme.dugme-ikincil` (Temizle, type=reset).
- Hatalı girişte `throw new Error("anlaşılır Türkçe mesaj")`.
- Sonuçta ara adımları göster (brüt, kesintiler, oran, dönem); kullanıcı hesabı izleyebilmeli. `notlar` ile varsayımları belirt.
- Harici kütüphane, harici istek, çerez, localStorage YOK. Girilen bilgi hiçbir yere gönderilmez.

## Doğruluk (atlanamaz)
1. Her oranı, tutarı, tavanı, dilimi, süreyi resmî kaynaktan doğrula ve kaynağı hem veri dosyasına (yorum) hem `kaynaklar` listesine yaz.
   - Kanun metni: mevzuat.gov.tr. Bilgisayar köprüsü bağlıysa (ToolSearch: "mcp__remote-devices__Claude_Browser__", max_results 64) mevcut mevzuat.gov.tr sekmesinde fetch yöntemiyle oku (scratchpad/yazar-talimati.md sonundaki "SEKME PAYLAŞIMI SORUNU" bölümü). Yeni sekme açma, sekmeyi yönlendirme.
   - Tarife ve tebliğler (harç tarifeleri, damga vergisi, GVK dilimleri, asgari ücret, kıdem tavanı, AAÜT, arabuluculuk tarifesi, yeniden değerleme oranı, kanuni faiz, avans faizi, TÜFE): Resmî Gazete ya da kurumun kendi sitesi (gib.gov.tr, csgb.gov.tr, sgk.gov.tr, tcmb.gov.tr, tuik.gov.tr, adb.adalet.gov.tr, barobirlik.org.tr). WebFetch resmigazete.gov.tr ve mevzuat.gov.tr'ye kapalıdır; bunları başka yollarla aşmaya çalışma. Lexpera konsolide metinleri ve ikinci bir bağımsız kaynakla örtüşen ikincil kaynaklar yalnızca resmî kaynağa ulaşılamazsa kullanılabilir; bunu yorumda belirt.
2. Doğrulayamadığın bir değeri koyma. O değere dayanan aracı ya da dönemi yapma ve raporda belirt. Tahmini değer, "yaklaşık" oran YOK.
3. Geçmiş dönemler gerekiyorsa (faiz, kıdem tavanı) yalnızca doğrulayabildiğin dönemleri koy; aracın kabul ettiği en eski tarihi sınırla ve kullanıcıya söyle.
4. Kendi örnek hesaplarını elle (python ile) yap ve araçla karşılaştır. Raporuna en az 2 örnek girdi ve beklenen sonucu yaz (denetçi bunları yeniden hesaplayacak).

## Üslup ve reklam yasağı
Sade Türkçe, hukukçu olmayan okur. Övücü ifade, "bize ulaşın", ücret bilgisi, iş çağrısı yok. Sonuç için "kesin" deme. Sayfanın altında genel uyarı zaten var; tekrarlama.

## Kontrol
- Derlemeyi KENDİ klasörüne yap (başka ekipler aynı anda derliyor): `CIKTI_DIZIN=/tmp/dist-<ekip-adın> python3 build.py`. Hatasız bitmeli. Başka ekibin aracındaki hata derlemeyi durdurursa o dosyaya dokunma; birkaç dakika sonra yeniden dene.
- Tarayıcıda dene: `cd /tmp/dist-<ekip-adın> && python3 -m http.server <boş bir port, 8800–8899 arası>` ve Playwright (Chromium kurulu: /opt/pw-browsers). Hazır betik: `python3 /tmp/claude-0/-home-claude/ab9d81da-50aa-5a55-9fc3-8fc4f1d63409/scratchpad/arac-shot.py <url> <çıktı.png> <genişlik> "<doldurup requestSubmit eden JS>"` — konsol hatalarını da yazar. 390 ve 1280 genişlikte ekran görüntüsünü Read ile bak.

## Rapor (Türkçe)
Her araç için: slug, ne hesapladığı, kullanılan her değer ve kaynağı, test örnekleri (girdi → beklenen çıktı), hesaba katılmayan durumlar, doğrulayamayıp dışarıda bıraktıkların.
