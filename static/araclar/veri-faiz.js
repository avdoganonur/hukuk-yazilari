/* Faiz araçlarının döneme bağlı oranları (yıllık, yüzde).
   Listeler [{baslangic: "YYYY-AA-GG", deger: ...}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca doğrulanabilen dönemler girilmiştir: araçlar 01/01/2006'dan önceki tarihleri kabul etmez.
   Son kontrol: 19/10/2026. */
window.HV = window.HV || {};
HV.faiz = {
  /* Kabul edilen en eski tarih. 01/01/2006 öncesi kanuni faiz oranları resmî kaynaktan doğrulanamadı. */
  enEski: "2006-01-01",
  /* Kanuni faiz ve kanuna göre belirlenen avans faizi bu tarihe kadar bellidir
     (2026'nın ikinci yarısı oranı 30/06/2026'daki TCMB oranına göre belirlendi). 2027 oranı 31/12/2026'daki
     TCMB oranına bağlıdır; o tarih gelmeden 2027 hesaplanmaz. */
  sonGecerlilik: "2026-12-31",
  /* TCMB tablosunun son kontrol tarihi. */
  tcmbKontrol: "2026-10-19",

  /* Kanuni faiz (3095 m. 1; 3095 m. 2/1 uyarınca temerrüt faizi de bu orandır). */
  kanuni: [
    /* %9: 19/12/2005 tarihli ve 2005/9831 sayılı Bakanlar Kurulu Kararı, RG 30/12/2005 sayı 26039; geçerlilik 01/01/2006.
       Resmî Gazete metnine ulaşılamadı; Andersen Türkiye "Temerrüt Faizi" bülteni (2024/26), Gün Avukatlık
       bilgi notu ve TÜRMOB Resmî Gazete arşivi kaydı örtüşüyor (ikincil kaynak). */
    { baslangic: "2006-01-01", deger: 9 },
    /* %24: 20/05/2024 tarihli ve 8485 sayılı Cumhurbaşkanı Kararı, RG 21/05/2024 sayı 32552
       (RG tarih ve sayısı mevzuat.gov.tr Cumhurbaşkanı Kararları kaydından); geçerlilik 01/06/2024.
       Oran ve başlangıç: Andersen Türkiye bülteni, Gün Avukatlık bilgi notu ve Ulaştırma ve Altyapı Bakanlığı
       "Kanuni ve temerrüt faiz oranları" tablosu (uab.gov.tr, 09/09/2026) örtüşüyor. */
    { baslangic: "2024-06-01", deger: 24 },
    /* %31: 3095 m. 1, 7589 sayılı Kanun m. 10 ile değişik (RG 31/07/2026 sayı 33326, 7589 m. 26/1-c uyarınca
       yayımı tarihinde yürürlükte; mevzuat.gov.tr). Kural: TCMB'nin önceki yılın 31 Aralık günü kısa vadeli kredi
       işlemlerinde uyguladığı reeskont oranının yüzde sekseni. 31/12/2025'teki reeskont oranı %38,75
       (TCMB, 20/12/2025'ten beri) x 0,80 = %31. 30/06/2026'daki oran da %38,75 olduğundan (5 puan fark yok)
       yılın ikinci yarısında değişmez. Ulaştırma ve Altyapı Bakanlığı tablosu da 31/07/2026'dan itibaren %31 gösteriyor. */
    { baslangic: "2026-07-31", deger: 31 }
  ],

  /* TCMB avans işlemlerinde uygulanan faiz oranı (ve reeskont iskonto oranı), TCMB'nin kendi değişiklik tarihleriyle.
     Kaynak: TCMB "Reeskont ve Avans Faiz Oranları" sayfası (tcmb.gov.tr > Temel Faaliyetler > Para Politikası),
     19/10/2026'da okundu; tabloda 20/12/2025'ten sonra değişiklik yok. 2005 satırları TCMB'nin eski "a19.pdf"
     tablosuyla da örtüşüyor. deger: avans faiz oranı, reeskont: reeskont iskonto oranı.
     Bu liste araçlarda doğrudan kullanılmaz; aşağıdaki avansKanun ve kanuni faiz değerlerinin dayanağıdır
     (3095 m. 2/2 oranı yıl içindeki her TCMB değişikliğinde değil, yılda bir/iki kez belirler). */
  avansTcmb: [
    { baslangic: "2005-12-20", deger: 25,    reeskont: 23 },
    { baslangic: "2006-12-20", deger: 29,    reeskont: 27 },
    { baslangic: "2007-12-28", deger: 27,    reeskont: 25 },
    { baslangic: "2009-04-09", deger: 20,    reeskont: 19 },
    { baslangic: "2009-06-12", deger: 19,    reeskont: 18 },
    { baslangic: "2009-12-22", deger: 16,    reeskont: 15 },
    { baslangic: "2010-12-30", deger: 15,    reeskont: 14 },
    { baslangic: "2011-12-29", deger: 17.75, reeskont: 17 },
    { baslangic: "2012-06-19", deger: 16.5,  reeskont: 16 },
    { baslangic: "2012-12-20", deger: 13.75, reeskont: 13.5 },
    { baslangic: "2013-06-21", deger: 11,    reeskont: 9.5 },
    { baslangic: "2013-12-27", deger: 11.75, reeskont: 10.25 },
    { baslangic: "2014-12-14", deger: 10.5,  reeskont: 9 },
    { baslangic: "2016-12-31", deger: 9.75,  reeskont: 8.75 },
    { baslangic: "2018-06-29", deger: 19.5,  reeskont: 18.5 },
    { baslangic: "2019-10-11", deger: 18.25, reeskont: 17.25 },
    { baslangic: "2019-12-21", deger: 13.75, reeskont: 12.75 },
    { baslangic: "2020-06-13", deger: 10,    reeskont: 9 },
    { baslangic: "2020-12-19", deger: 16.75, reeskont: 15.75 },
    { baslangic: "2021-12-31", deger: 15.75, reeskont: 14.75 },
    { baslangic: "2022-12-31", deger: 10.75, reeskont: 9.75 },
    { baslangic: "2023-06-24", deger: 16.75, reeskont: 15.75 },
    { baslangic: "2023-09-01", deger: 26.75, reeskont: 25.75 },
    { baslangic: "2023-09-28", deger: 31.75, reeskont: 30.75 },
    { baslangic: "2023-11-01", deger: 36.75, reeskont: 35.75 },
    { baslangic: "2023-12-01", deger: 41.75, reeskont: 40.75 },
    { baslangic: "2023-12-23", deger: 44.25, reeskont: 43.25 },
    { baslangic: "2024-04-01", deger: 51.75, reeskont: 50.75 },
    { baslangic: "2024-12-28", deger: 49.25, reeskont: 48.25 },
    { baslangic: "2025-03-08", deger: 44.25, reeskont: 43.25 },
    { baslangic: "2025-09-17", deger: 42.25, reeskont: 41.25 },
    { baslangic: "2025-12-20", deger: 39.75, reeskont: 38.75 }
  ],

  /* Ticari işlerde avans faizi, 3095 m. 2/2'nin metnine göre: yıl boyunca TCMB'nin önceki yılın 31 Aralık günü
     uyguladığı avans oranı; 30 Haziran'daki oran bundan 5 puan veya daha çok farklıysa yılın ikinci yarısında
     (1 Temmuz'dan) 30 Haziran oranı. Değerler yukarıdaki TCMB tablosundan bu kurala göre çıkarıldı.
     Not: 3095 m. 2/2 bu oranın kanuni faizden fazla olması hâlinde uygulanır; araçlar ikisinden yükseğini alır. */
  avansKanun: [
    { baslangic: "2006-01-01", deger: 25 },    /* 31/12/2005: %25; 30/06/2006: %25 */
    { baslangic: "2007-01-01", deger: 29 },    /* 31/12/2006: %29; 30/06/2007: %29 */
    { baslangic: "2008-01-01", deger: 27 },    /* 31/12/2007: %27; 30/06/2008: %27; 2009 başı da %27 */
    { baslangic: "2009-07-01", deger: 19 },    /* 30/06/2009: %19, 31/12/2008'deki %27'den 8 puan farklı */
    { baslangic: "2010-01-01", deger: 16 },    /* 31/12/2009: %16; 30/06/2010: %16 */
    { baslangic: "2011-01-01", deger: 15 },    /* 31/12/2010: %15; 30/06/2011: %15 */
    { baslangic: "2012-01-01", deger: 17.75 }, /* 31/12/2011: %17,75; 30/06/2012: %16,50 (fark 1,25 puan) */
    { baslangic: "2013-01-01", deger: 13.75 }, /* 31/12/2012: %13,75; 30/06/2013: %11 (fark 2,75 puan) */
    { baslangic: "2014-01-01", deger: 11.75 }, /* 31/12/2013: %11,75; 30/06/2014: %11,75 */
    { baslangic: "2015-01-01", deger: 10.5 },  /* 31/12/2014: %10,50; 2015 ve 2016 boyunca değişmedi */
    { baslangic: "2017-01-01", deger: 9.75 },  /* 31/12/2016: %9,75; 30/06/2017: %9,75; 2018 başı da %9,75 */
    { baslangic: "2018-07-01", deger: 19.5 },  /* 30/06/2018: %19,50, 31/12/2017'deki %9,75'ten 9,75 puan farklı; 2019 da %19,50 */
    { baslangic: "2020-01-01", deger: 13.75 }, /* 31/12/2019: %13,75; 30/06/2020: %10 (fark 3,75 puan) */
    { baslangic: "2021-01-01", deger: 16.75 }, /* 31/12/2020: %16,75; 30/06/2021: %16,75 */
    { baslangic: "2022-01-01", deger: 15.75 }, /* 31/12/2021: %15,75; 30/06/2022: %15,75 */
    { baslangic: "2023-01-01", deger: 10.75 }, /* 31/12/2022: %10,75 */
    { baslangic: "2023-07-01", deger: 16.75 }, /* 30/06/2023: %16,75 (fark 6 puan) */
    { baslangic: "2024-01-01", deger: 44.25 }, /* 31/12/2023: %44,25 */
    { baslangic: "2024-07-01", deger: 51.75 }, /* 30/06/2024: %51,75 (fark 7,5 puan) */
    { baslangic: "2025-01-01", deger: 49.25 }, /* 31/12/2024: %49,25 */
    { baslangic: "2025-07-01", deger: 44.25 }, /* 30/06/2025: %44,25 (fark tam 5 puan) */
    { baslangic: "2026-01-01", deger: 39.75 }  /* 31/12/2025: %39,75; 30/06/2026: %39,75 */
  ]
};
