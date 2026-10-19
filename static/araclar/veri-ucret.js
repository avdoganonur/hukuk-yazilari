/* Vekâlet ve arabuluculuk ücreti araçlarının tarife değerleri (TL ve yüzde).
   Listeler [{baslangic: "YYYY-AA-GG", deger: ...}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca yürürlükteki tarifeler girilmiştir; daha önceki tarifelerin tutarları bu dosyada yoktur.
   Son kontrol: 19/10/2026. Bağımsız denetim (19/10/2026): genel hükümler ve ek, mevzuat.gov.tr'deki
   9.5.42687 metni ve 9.5.42687-Ek.doc dosyasıyla; 2026 arabuluculuk tarifesi 9.5.42809 metni ve 9.5.42809-EK.doc ile karşılaştırıldı. */
window.HV = window.HV || {};
HV.ucret = {
  /* Avukatlık Asgari Ücret Tarifesi (AAÜT). Kaynak: Türkiye Barolar Birliği tarifesi, RG 04/11/2025 sayı 33067;
     yürürlük: yayımı tarihinde (Tarife m. 24). Değişiklikler: RG 08/01/2026 sayı 33131 (m. 10/2 yürürlükten kaldırıldı),
     RG 28/03/2026 sayı 33207 (m. 14/5 değişti). Tutarlar mevzuat.gov.tr'deki konsolide tarifenin ekinden
     (9.5.42687-Ek.doc, son değişiklik 30/03/2026) alınmıştır; TBB'nin 03/11/2025 tarihli karşılaştırma cetveliyle örtüşür.
     Tarife m. 21: ücretin takdirinde hükmün verildiği tarihte yürürlükte olan tarife esas alınır. */
  aaut: [
    {
      baslangic: "2025-11-04",
      deger: {
        ad: "AAÜT (RG 04/11/2025, sayı 33067)",
        /* Üçüncü kısım: konusu para olan işler, dilimli oranlar (yüzde). */
        dilimler: [
          { tutar: 600000, oran: 16 },   /* ilk 600.000 TL */
          { tutar: 600000, oran: 15 },   /* sonra gelen 600.000 TL */
          { tutar: 1200000, oran: 14 },  /* sonra gelen 1.200.000 TL */
          { tutar: 1200000, oran: 13 },  /* sonra gelen 1.200.000 TL */
          { tutar: 1800000, oran: 11 },  /* sonra gelen 1.800.000 TL */
          { tutar: 2400000, oran: 8 },   /* sonra gelen 2.400.000 TL */
          { tutar: 3000000, oran: 5 },   /* sonra gelen 3.000.000 TL */
          { tutar: 3600000, oran: 3 },   /* sonra gelen 3.600.000 TL */
          { tutar: 4200000, oran: 2 }    /* sonra gelen 4.200.000 TL */
        ],
        sonOran: 1,                      /* 18.600.000 TL'den yukarısı için %1 */
        /* m. 11/1: takip miktarı bu tutara kadar olan icra takiplerinde ücret, icra dairesi maktu ücretidir. */
        icraEsik: 56250,
        /* İkinci kısım maktu ücretler. kisim: "2/2-10" = ikinci kısım ikinci bölüm 10. sıra. */
        maktu: {
          sulhHukuk: { tutar: 30000, kisim: "2/2-8", ad: "Sulh hukuk mahkemeleri" },
          asliye: { tutar: 45000, kisim: "2/2-10", ad: "Asliye mahkemeleri" },
          tuketici: { tutar: 22500, kisim: "2/2-11", ad: "Tüketici mahkemeleri" },
          tuketiciUyarlama: { tutar: 20000, kisim: "2/1-5", ad: "Tüketici mahkemelerinde kredi taksitlerinin veya faizinin uyarlanması davaları (konusu para olsa da maktu)" },
          fikri: { tutar: 55000, kisim: "2/2-12", ad: "Fikri ve sınai haklar mahkemeleri" },
          icraDairesi: { tutar: 9000, kisim: "2/2-1", ad: "İcra dairelerinde yapılan takipler" },
          icraMahIs: { tutar: 11000, kisim: "2/2-2", ad: "İcra mahkemelerinde takip edilen işler" },
          icraMahDava: { tutar: 18000, kisim: "2/2-3", ad: "İcra mahkemelerinde dava ve duruşmalı işler" },
          icraCeza: { tutar: 15000, kisim: "2/2-5", ad: "İcra mahkemelerinde ceza işleri" },
          tahliyeTakip: { tutar: 20000, kisim: "2/2-4", ad: "Tahliyeye ilişkin icra takipleri" },
          sorusturma: { tutar: 11000, kisim: "2/2-7", ad: "Ceza soruşturma evresi" },
          sulhCeza: { tutar: 18000, kisim: "2/2-9", ad: "Sulh ceza ve infaz hâkimlikleri" },
          agirCeza: { tutar: 65000, kisim: "2/2-13", ad: "Ağır ceza mahkemeleri" },
          cocuk: { tutar: 45000, kisim: "2/2-14", ad: "Çocuk mahkemeleri" },
          idareDurusmasiz: { tutar: 30000, kisim: "2/2-17-a", ad: "İdare ve vergi mahkemeleri, duruşmasız" },
          idareDurusmali: { tutar: 40000, kisim: "2/2-17-b", ad: "İdare ve vergi mahkemeleri, duruşmalı" },
          vergiDurusmasiz: { tutar: 30000, kisim: "2/1-4-a", ad: "Vergi mahkemeleri, duruşmasız (konusu para olsa da maktu)" },
          vergiDurusmali: { tutar: 40000, kisim: "2/1-4-b", ad: "Vergi mahkemeleri, duruşmalı (konusu para olsa da maktu)" },
          bamIlk: { tutar: 35000, kisim: "2/2-18-a", ad: "Bölge adliye ve bölge idare mahkemelerinde ilk derecede görülen davalar" },
          istinafBir: { tutar: 22000, kisim: "2/2-18-b", ad: "İstinaf yoluyla görülen, bir duruşması olan işler" },
          istinafCok: { tutar: 42000, kisim: "2/2-18-c", ad: "İstinaf yoluyla görülen, birden fazla duruşması veya keşfi olan işler" },
          temyizDurusma: { tutar: 40000, kisim: "2/2-22", ad: "Yargıtay, Danıştay ve Sayıştay'da temyiz yoluyla görülen işlerin duruşması" },
          ortaklik: { tutar: 40000, kisim: "2/1-3", ad: "Ortaklığın giderilmesi ve taksim davaları (konusu para olsa da maktu)" },
          ihtiyatiDurusmasiz: { tutar: 10000, kisim: "2/1-1-a", ad: "Dava dışında ihtiyati haciz, ihtiyati tedbir, delil tespiti; duruşmasız" },
          ihtiyatiDurusmali: { tutar: 12500, kisim: "2/1-1-b", ad: "Dava dışında ihtiyati haciz, ihtiyati tedbir, delil tespiti; duruşmalı" }
        }
      }
    }
  ],

  /* 2026 Yılı Arabuluculuk Asgari Ücret Tarifesi. Kaynak: Adalet Bakanlığı, RG 26/12/2025 sayı 33119;
     yürürlük 01/01/2026 (Tarife m. 11). Tutarlar mevzuat.gov.tr'deki tarifenin ekinden (9.5.42809-EK.doc).
     Tarife m. 10: faaliyetin sona erdiği tarihte yürürlükte olan tarife esas alınır. */
  arabuluculuk: [
    {
      baslangic: "2026-01-01",
      deger: {
        ad: "2026 Yılı Arabuluculuk Asgari Ücret Tarifesi (RG 26/12/2025, sayı 33119)",
        /* Birinci kısım: bir saatlik ücret. iki: 2 taraf varsa TARAF BAŞINA; uc5: 3-5 taraf, alti10: 6-10 taraf,
           onbir: 11 ve daha fazla taraf (bu üçü taraf sayısı gözetilmeksizin toplam). */
        saat: {
          aile: { ad: "Aile hukuku", iki: 1000, uc5: 2200, alti10: 2300, onbir: 2400 },
          ticari: { ad: "Ticari", iki: 1500, uc5: 3200, alti10: 3300, onbir: 3400 },
          is: { ad: "İşçi-işveren", iki: 1130, uc5: 2460, alti10: 2560, onbir: 2660 },
          tuketici: { ad: "Tüketici", iki: 1000, uc5: 2200, alti10: 2300, onbir: 2400 },
          kira: { ad: "Kira, komşu hakkı ve kat mülkiyeti", iki: 1170, uc5: 2540, alti10: 2640, onbir: 2740 },
          ortaklik: { ad: "Ortaklığın giderilmesi", iki: 1170, uc5: 2540, alti10: 2640, onbir: 2740 },
          diger: { ad: "Diğer", iki: 1000, uc5: 2200, alti10: 2300, onbir: 2400 }
        },
        /* İkinci kısım: üzerinde anlaşılan miktarın dilimleri; tek = bir arabulucu, cok = birden fazla arabulucu (yüzde). */
        dilimler: [
          { tutar: 600000, tek: 6, cok: 9 },
          { tutar: 960000, tek: 5, cok: 7.5 },
          { tutar: 1560000, tek: 4, cok: 6 },
          { tutar: 3120000, tek: 3, cok: 4.5 },
          { tutar: 9360000, tek: 2, cok: 3 },
          { tutar: 12480000, tek: 1.5, cok: 2.5 },
          { tutar: 24960000, tek: 1, cok: 1.5 }
        ],
        sonTek: 0.5, sonCok: 1,          /* 53.040.000 TL'den yukarısı */
        altSinir: 9000,                  /* m. 7/7: anlaşmada ücret 9.000 TL'den az olamaz */
        altSinirTicari: 13000,           /* m. 7/6: ticari ve ortaklığın giderilmesi uyuşmazlıklarında 13.000 TL'den az olamaz */
        seriTicari: 7500, seriDiger: 6000 /* m. 7/4: seri uyuşmazlıklarda her uyuşmazlık için (araçta hesaplanmaz, bilgi) */
      }
    }
  ]
};
