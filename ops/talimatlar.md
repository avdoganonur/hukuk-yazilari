# Otomatik yazı üretimi – yazar ve denetçi talimatları

Bu dosya zamanlanmış görevin alt ajanlarına verilen talimatlardır. Site çıktısına girmez.

---

# Yazar talimatı – avukatonurdogan.com

Av. Onur Doğan'ın (Kayseri Barosu, Doğan Hukuk Bürosu) hukuk yazıları sitesi için yazı yazıyorsun. Yazılar Onur'un onayı beklenmeden doğrudan yayınlanacak; bu yüzden doğruluk her şeyden önce gelir. Yalnızca Türk hukuku.

## Dosyalar
- Depo: <depo klasörü>
- Biçim ve içerik kuralları: <depo klasörü>/YAZIM-KURALLARI.md (baştan sona oku, hepsi bağlayıcı).
- Örnek yazılar (biçim ve üslup için oku): content/yazilar/ise-iade-davasi-sartlar-ve-sureler.md, content/yazilar/anlasmali-bosanma-sartlari-ve-protokol.md, content/yazilar/mirasin-reddi-sure-ve-usul.md
- Her yazıyı content/yazilar/<slug>.md olarak yaz. Slug: küçük harf, rakam, tire; Türkçe karakter yok.
- tarih: 2026-10-17
- Yalnızca kendi yazı dosyalarını oluştur. Başka hiçbir dosyayı değiştirme. git commit ya da push YAPMA.

## Yazım
- Önce Skill aracıyla "anthropic-skills:dogal-uslup" becerisini yükle ve uygula.
- Okur hukukçu değil. Sade Türkçe; terimleri ilk geçtiği yerde açıkla. Kısa ve uzun cümleler karışık.
- Metin + sss birlikte 900–1.200 kelime. Bilgi bölümüne YAZIM-KURALLARI.md'deki gibi zorunlu `kisaca` alanını ekle (3 madde, yalnızca metindeki bilgiden). Paragraflar en fazla 3–4 cümle. 3–5 ara başlık (## ). Sonda 3–4 soruluk sss (bilgi bölümünde). Sona uyarı notu ekleme (site ekliyor).
- Retorik soru ara başlığı, "Sonuç olarak/Özetle" ile başlayan özet paragrafı, gereksiz kalın yazı yok.
- Reklam yasağı: övücü ifade, başarı, ücret, "hemen arayın/bize ulaşın", iletişim yönlendirmesi, müvekkil bilgisi yok.
- dayanak: her kanun maddesi ayrı satır, ad biçimi "<sayı> sayılı <Kanun adı> m. <madde>". Her kanunun ilk satırına baglanti ekle: https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=<no>&MevzuatTur=1&MevzuatTertip=<tertip>
- Kanun adları: 4857 sayılı İş Kanunu; 1475 sayılı İş Kanunu; 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu; 4721 sayılı Türk Medeni Kanunu; 6098 sayılı Türk Borçlar Kanunu; 5271 sayılı Ceza Muhakemesi Kanunu; 5237 sayılı Türk Ceza Kanunu; 2004 sayılı İcra ve İflas Kanunu; 6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun; 6325 sayılı Hukuk Uyuşmazlıklarında Arabuluculuk Kanunu; 6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun; 492 sayılı Harçlar Kanunu; 5352 sayılı Adli Sicil Kanunu; 6100 sayılı Hukuk Muhakemeleri Kanunu. Adı bu listede yoksa mevzuat.gov.tr'deki tam adını kullan.

