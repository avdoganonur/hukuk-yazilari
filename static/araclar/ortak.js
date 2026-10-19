/* Hesaplama araçlarının ortak yardımcıları. Her araç sayfası bu dosyayı yükler.
   Hesaplar tarayıcıda yapılır; girilen bilgiler hiçbir yere gönderilmez. */
(function () {
  "use strict";
  var AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
    "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  var HA = {};

  /* "1.234.567,89", "1234567,89", "1234567.89" ve "1 234,5" biçimlerini sayıya çevirir. */
  HA.sayi = function (deger) {
    if (typeof deger === "number") return deger;
    var s = String(deger || "").trim().replace(/\s|TL|₺/gi, "");
    if (!s) return NaN;
    if (s.indexOf(",") >= 0) s = s.replace(/\./g, "").replace(",", ".");
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
    return Number(s);
  };

  HA.yuvarla = function (n, basamak) {
    var k = Math.pow(10, basamak === undefined ? 2 : basamak);
    return Math.round((n + Number.EPSILON) * k) / k;
  };

  HA.biçim = HA.bicim = function (n, basamak) {
    if (!isFinite(n)) return "–";
    var b = basamak === undefined ? 2 : basamak;
    return n.toLocaleString("tr-TR", { minimumFractionDigits: b, maximumFractionDigits: b });
  };

  HA.tl = function (n) { return HA.bicim(n, 2) + " TL"; };
  HA.yuzde = function (n, basamak) { return "%" + HA.bicim(n, basamak === undefined ? 2 : basamak); };

  /* Tarihler UTC gece yarısı olarak tutulur; saat dilimi kaymaz. */
  HA.tarih = function (s) {
    if (s instanceof Date) return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || "").trim());
    if (!m) return null;
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return d.getUTCMonth() === +m[2] - 1 ? d : null;
  };
  HA.iso = function (d) { return d.toISOString().slice(0, 10); };
  HA.tarihYaz = function (d, gunAdi) {
    var s = d.getUTCDate() + " " + AYLAR[d.getUTCMonth()] + " " + d.getUTCFullYear();
    return gunAdi ? s + " " + GUNLER[d.getUTCDay()] : s;
  };
  HA.gunEkle = function (d, n) { return new Date(d.getTime() + n * 86400000); };
  HA.gunFarki = function (a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); };
  /* Ay ekleme: hedef ayda aynı gün yoksa ayın son günü alınır (TBK m. 92 / HMK m. 92 mantığı). */
  HA.ayEkle = function (d, n) {
    var y = d.getUTCFullYear(), a = d.getUTCMonth() + n, g = d.getUTCDate();
    var son = new Date(Date.UTC(y, a + 1, 0)).getUTCDate();
    return new Date(Date.UTC(y, a, Math.min(g, son)));
  };
  HA.yilEkle = function (d, n) { return HA.ayEkle(d, 12 * n); };

  /* Döneme bağlı değerler: liste [{baslangic: "2026-01-01", deger: ...}, ...] (artan sırada). */
  HA.donem = function (liste, tarih) {
    var t = HA.tarih(tarih) || tarih, sec = null;
    for (var i = 0; i < liste.length; i++) {
      if (HA.tarih(liste[i].baslangic) <= t) sec = liste[i];
    }
    return sec;
  };

  function el(etiket, sinif, metin) {
    var x = document.createElement(etiket);
    if (sinif) x.className = sinif;
    if (metin !== undefined) x.textContent = metin;
    return x;
  }
  HA.el = el;

  /* Sonuç kutusu: {baslik, ana: [etiket, değer], satirlar: [[etiket, değer, "vurgu"?]], notlar: [..]} */
  HA.goster = function (kutu, s) {
    kutu.replaceChildren();
    kutu.hidden = false;
    if (s.baslik) kutu.appendChild(el("h2", "sonuc-baslik", s.baslik));
    if (s.ana) {
      var ana = el("p", "sonuc-ana");
      ana.appendChild(el("span", "sonuc-ana-etiket", s.ana[0]));
      ana.appendChild(el("span", "sonuc-ana-deger", s.ana[1]));
      kutu.appendChild(ana);
    }
    if (s.satirlar && s.satirlar.length) {
      var t = el("table", "sonuc-tablo");
      if (s.basliklar) {
        var th = el("thead"), tr0 = el("tr");
        s.basliklar.forEach(function (b, i) { var h = el("th", i ? "sayi-hucre" : "", b); h.scope = "col"; tr0.appendChild(h); });
        th.appendChild(tr0); t.appendChild(th);
      }
      var tb = el("tbody");
      s.satirlar.forEach(function (r) {
        var tr = el("tr", r[r.length - 1] === "vurgu" ? "vurgu" : "");
        var hucreler = r[r.length - 1] === "vurgu" ? r.slice(0, -1) : r;
        hucreler.forEach(function (h, i) {
          var c = el(i ? "td" : "th", i ? "sayi-hucre" : "", h);
          if (!i) c.scope = "row";
          tr.appendChild(c);
        });
        tb.appendChild(tr);
      });
      t.appendChild(tb);
      kutu.appendChild(t);
    }
    (s.notlar || []).forEach(function (n) { kutu.appendChild(el("p", "sonuc-not", n)); });
    if (s.odak !== false) { kutu.tabIndex = -1; kutu.focus({ preventScroll: true }); }
    if (window.matchMedia && window.matchMedia("(max-width: 55.99em)").matches) {
      kutu.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  HA.hata = function (kutu, mesaj) {
    kutu.replaceChildren(el("p", "sonuc-hata", mesaj));
    kutu.hidden = false;
  };

  /* Formu bağlar: hesapla(f) bir sonuç nesnesi döndürür ya da Error fırlatır.
     f.sayi("ad"), f.tarih("ad"), f.deger("ad"), f.secili("ad") ile alanlar okunur. */
  HA.bagla = function (form, kutu, hesapla) {
    function oku() {
      return {
        deger: function (ad) { var x = form.elements[ad]; return x ? String(x.value).trim() : ""; },
        sayi: function (ad, ad2) {
          var v = HA.sayi(this.deger(ad));
          if (!isFinite(v)) throw new Error((ad2 || "Bu alan") + " için geçerli bir sayı girin.");
          return v;
        },
        sayiVarsa: function (ad, varsayilan) { var v = HA.sayi(this.deger(ad)); return isFinite(v) ? v : varsayilan; },
        tarih: function (ad, ad2) {
          var d = HA.tarih(this.deger(ad));
          if (!d) throw new Error((ad2 || "Tarih") + " için geçerli bir tarih girin.");
          return d;
        },
        secili: function (ad) { var x = form.elements[ad]; return !!(x && x.checked); }
      };
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      try { HA.goster(kutu, hesapla(oku())); }
      catch (h) { HA.hata(kutu, h && h.message ? h.message : "Hesaplanamadı. Girdiğiniz bilgileri kontrol edin."); }
    });
    form.addEventListener("reset", function () { kutu.hidden = true; kutu.replaceChildren(); });
  };

  /* Para giriş alanlarını yazarken binlik ayraçla biçimler. */
  document.addEventListener("change", function (ev) {
    var x = ev.target;
    if (!x.matches || !x.matches("input[data-para]")) return;
    var v = HA.sayi(x.value);
    if (isFinite(v) && x.value.trim()) x.value = HA.bicim(v, 2);
  });

  window.HA = HA;
})();
