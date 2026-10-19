/* Sosyal güvenlik borçlanma araçlarının döneme bağlı değerleri.
   Listeler [{baslangic: "YYYY-AA-GG", deger: ...}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca doğrulanabilen dönemler girilmiştir; araçlar bu aralık dışındaki başvuru tarihlerini kabul etmez. */
window.HV = window.HV || {};
HV.sgk = {
  /* Değerlerin geçerli olduğu son gün (2026 asgari ücret dönemi sonu). Yeni dönem girilince güncellenmeli. */
  sonGecerlilik: "2026-12-31",

  /* Prime esas günlük kazanç alt sınırı = 16 yaşından büyükler için günlük asgari ücret (5510 m. 82/1).
     2026: 1.101,00 TL (aylık 33.030,00 TL). Asgari Ücret Tespit Komisyonu kararı, RG 26/12/2025 sayı 33119.
     Kaynak: SGK Genelgesi 2026/2 (07/01/2026, Prime Esas Kazançların Alt ve Üst Sınırları ile Bazı İşlemlere Esas Tutarlar).
     sgk.gov.tr'ye erişilemediği için genelgenin İSMMMO'da yayımlanan imzalı örneğinden okundu
     (ismmmo.org.tr/dosya/5846/Mevzuat-Dosya/09012026-2026-2-prime-esas-kazanclar.pdf); alomaliye.com ile örtüşüyor.
     Geçerlilik: 01/01/2026 – 31/12/2026. */
  pekAlt: [
    { baslangic: "2026-01-01", deger: 1101.00 }
  ],

  /* Prime esas günlük kazanç üst sınırı = alt sınırın 9 katı (5510 m. 82/1, "9 katı" ibaresi 7566 sayılı Kanun m. 24 ile getirildi;
     mevzuat.gov.tr güncel metni). 2026: 9.909,00 TL (aylık 297.270,00 TL). Kaynak: SGK Genelgesi 2026/2. Geçerlilik: 01/01/2026. */
  pekUst: [
    { baslangic: "2026-01-01", deger: 9909.00 }
  ],

  /* 5510 m. 41/1-(a) (doğum ve analık izni borçlanması) oranı: %32.
     Kaynak: 5510 m. 41/1 son cümlesi, mevzuat.gov.tr güncel metni (7566 sayılı Kanun m. 21 ile düzenlenen hâli; RG 19/12/2025).
     SGK Genelgesi 2026/2 borçlanma tablosu: günlük 352,32 – 3.170,88 TL. Geçerlilik: 01/01/2026. */
  oran41a: [
    { baslangic: "2026-01-01", deger: 0.32 }
  ],

  /* 5510 m. 41/1'in (a) dışındaki bentleri (askerlik borçlanması m. 41/1-b dahil) oranı: %45.
     Kaynak: 5510 m. 41/1 son cümlesi; 4/12/2025 tarihli 7566 sayılı Kanun m. 21 ile "%32'si" ibaresi
     "(a) bendinde bulunanlar için %32'si diğerleri için %45'i" olarak değiştirildi (mevzuat.gov.tr dipnot 67; RG 19/12/2025).
     Yürürlük 01/01/2026 (SGK Genelgesi 2026/2 bu oranı 2026 için uyguluyor: günlük 495,45 – 4.459,05 TL). */
  oran41diger: [
    { baslangic: "2026-01-01", deger: 0.45 }
  ],

  /* 3201 sayılı Kanun m. 4/1: yurt dışı borçlanmasında günlük borç = seçilen günlük kazancın %45'i
     (7186 sayılı Kanun m. 9 ile %32'den %45'e, yürürlük 01/08/2019; mevzuat.gov.tr güncel metni, dipnot 5).
     Liste, kazanç sınırları doğrulanan dönemle (2026) sınırlı tutuldu. SGK Genelgesi 2026/2: günlük 495,45 – 4.459,05 TL.
     m. 4/1'deki Cumhurbaşkanının farklı alt sınır belirleme yetkisi 2026 için kullanılmamış görünüyor (genelgedeki alt tutar = 1.101,00 × %45). */
  oran3201: [
    { baslangic: "2026-01-01", deger: 0.45 }
  ]
};