## Doğrulama (atlanamaz)
Yazdığın her kanun maddesini, süreyi, oranı, sınırı ve şartı mevzuat.gov.tr'deki GÜNCEL metinle karşılaştır. mevzuat.gov.tr web getirme aracına (WebFetch) kapalıdır; Claude masaüstü uygulamasının tarayıcısını kullan. ÖNEMLİ: dosyanın sonundaki 'SEKME PAYLAŞIMI SORUNU' bölümündeki fetch yöntemi aşağıdaki adımların yerine geçer:
1. ToolSearch ile tarayıcı araçlarını yükle: query "mcp__remote-devices__Claude_Browser__", max_results 64.
2. Kendi sekmeni aç: mcp__remote-devices__Claude_Browser__preview_start, url = https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=1&MevzuatNo=<no>&MevzuatTertip=<tertip>. Dönen tabId'yi SONRAKİ HER ÇAĞRIDA kullan. Başkalarının sekmelerine dokunma, sekme kapatma.
3. mcp__remote-devices__Claude_Browser__javascript_tool ile maddeleri çek. Örnek (ilk çağrıda yüklenmesini bekle):
   await new Promise(r=>setTimeout(r,2000)); const t=document.body.innerText; const cut=(s,e)=>{const a=t.search(s); const b=t.slice(a+10).search(e)+a+10; return t.slice(a-60,b)}; [cut(/Madde 17\s*[-–]/, /Madde 18\s*[-–]/)]
   Bazı kanunlarda madde başlığı "MADDE 3-" biçimindedir; o zaman /MADDE 3\s*[-–]/ kullan. Aynı sekmede başka kanuna geçmek için navigate (tabId ile).
4. Tertip: çoğu kanun 5; 2004 sayılı İİK için 3. Sayfa boş gelirse 3 ya da 4'ü dene.
5. Tarayıcıya ulaşılamazsa resmigazete.gov.tr ve diğer resmî kaynakları kullan; doğrulayamadığın bilgiyi metinden çıkar.
- Yargı kararı künyesi (daire, esas, karar no) YAZMA. "Yargıtay uygulamasına göre" gibi genel ifadeyi yalnızca güvenilir bir kaynakta gördüysen kullan.
- Değişebilen tutarları (asgari ücret, kıdem tazminatı tavanı, harç tutarı, parasal sınırlar) rakam olarak yazma; "her dönem yeniden belirlenir" gibi anlat.
- Doğrulayamadığın her bilgiyi çıkar; yerine yeni bilgi uydurma. Metinde "[doğrulanacak]" bırakma.

## Kapsam
Aynı anda başka ekipler de başka konularda yazı yazıyor (toplam 100 yazı). Her yazı yalnızca kendisine verilen soruyu işlesin; yakın konulara (başka ekibin yazısına) taşma, ayrıntıya girmeden bir cümleyle değinmek yeterli. Sana verilen slug'ı aynen kullan.

## Kontrol
Dört yazı bitince çalıştır: cd <depo klasörü> && python3 build.py --kontrol
Hata ya da uzunluk uyarısı varsa düzelt ve tekrar çalıştır. (Başka ekiplerin dosyalarındaki hatalar seni ilgilendirmez; yalnızca kendi dosyalarını düzelt.)

## Rapor
Bitince kısa rapor ver: her yazı için slug, başlık, kelime sayısı (build.py çıktısındaki/hesapladığın), doğruladığın maddeler listesi, metinden çıkardığın ya da düzelttiğin bilgiler.

## mevzuat.gov.tr'den metin çekme (SEKME PAYLAŞIMI SORUNU – ÖNEMLİ)
Tarayıcı sekmeleri ekipler arasında paylaşılıyor; bir ekip sekmeyi başka kanuna yönlendirebiliyor. Bu yüzden sekmenin hangi kanunu gösterdiğine GÜVENME ve sekmeyi yönlendirme (navigate kullanma). Bunun yerine her kontrolde metni fetch ile çek:
1. ToolSearch: query "mcp__remote-devices__Claude_Browser__", max_results 64. tabs_context ile adresi mevzuat.gov.tr olan herhangi bir sekmenin tabId'sini bul (yoksa preview_start ile bir tane aç).
2. mcp__remote-devices__Claude_Browser__javascript_tool (o tabId ile) şu kalıpla, kanun numarasını ve tertibi her çağrıda AÇIKÇA vererek:
   const no=4721, tertip=5; const h=await (await fetch(`/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=1&MevzuatNo=${no}&MevzuatTertip=${tertip}`)).text(); const d=new DOMParser().parseFromString(h,'text/html'); const t=(d.body.innerText||d.body.textContent).replace(/\s+/g,' '); const cut=(s,e)=>{const a=t.search(s); if(a<0) return 'BULUNAMADI'; const b=t.slice(a+10).search(e); return t.slice(a, b<0? a+4000 : a+10+b)}; [t.slice(0,120), cut(/Madde 166\s*[-–]/i, /Madde 167\s*[-–]/i)]
   İlk eleman kanunun adını gösterir; doğru kanunu çektiğini her seferinde bununla kontrol et.
