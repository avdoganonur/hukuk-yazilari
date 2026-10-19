/* Damga vergisi aracının döneme bağlı oran ve tutarları.
   Liste [{baslangic: "YYYY-AA-GG", deger: {...}}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca 2026 yılı girilmiştir (sonGecerlilik).
   Oranlar: 488 sayılı Damga Vergisi Kanununa ekli (1) sayılı tablo, "Uygulanacak olan" sütunu
   (mevzuat.gov.tr güncel metin, MevzuatNo 488, tertip 5; 19/10/2026'da okundu). Nispi oranlar yeniden değerleme
   ile değişmez.
   Üst sınır: Damga Vergisi Kanunu Genel Tebliği (Seri No: 71), RG 31/12/2025 sayı 33124 (5. Mükerrer),
   m. 3/4: 488 sayılı Kanun m. 14/1'deki her bir kâğıt için üst sınır 1/1/2026'dan itibaren 29.115.961,10 TL
   (mevzuat.gov.tr, MevzuatNo 42881, MevzuatTur 9). Son kontrol: 19/10/2026. */
window.HV = window.HV || {};
HV.damga = {
  sonGecerlilik: "2026-12-31",
  donemler: [
    {
      baslangic: "2026-01-01",
      kaynak: "488 sayılı Kanun (1) sayılı tablo; Damga Vergisi Kanunu Genel Tebliği (Seri No: 71), RG 31/12/2025 sayı 33124 (5. Mükerrer)",
      deger: {
        ustSinir: 29115961.10,
        /* Belge türleri. oran: binde olarak (1) sayılı tablodaki uygulanan oran. */
        belgeler: [
          { kod: "sozlesme", ad: "Sözleşme (mukavelename)", oran: 9.48, tablo: "(1) sayılı tablo I-A-1" },
          { kod: "taahhut", ad: "Taahhütname", oran: 9.48, tablo: "(1) sayılı tablo I-A-1" },
          { kod: "temlik", ad: "Temlikname (alacağın devri)", oran: 9.48, tablo: "(1) sayılı tablo I-A-1" },
          { kod: "kira", ad: "Kira sözleşmesi", oran: 1.89, tablo: "(1) sayılı tablo I-A-2", kira: true },
          { kod: "kefalet", ad: "Kefalet, teminat veya rehin senedi", oran: 9.48, tablo: "(1) sayılı tablo I-A-3" },
          { kod: "sulh", ad: "Tahkimname veya sulhname (belli parayı içeren)", oran: 9.48, tablo: "(1) sayılı tablo I-A-4" },
          { kod: "fesih", ad: "Fesihname", oran: 1.89, tablo: "(1) sayılı tablo I-A-5" },
          { kod: "arac", ad: "İkinci el araç satış ve devir sözleşmesi", oran: 1.89, tablo: "(1) sayılı tablo I-A-6" },
          { kod: "ucret", ad: "Maaş, ücret ödemesi (bordro, makbuz)", oran: 7.59, tablo: "(1) sayılı tablo IV-1-b", ucret: true },
          { kod: "odunc", ad: "Ödünç alınan para için makbuz veya senet", oran: 7.59, tablo: "(1) sayılı tablo IV-1-c" },
          { kod: "ihale", ad: "Resmî dairelerin ihale kararı", oran: 5.69, tablo: "(1) sayılı tablo II-2" }
        ]
      }
    }
  ]
};
