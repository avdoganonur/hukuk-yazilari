/* TÜFE on iki aylık ortalamalara göre değişim oranları (yüzde), aylık. TBK m. 344 kira artış sınırı için.
   Her kayıt bir VERİ ayıdır: baslangic "2026-09-01" = Eylül 2026 için TÜİK'in açıkladığı oran.
   Kaynak: TÜİK Tüketici Fiyat Endeksi aylık haber bültenleri (2026'dan itibaren 2025=100 bazlı endeks).
   TÜİK veri portalına (veriportali.tuik.gov.tr) bu çalışmada erişilemedi; her değer TÜİK bültenini aktaran iki
   bağımsız ikincil kaynakla doğrulandı (ikincil kaynak):
     A: Alomaliye.com "Enflasyon Rakamları (TÜFE)" bülten aktarımları ("Kaynak: TÜİK"); her bülten aynı ayın son üç
        yılını verir. 2023 Ocak, Şubat, Mayıs ve Ağustos için A yerine CNN Türk (Ocak 2023), Muhasebenews (Şubat 2023),
        NTV (Mayıs 2023) ve Cumhuriyet (Ağustos 2023) haberleri kullanıldı.
     B: ayboga.av.tr "Kira artış oranı" tablosu (yenileme ayına göre; veri ayı bir önceki aydır).
     Ekim 2025 – Eylül 2026 için ayrıca hesaplama.net tablosu ve Alomaliye "Yıllara göre enflasyon oranları" tablosu örtüşüyor.
   Doğrulanmayan ay girilmemiştir. İlk veri ayı Ocak 2023, son veri ayı Eylül 2026 (TÜİK, 05/10/2026).
   Bağımsız denetim (19/10/2026, resmî kaynak): TCMB "Enflasyon Verileri - Tüketici Fiyatları" sayfasındaki TÜİK
   kaynaklı yıllık ve aylık TÜFE değişimlerinden (Ocak 2021 – Eylül 2026) endeks zinciri kurularak on iki aylık
   ortalama değişim yeniden hesaplandı; Ocak 2023 – Eylül 2026 arasındaki 45 ayın tamamı en çok 0,01 puan
   yuvarlama farkıyla örtüşüyor (https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Enflasyon+Verileri/).
   Son kontrol: 19/10/2026. */
window.HV = window.HV || {};
HV.tufe = {
  ilkAy: "2023-01",
  sonAy: "2026-09",
  ort12: [
    { baslangic: "2023-01-01", deger: 72.45 },
    { baslangic: "2023-02-01", deger: 71.83 },
    { baslangic: "2023-03-01", deger: 70.20 },
    { baslangic: "2023-04-01", deger: 67.20 },
    { baslangic: "2023-05-01", deger: 63.72 },
    { baslangic: "2023-06-01", deger: 59.95 },
    { baslangic: "2023-07-01", deger: 57.45 },
    { baslangic: "2023-08-01", deger: 56.28 },
    { baslangic: "2023-09-01", deger: 55.30 },
    { baslangic: "2023-10-01", deger: 54.26 },
    { baslangic: "2023-11-01", deger: 53.40 },
    { baslangic: "2023-12-01", deger: 53.86 },
    { baslangic: "2024-01-01", deger: 54.72 },
    { baslangic: "2024-02-01", deger: 55.91 },
    { baslangic: "2024-03-01", deger: 57.50 },
    { baslangic: "2024-04-01", deger: 59.64 },
    { baslangic: "2024-05-01", deger: 62.51 },
    { baslangic: "2024-06-01", deger: 65.07 },
    { baslangic: "2024-07-01", deger: 65.93 },
    { baslangic: "2024-08-01", deger: 64.91 },
    { baslangic: "2024-09-01", deger: 63.47 },
    { baslangic: "2024-10-01", deger: 62.02 },
    { baslangic: "2024-11-01", deger: 60.45 },
    { baslangic: "2024-12-01", deger: 58.51 },
    { baslangic: "2025-01-01", deger: 56.35 },
    { baslangic: "2025-02-01", deger: 53.83 },
    { baslangic: "2025-03-01", deger: 51.26 },
    { baslangic: "2025-04-01", deger: 48.73 },
    { baslangic: "2025-05-01", deger: 45.80 },
    { baslangic: "2025-06-01", deger: 43.23 },
    { baslangic: "2025-07-01", deger: 41.13 },
    { baslangic: "2025-08-01", deger: 39.62 },
    { baslangic: "2025-09-01", deger: 38.36 },
    { baslangic: "2025-10-01", deger: 37.15 },
    { baslangic: "2025-11-01", deger: 35.91 },
    { baslangic: "2025-12-01", deger: 34.88 },
    { baslangic: "2026-01-01", deger: 33.98 },
    { baslangic: "2026-02-01", deger: 33.39 },
    { baslangic: "2026-03-01", deger: 32.82 },
    { baslangic: "2026-04-01", deger: 32.43 },
    { baslangic: "2026-05-01", deger: 32.24 },
    { baslangic: "2026-06-01", deger: 32.03 },
    { baslangic: "2026-07-01", deger: 31.90 },
    { baslangic: "2026-08-01", deger: 31.79 },
    { baslangic: "2026-09-01", deger: 31.49 }
  ],
  /* Konut kiralarında %25 sınırı: TBK geçici m. 1 (7409 sayılı Kanun m. 4 ile eklendi, kabul 08/06/2022):
     maddenin yürürlüğe girdiği tarihten 01/07/2023'e kadar (dahil) yenilenen dönemler; TBK geçici m. 2
     (7456 sayılı Kanun m. 23 ile eklendi, kabul 14/07/2023): 02/07/2023 – 01/07/2024 (dahil) arasında yenilenen dönemler.
     Kaynak: mevzuat.gov.tr, 6098 sayılı TBK konsolide metni. Araç Şubat 2023'ten önceki yenilemeleri kabul etmediği
     için geçici m. 1'in başlangıç tarihine ihtiyaç duymaz. TÜFE oranı %25'in altındaysa TÜFE oranı geçerlidir. */
  konut25: { bitis: "2024-07-01", oran: 25 }
};