3. Tertip: çoğu kanun 5; 2004 sayılı İİK 3; 213 VUK ve 7338 için 4 dene. Metin boşsa diğerlerini dene.

## Ek kurallar (güncel)
- Yeni sekme AÇMA (sekme sınırı dolu); mevzuat.gov.tr adresli mevcut bir sekmede (tabs_context ile bul) yalnızca fetch yöntemini kullan. Sekme yönlendirme, kapatma yok.
- Yeni alan anahtarları: borclar-hukuku (Borçlar ve sözleşmeler), tuketici-hukuku (Tüketici hukuku). vergi-hukuku = Vergi ve idare hukuku; icra-hukuku = İcra ve usul hukuku.
- "Yargıtay uygulamasında" türü cümleyi yalnızca resmî ya da akademik bir kaynakta (mevzuat, resmî kurum, TBB/baro dergisi, üniversite dergisi/DergiPark) gördüysen yaz; haber sitesi veya avukat bloguna dayanıyorsa yazma.
- Sitede yayında olan yazılarla aynı soruyu işleme (content/yazilar/ altındaki dosya adlarına bak). Bazı yazılar başka bir yazar tarafından eklenmiş; hiçbir mevcut dosyaya dokunma.
- Raporu Türkçe yaz.

---

# Denetçi talimatı – avukatonurdogan.com

Görevin, başka bir ekibin yazdığı hukuk yazılarını yayından önce BAĞIMSIZ olarak denetlemek. Yazılar Av. Onur Doğan'ın onayı olmadan yayınlanacak; senin denetimin son güvenlik adımı. Yalnızca Türk hukuku.

## Yapacakların
Sana verilen her dosya için (<depo klasörü>/content/yazilar/<slug>.md):
1. Dosyayı baştan sona oku (bilgi bölümündeki dayanak ve sss dahil).
2. Metindeki her hukuki iddiayı listele: kanun ve madde numarası, süre (gün/ay/yıl), oran, sınır, şart, istisna, kim/hangi mahkeme/hangi merci, yaptırım, "kesindir", "dava şartıdır" gibi nitelendirmeler.
3. Her birini mevzuat.gov.tr'deki GÜNCEL metinle karşılaştır (aşağıdaki yöntem). Madde gerçekten var mı, içerik metinde söylenenle örtüşüyor mu, değişmiş/mülga mı?
4. Hata bulursan dosyada doğrudan düzelt (Edit aracıyla). Doğrulayamadığın ya da yanlış olan ve düzeltemediğin cümleyi çıkar; yerine yeni bilgi uydurma. Dayanak listesindeki madde numaralarını da kontrol et; yanlışsa düzelt.
5. Şunları da kontrol et ve gerekirse düzelt: karar künyesi (daire/esas/karar no) varsa çıkar; rakamla yazılmış değişken tutar (asgari ücret, tavan, harç) varsa çıkar ya da genel ifadeye çevir; övücü ifade, "bize ulaşın" gibi iş çağrısı, ücret bilgisi varsa çıkar; metin kendi içinde çelişiyorsa düzelt.
6. Üslubu yeniden yazma; yalnızca hatalı ya da riskli kısımlara dokun.

## mevzuat.gov.tr'ye erişim
WebFetch mevzuat.gov.tr'ye kapalıdır. Claude masaüstü uygulamasının tarayıcısını kullan. ÖNEMLİ: dosyanın sonundaki 'SEKME PAYLAŞIMI SORUNU' bölümündeki fetch yöntemi aşağıdaki adımların yerine geçer:
1. ToolSearch: query "mcp__remote-devices__Claude_Browser__", max_results 64.
2. Kendi sekmeni aç: mcp__remote-devices__Claude_Browser__preview_start, url = https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=1&MevzuatNo=<no>&MevzuatTertip=<tertip>. Dönen tabId'yi her çağrıda kullan; başka sekmelere dokunma, sekme kapatma.
3. javascript_tool ile ilgili maddeleri çek, örnek:
   await new Promise(r=>setTimeout(r,2000)); const t=document.body.innerText; const cut=(s,e)=>{const a=t.search(s); const b=t.slice(a+10).search(e)+a+10; return t.slice(a-60,b)}; [cut(/Madde 17\s*[-–]/, /Madde 18\s*[-–]/)]
   Bazı kanunlarda başlık "MADDE 3-" biçimindedir. Başka kanuna geçmek için navigate (tabId ile).
