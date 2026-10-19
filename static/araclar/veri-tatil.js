/* Resmî tatil günleri ve adli tatil (süre hesabı için).
   Son kontrol: 19/10/2026. Yalnızca 2025, 2026 ve 2027 yılları girilmiştir; araç bu aralığın dışını hesaplamaz.

   Dayanak:
   - 2429 sayılı Ulusal Bayram ve Genel Tatiller Hakkında Kanun (RG 19/3/1981, sayı 17284), m. 1 ve m. 2
     (mevzuat.gov.tr güncel metni, 6752 sayılı Kanunla değişik hâli; 15 Temmuz 29/10/2016'dan beri genel tatil).
     m. 1: 29 Ekim Ulusal Bayram; bayram 28 Ekim saat 13.00'te başlar.
     m. 2: 23 Nisan, 19 Mayıs, 30 Ağustos resmî bayram; 1 Ocak, 1 Mayıs, 15 Temmuz genel tatil;
           Ramazan Bayramı arefe günü 13.00'ten itibaren 3,5 gün, Kurban Bayramı arefe günü 13.00'ten itibaren 4,5 gün.
     m. 3: hafta tatili pazar günüdür, cumartesi en geç 13.00'te başlar. Resmî daireler cumartesi de kapalıdır;
           araç cumartesi ve pazarı tatil sayar.
   - Dini bayram tarihleri: Diyanet İşleri Başkanlığı dini günler takvimi
     (mobil.diyanet.gov.tr/mobile/dinigunler/dinigunler.html; 2025 için ayrıca vakithesaplama.diyanet.gov.tr
     "2025 Dini Günler Listesi" ile karşılaştırıldı, örtüşüyor).

   Liste biçimi: {tarih: "YYYY-AA-GG", ad: "..."}; yarim listesi 13.00'ten sonrası tatil olan yarım günlerdir.
   Cumhurbaşkanlığı genelgesiyle verilen idari izin (köprü) günleri resmî tatil değildir, listeye alınmadı. */
window.HV = window.HV || {};
HV.tatil = {
  ilkYil: 2025,
  sonYil: 2027,

  /* Tam gün resmî tatiller */
  tam: [
    /* 2025 */
    { tarih: "2025-01-01", ad: "Yılbaşı" },
    { tarih: "2025-03-30", ad: "Ramazan Bayramı 1. gün" },  /* Diyanet */
    { tarih: "2025-03-31", ad: "Ramazan Bayramı 2. gün" },
    { tarih: "2025-04-01", ad: "Ramazan Bayramı 3. gün" },
    { tarih: "2025-04-23", ad: "Ulusal Egemenlik ve Çocuk Bayramı" },
    { tarih: "2025-05-01", ad: "Emek ve Dayanışma Günü" },
    { tarih: "2025-05-19", ad: "Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
    { tarih: "2025-06-06", ad: "Kurban Bayramı 1. gün" },   /* Diyanet */
    { tarih: "2025-06-07", ad: "Kurban Bayramı 2. gün" },
    { tarih: "2025-06-08", ad: "Kurban Bayramı 3. gün" },
    { tarih: "2025-06-09", ad: "Kurban Bayramı 4. gün" },
    { tarih: "2025-07-15", ad: "Demokrasi ve Millî Birlik Günü" },
    { tarih: "2025-08-30", ad: "Zafer Bayramı" },
    { tarih: "2025-10-29", ad: "Cumhuriyet Bayramı" },
    /* 2026 */
    { tarih: "2026-01-01", ad: "Yılbaşı" },
    { tarih: "2026-03-20", ad: "Ramazan Bayramı 1. gün" },  /* Diyanet */
    { tarih: "2026-03-21", ad: "Ramazan Bayramı 2. gün" },
    { tarih: "2026-03-22", ad: "Ramazan Bayramı 3. gün" },
    { tarih: "2026-04-23", ad: "Ulusal Egemenlik ve Çocuk Bayramı" },
    { tarih: "2026-05-01", ad: "Emek ve Dayanışma Günü" },
    { tarih: "2026-05-19", ad: "Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
    { tarih: "2026-05-27", ad: "Kurban Bayramı 1. gün" },   /* Diyanet */
    { tarih: "2026-05-28", ad: "Kurban Bayramı 2. gün" },
    { tarih: "2026-05-29", ad: "Kurban Bayramı 3. gün" },
    { tarih: "2026-05-30", ad: "Kurban Bayramı 4. gün" },
    { tarih: "2026-07-15", ad: "Demokrasi ve Millî Birlik Günü" },
    { tarih: "2026-08-30", ad: "Zafer Bayramı" },
    { tarih: "2026-10-29", ad: "Cumhuriyet Bayramı" },
    /* 2027 */
    { tarih: "2027-01-01", ad: "Yılbaşı" },
    { tarih: "2027-03-09", ad: "Ramazan Bayramı 1. gün" },  /* Diyanet */
    { tarih: "2027-03-10", ad: "Ramazan Bayramı 2. gün" },
    { tarih: "2027-03-11", ad: "Ramazan Bayramı 3. gün" },
    { tarih: "2027-04-23", ad: "Ulusal Egemenlik ve Çocuk Bayramı" },
    { tarih: "2027-05-01", ad: "Emek ve Dayanışma Günü" },
    { tarih: "2027-05-16", ad: "Kurban Bayramı 1. gün" },   /* Diyanet */
    { tarih: "2027-05-17", ad: "Kurban Bayramı 2. gün" },
    { tarih: "2027-05-18", ad: "Kurban Bayramı 3. gün" },
    { tarih: "2027-05-19", ad: "Kurban Bayramı 4. gün; Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
    { tarih: "2027-07-15", ad: "Demokrasi ve Millî Birlik Günü" },
    { tarih: "2027-08-30", ad: "Zafer Bayramı" },
    { tarih: "2027-10-29", ad: "Cumhuriyet Bayramı" }
  ],

  /* Yarım gün tatiller: saat 13.00'ten itibaren tatil (2429 m. 1 ve m. 2/B) */
  yarim: [
    { tarih: "2025-03-29", ad: "Ramazan Bayramı arefesi" },  /* Diyanet; cumartesi */
    { tarih: "2025-06-05", ad: "Kurban Bayramı arefesi" },   /* Diyanet */
    { tarih: "2025-10-28", ad: "Cumhuriyet Bayramı arifesi" },
    { tarih: "2026-03-19", ad: "Ramazan Bayramı arefesi" },  /* Diyanet */
    { tarih: "2026-05-26", ad: "Kurban Bayramı arefesi" },   /* Diyanet */
    { tarih: "2026-10-28", ad: "Cumhuriyet Bayramı arifesi" },
    { tarih: "2027-03-08", ad: "Ramazan Bayramı arefesi" },  /* Diyanet */
    { tarih: "2027-05-15", ad: "Kurban Bayramı arefesi" },   /* Diyanet; cumartesi */
    { tarih: "2027-10-28", ad: "Cumhuriyet Bayramı arifesi" }
  ],

  /* Adli tatil / çalışmaya ara verme: her yıl 20 Temmuz – 31 Ağustos.
     HMK m. 102 (6494 sayılı Kanunla yeniden düzenlenmiş), CMK m. 331/1, İYUK m. 61/1 (mevzuat.gov.tr güncel metinleri). */
  adliTatil: { baslangic: "07-20", bitis: "08-31" }
};
