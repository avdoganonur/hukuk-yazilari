/* İş hukuku araçlarının döneme bağlı değerleri.
   Listeler [{baslangic: "YYYY-AA-GG", deger: ...}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca doğrulanabilen dönemler girilmiştir; araçlar bu aralığın dışındaki tarihleri kabul etmez.
   Son kontrol: 19/10/2026. */
window.HV = window.HV || {};
HV.is = {
  /* Değerlerin geçerli olduğu son gün. 2027 değerleri girilmeden araçlar bu tarihten sonrasını hesaplamaz. */
  sonGecerlilik: "2026-12-31",

  /* Aylık brüt asgari ücret (16 yaşından büyükler, 4857 m. 39).
     2026: brüt 33.030,00 TL, net 28.075,50 TL. Asgari Ücret Tespit Komisyonu Kararı, RG 26/12/2025 sayı 33119.
     Kaynak: ÇSGB Çalışma Hayatı İstatistikleri E-Bülteni (Temmuz 2026 ve Eylül 2026, "Brüt: 33.030,00 TL",
     "Yürürlük Tarihi: 01.01.2026-31.12.2026"); RG sayısı ikincil kaynaktan (Yöntem YMM) ve SGK verisiyle (veri-sgk.js) örtüşüyor.
     Geçerlilik: 01/01/2026. 2026 içinde ara artış yok (ÇSGB Eylül 2026 bülteni). */
  asgariBrut: [
    { baslangic: "2026-01-01", deger: 33030.00 }
  ],

  /* Kıdem tazminatı tavanı (1475 m. 14, bir hizmet yılı için ödenecek en yüksek tutar).
     Kaynak: ÇSGB "Kıdem Tazminatı Yıllık Tavan Miktarı (1980-2026)" tablosu
     (csgb.gov.tr/Media/zewm15ah/kidem-tazminati-yillar-1980-2026.pdf) ve ÇSGB Çalışma Hayatı İstatistikleri
     E-Bülteni Temmuz 2026 / Eylül 2026 (2026/2 dönemi: 73.729,87 TL). */
  kidemTavan: [
    { baslangic: "2025-01-01", deger: 46655.43 }, /* 01/01/2025 – 30/06/2025, ÇSGB tablosu */
    { baslangic: "2025-07-01", deger: 53919.68 }, /* 01/07/2025 – 31/12/2025, ÇSGB tablosu */
    { baslangic: "2026-01-01", deger: 64948.77 }, /* 01/01/2026 – 30/06/2026, ÇSGB tablosu ve e-bülten */
    { baslangic: "2026-07-01", deger: 73729.87 }  /* 01/07/2026 – 31/12/2026, ÇSGB e-bülten Temmuz/Eylül 2026 */
  ],

  /* Gelir vergisi tarifesi, ücret gelirleri (GVK m. 103). 2026 takvim yılı tutarları:
     Seri No: 332 Gelir Vergisi Genel Tebliği, RG 31/12/2025 sayı 33124 (5. Mükerrer); mevzuat.gov.tr GVK m. 103
     metnine parantez içinde işlenmiş hâli. Ücret gelirlerinde üçüncü dilim 1.500.000 TL'ye kadardır.
     Her dilim: [üst sınır, oran]; son dilimin üst sınırı yoktur. Geçerlilik: 01/01/2026 – 31/12/2026. */
  gvUcretTarife: [
    { baslangic: "2026-01-01", deger: [[190000, 0.15], [400000, 0.20], [1500000, 0.27], [5300000, 0.35], [Infinity, 0.40]] }
  ],

  /* Sigortalı (işçi) payları. 5510 m. 81/1-(a): malullük, yaşlılık ve ölüm sigortası primi %21, bunun %9'u sigortalı hissesi
     (7566 sayılı Kanun m. 23 ile işveren hissesi %11'den %12'ye çıktı, sigortalı hissesi %9 kaldı; yürürlük 01/01/2026).
     5510 m. 81/1-(f): genel sağlık sigortası primi %12,5, bunun %5'i sigortalı hissesi.
     Toplam sigortalı payı %14. Kaynak: mevzuat.gov.tr 5510 güncel metni (dipnot 141). */
  sgkIsci: [
    { baslangic: "2026-01-01", deger: 0.14 }
  ],
  /* İşsizlik sigortası primi sigortalı payı %1 (4447 m. 49/1, mevzuat.gov.tr güncel metni). */
  issizlikIsci: [
    { baslangic: "2026-01-01", deger: 0.01 }
  ],
  /* Prime esas kazanç üst sınırı = günlük alt sınırın (asgari ücretin otuzda biri) 9 katı (5510 m. 82/1;
     "7,5" ibaresi 7566 sayılı Kanun m. 24 ile "9" oldu, yürürlük 01/01/2026, mevzuat.gov.tr dipnot 156 ve değişiklik cetveli).
     2026 aylık: 33.030,00 × 9 = 297.270,00 TL (SGK Genelgesi 2026/2 ile örtüşür). Alt sınır = aylık brüt asgari ücret. */
  pekUstKat: [
    { baslangic: "2026-01-01", deger: 9 }
  ],

  /* Damga vergisi: maaş, ücret, tazminat vb. için verilen makbuzlar binde 7,59 (488 sayılı DVK 1 sayılı tablo IV-1-b,
     mevzuat.gov.tr güncel metni). 2 sayılı tablo IV-34: GVK m. 23/18 kapsamındaki ücretlerde istisna aylık brüt asgari ücrete
     isabet eden kısım için uygulanır (7349 sayılı Kanun m. 4). Metinde kanundaki "binde 6" yanında parantez içinde yürürlükteki
     "binde 7,59" gösterilir; 2025–2026 içinde bu bende ilişkin değişiklik dipnotu yoktur. Liste, kıdem tavanının doğrulandığı
     ilk dönemle (01/01/2025) sınırlı tutuldu. */
  damgaOran: [
    { baslangic: "2025-01-01", deger: 0.00759 }
  ],

  /* GVK m. 23/18 (7349 sayılı Kanun m. 2): ödemenin yapıldığı ayda geçerli asgari ücretin aylık brüt tutarından işçi SGK primi ve
     işsizlik primi düşüldükten sonra kalan tutara isabet eden ücretler gelir vergisinden istisnadır; istisnadan doğan vergi,
     ilgili ayda asgari ücret üzerinden hesaplanan vergiyi aşamaz. Araçlar bu tutarı tarifeden ay ay hesaplar
     (2026 aylık istisna matrahı 33.030,00 × 0,85 = 28.075,50 TL). Ayrı bir sabit tutulmaz. */
  asgariIstisnaNot: "GVK m. 23/18; DVK 2 sayılı tablo IV-34"
};