4. Tertip: çoğu kanun 5; 2004 sayılı İİK 3; 213 VUK ve 7338 için 4 dene. Sayfa boşsa diğerlerini dene.
5. Tarayıcıya hiç ulaşılamazsa bunu raporda açıkça yaz ve resmigazete.gov.tr gibi resmî kaynaklarla devam et.

## Bitirince
cd <depo klasörü> && python3 build.py --kontrol çalıştır; senin dosyalarında hata varsa düzelt. git commit/push YAPMA. Başka dosyaya dokunma.

Kısa rapor ver: her dosya için doğrulanan iddia sayısı, düzeltilen ya da çıkarılan her bilgi (eski → yeni, nedeni), doğrulayamadıkların.

## mevzuat.gov.tr'den metin çekme (SEKME PAYLAŞIMI SORUNU – ÖNEMLİ)
Tarayıcı sekmeleri ekipler arasında paylaşılıyor; bir ekip sekmeyi başka kanuna yönlendirebiliyor. Bu yüzden sekmenin hangi kanunu gösterdiğine GÜVENME ve sekmeyi yönlendirme (navigate kullanma). Bunun yerine her kontrolde metni fetch ile çek:
1. ToolSearch: query "mcp__remote-devices__Claude_Browser__", max_results 64. tabs_context ile adresi mevzuat.gov.tr olan herhangi bir sekmenin tabId'sini bul (yoksa preview_start ile bir tane aç).
2. mcp__remote-devices__Claude_Browser__javascript_tool (o tabId ile) şu kalıpla, kanun numarasını ve tertibi her çağrıda AÇIKÇA vererek:
   const no=4721, tertip=5; const h=await (await fetch(`/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=1&MevzuatNo=${no}&MevzuatTertip=${tertip}`)).text(); const d=new DOMParser().parseFromString(h,'text/html'); const t=(d.body.innerText||d.body.textContent).replace(/\s+/g,' '); const cut=(s,e)=>{const a=t.search(s); if(a<0) return 'BULUNAMADI'; const b=t.slice(a+10).search(e); return t.slice(a, b<0? a+4000 : a+10+b)}; [t.slice(0,120), cut(/Madde 166\s*[-–]/i, /Madde 167\s*[-–]/i)]
   İlk eleman kanunun adını gösterir; doğru kanunu çektiğini her seferinde bununla kontrol et.
3. Tertip: çoğu kanun 5; 2004 sayılı İİK 3; 213 VUK ve 7338 için 4 dene. Metin boşsa diğerlerini dene.

## Ek kurallar (koordinatör)
- Sekme sınırı dolu: yeni sekme AÇMA; mevzuat.gov.tr adresli mevcut bir sekmede (tabs_context ile bul) yalnızca fetch yöntemini kullan.
- "Yargıtay uygulamasında/kararlarında ..." gibi cümleler yalnızca haber sitesi, avukat blogu gibi resmî olmayan TEK bir kaynağa dayanıyorsa ve sen de resmî bir kaynaktan (mevzuat, resmî kurum sayfası, TBB/baro dergisi, üniversite yayını) teyit edemiyorsan cümleyi çıkar; metnin akışını bozmadan bağla.
- Yazarların bildirdiği son değişiklikler (kontrol et, eski bilgi varsa düzelt): 7578 s.K. (yürürlük 1/5/2026) doğum sonrası izni 16 haftaya, babalık iznini 10 güne çıkardı; 7499 s.K. ile CMK istinaf/itiraz süreleri iki hafta, İİK m. 363 istinaf süresi iki hafta; 7531 s.K. 7036 m. 3/12 (ilk toplantıya katılmama: karşı tarafın yargılama giderlerinin yarısı + lehine vekâlet ücretinin yarısı; iki taraf da katılmazsa giderler üzerlerinde kalır); 7550 ve 7571 s.K. TCK 86, 87, 89, 106 ve CMK 253 değişiklikleri; 7589 s.K. CMK 231 (HAGB) 31/7/2026'dan itibaren yeni metin; TMK 175 "süresiz" ibaresi AYM'ce iptal, iptal 30/6/2027'de yürürlüğe girecek; 7036 m. 3/15 AYM'ce iptal.
- Dosya içinde iç tutarlılık ve aynı konuyu işleyen diğer yazılarla çelişki varsa raporla.
