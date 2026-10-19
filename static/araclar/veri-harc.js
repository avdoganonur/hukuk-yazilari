/* Harç araçlarının döneme bağlı tutar ve oranları.
   Liste [{baslangic: "YYYY-AA-GG", deger: {...}}] biçiminde ve artan sıradadır (HA.donem ile okunur).
   Yalnızca 2026 yılı girilmiştir: araçlar 01/01/2026 - 31/12/2026 arasını kapsar (sonGecerlilik).
   Ana kaynak: Harçlar Kanunu Genel Tebliği (Seri No: 98), RG 31/12/2025 sayı 33124 (5. Mükerrer); tebliğ
   metni ve eki mevzuat.gov.tr, MevzuatNo 42887, MevzuatTur 9. Tebliğ 1/1/2026'da yürürlüğe girdi. Tebliğ eki
   (Tarife.xlsx) 492 sayılı Kanuna bağlı tarifelerdeki 2026 tutarlarını ve uygulanan oranları gösterir.
   Maktu tutarlar 30/12/2025 tarihli ve 10783 sayılı Cumhurbaşkanı Kararıyla %18,95 artırılmıştır (tebliğ m. 3).
   Son kontrol: 19/10/2026 (mevzuat.gov.tr tebliğ listesinde Seri No 98 ve 99'dan sonra yeni Harçlar Kanunu
   Genel Tebliği yok). */
window.HV = window.HV || {};
HV.harc = {
  sonGecerlilik: "2026-12-31",
  donemler: [
    {
      baslangic: "2026-01-01",
      kaynak: "Harçlar Kanunu Genel Tebliği (Seri No: 98), RG 31/12/2025 sayı 33124 (5. Mükerrer)",
      deger: {
        /* (1) sayılı tarife A-I Başvurma harcı (Seri No 98 eki). */
        basvurma: {
          sulh: 335.20,       // A-I-1 Sulh mahkemelerinde, icra tetkik mercilerinde
          asliye: 732.00,     // A-I-2 Asliye mahkemelerinde, idare mahkemelerinde
          ust: 1124.50        // A-I-3 Bölge adliye/idare mahkemeleri, Yargıtay, Danıştay
        },
        /* A-III-1-a Nispi karar ve ilam harcı: binde 68,31 (Seri No 98 eki; kanundaki binde 54 Cumhurbaşkanı
           yetkisiyle artırılmış uygulanan oran). "Nispi harçlar (732 TL)'den aşağı olamaz." */
        nispiOran: 0.06831,
        nispiAsgari: 732.00,
        /* A-III-2-a Maktu karar ve ilam harcı (değeri belli olmayan davalar, davanın reddi kararı). */
        maktuKarar: 732.00,
        /* A-III-2-b (a) bendindeki davalarda Yargıtay/Danıştay esasa ilişkin kararları. */
        maktuKararUst: 1526.20,
        /* A-IV Temyiz ve istinaf harçları. */
        istinaf: 2002.00,     // A-IV-e Bölge adliye mahkemesi hukuk dairelerine istinaf başvurusu
        temyiz: 3608.50,      // A-IV-a Yargıtay hukuk dairelerine temyiz başvurusu
        /* D-I-c Avukatların tasdik ettiği vekaletname suretlerinden suret harcı ("vekalet harcı"). */
        vekaletSuret: 104.00,
        /* B-I İcra harçları. */
        icraBasvurma: 732.00, // B-I-1 İcraya başvurma harcı
        /* 492 sayılı Kanun m. 29: ilama dayanmayan takiplerde alacak miktarının binde beşi peşin alınır
           (kanun metni, mevzuat.gov.tr; oran tebliğle değişmez). */
        icraPesinOran: 0.005,
        /* B-I-3 Değeri belli takiplerde tahsil harcı (Seri No 98 eki). */
        tahsil: {
          hacizOncesi: 0.0455,  // a) ödeme/icra emrinin tebliği üzerine hacizden önce ödenen paralardan %4,55
          hacizSonrasi: 0.0910, // b) hacizden sonra ve satıştan önce ödenen paralardan %9,10
          satis: 0.1138,        // c) haczedilen/rehinli malların satılmasıyla tahsil olunan paralardan %11,38
          maas: 0.0455          // d) maaş ve ücret haczi suretiyle tahsil olunan paralardan %4,55
        },
        /* (4) sayılı tarife I-20-a: ivaz karşılığı devir ve iktisapta, emlak vergisi değerinden az olmamak
           üzere beyan edilen bedel üzerinden devreden ve devralan için ayrı ayrı binde 20
           (7566 sayılı Kanun m. 8 ile değişik ibare, yürürlük 19/12/2025; Seri No 98 eki). */
        tapuOran: 0.020,
        /* 2548 sayılı Ceza Evleriyle Mahkeme Binaları İnşası Karşılığı Olarak Alınacak Harçlar ... Kanunu m. 1:
           icra dairelerince miktarı belli ilamlı ve ilamsız alacaklardan tahsil olunan paranın %2'si; borçluya
           yükletilemez (mevzuat.gov.tr, MevzuatNo 2548, tertip 3). */
        cezaevi: 0.02,
        /* Vekâlet pulu: 1136 sayılı Avukatlık Kanunu m. 27'ye göre pul değeri, 492 sayılı Kanunun yargı
           harçları bölümündeki vekâletname örnekleri harcının %50 fazlası ve ayrıca %5 ilavedir:
           104 x 1,5 x 1,05 = 163,80 TL (1136 sayılı Kanun m. 27, mevzuat.gov.tr; 104 TL Seri No 98 eki D-I-c).
           Pulun satış bedelini TBB ilan eder. 2026 bedeli olarak basına yansıyan 164 TL (TBB Duyuru 2025/71)
           TBB sayfasından doğrulanamadı (denetim 19/10/2026: sayfa açılmadı, tek ikincil kaynak var). Bu nedenle
           satış bedeli veride yok; araçlar yalnızca kanundaki hesabı gösterir ve pulu toplama katmaz. */
        vekaletPulu: null,
        vekaletPuluKanuniKat: 1.5 * 1.05,
        /* Hukuk Muhakemeleri Kanunu Gider Avansı Tarifesi m. 4 (Adalet Bakanlığı, RG 28/10/2025 sayı 33061,
           yayımı tarihinde yürürlükte; mevzuat.gov.tr MevzuatNo 42679): taraf sayısının beş katı tebligat ücreti
           + diğer iş ve işlemler için 530 TL. Tebligat ücreti PTT tarifesine bağlıdır ve burada yoktur. */
        giderAvansiSabit: 530.00,
        giderAvansiTebligatKat: 5
      }
    }
  ]
};
