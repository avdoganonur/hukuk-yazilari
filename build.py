#!/usr/bin/env python3
"""Av. Onur Doğan hukuk yazıları sitesinin derleyicisi.

Kullanım:
    python build.py             siteyi dist/ klasörüne üretir
    python build.py --kontrol   yalnızca yazıları denetler, site üretmez

Yazılar content/yazilar/ altında, her biri bir .md dosyasıdır.
Biçim kuralları için YAZIM-KURALLARI.md dosyasına bakın.
"""
from __future__ import annotations

import datetime as dt
import hashlib
import html
import json
import math
import re
import shutil
import sys
from email.utils import format_datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import markdown
import yaml

KOK = Path(__file__).resolve().parent
YAZILAR = KOK / "content" / "yazilar"
SAYFALAR = KOK / "content" / "sayfalar"
STATIK = KOK / "static"
CIKTI = KOK / "dist"
TZ = ZoneInfo("Europe/Istanbul")
AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
         "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]

# Reklam yasağına aykırı düşebilecek ifadeler: yazıda geçerse derleme durur.
YASAK_IFADELER = [
    r"\ben iyi avukat", r"\buzman avukat", r"\bgarantil", r"\bhemen ara",
    r"\bbizi ara", r"\bbize ula[sş]", r"ücretsiz (hukuki )?dan[ıi]şman",
    r"%\s?100", r"\bkazand[ıi]k\b", r"\bbaşarı oran",
]

SITE = yaml.safe_load((KOK / "site.yaml").read_text(encoding="utf-8"))
URL = SITE["url"].rstrip("/")
BUGUN = dt.datetime.now(TZ).date()


class YaziHatasi(Exception):
    pass


# ---------------------------------------------------------------- yardımcılar

def e(s) -> str:
    return html.escape(str(s), quote=True)


def tarih_tr(d: dt.date) -> str:
    return f"{d.day} {AYLAR[d.month - 1]} {d.year}"


_TR = str.maketrans("çğıöşüÇĞİÖŞÜâîûÂÎÛ", "cgiosuCGIOSUaiuAIU")


def slug(metin: str, ayrac: str = "-") -> str:
    metin = metin.translate(_TR).lower()
    return re.sub(r"[^a-z0-9]+", ayrac, metin).strip(ayrac)


def tam_url(yol: str) -> str:
    return URL + yol


def kelime_say(metin: str) -> int:
    return len(re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)?", metin))


def md_donustur(metin: str) -> str:
    cevirici = markdown.Markdown(
        extensions=["extra", "sane_lists", "smarty", "toc"],
        extension_configs={"toc": {"slugify": lambda v, s: slug(v, s)}},
    )
    cikti = cevirici.convert(metin)
    return cikti.replace("<table>", '<div class="tablo"><table>').replace(
        "</table>", "</table></div>")


# ---------------------------------------------------------------- yazılar

def yazi_oku(yol: Path) -> dict:
    ad = yol.name
    metin = yol.read_text(encoding="utf-8")
    m = re.match(r"\A---\s*\n(.*?)\n---\s*\n(.*)\Z", metin, re.S)
    if not m:
        raise YaziHatasi(f"{ad}: dosya, --- satırları arasında bilgi bölümüyle başlamalı")
    try:
        bilgi = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as hata:
        raise YaziHatasi(f"{ad}: bilgi bölümü okunamadı ({hata})")
    govde = m.group(2).strip() + "\n"
    hatalar, uyarilar = [], []

    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", yol.stem):
        hatalar.append("dosya adı yalnızca küçük harf, rakam ve tire içermeli (Türkçe karakter yok)")

    baslik = bilgi.get("baslik")
    if not isinstance(baslik, str) or not 10 <= len(baslik) <= 110:
        hatalar.append("baslik 10–110 karakter olmalı")
    aciklama = bilgi.get("aciklama")
    if not isinstance(aciklama, str) or not 50 <= len(aciklama) <= 160:
        hatalar.append(f"aciklama 50–160 karakter olmalı (şu an {len(aciklama or '')})")
    tarih = bilgi.get("tarih")
    if not isinstance(tarih, dt.date):
        hatalar.append("tarih YYYY-AA-GG biçiminde olmalı")
    guncelleme = bilgi.get("guncelleme")
    if guncelleme is not None and not isinstance(guncelleme, dt.date):
        hatalar.append("guncelleme YYYY-AA-GG biçiminde olmalı")
    alan = bilgi.get("alan")
    if alan not in SITE["alanlar"]:
        hatalar.append(f"alan şunlardan biri olmalı: {', '.join(SITE['alanlar'])}")

    dayanak = bilgi.get("dayanak") or []
    if not isinstance(dayanak, list) or not dayanak:
        hatalar.append("en az bir dayanak (kanun maddesi) yazılmalı")
    else:
        for i, d in enumerate(dayanak, 1):
            if not isinstance(d, dict) or not isinstance(d.get("ad"), str):
                hatalar.append(f"dayanak {i}: 'ad' alanı eksik")

    sss = bilgi.get("sss") or []
    if not isinstance(sss, list):
        hatalar.append("sss bir liste olmalı")
        sss = []
    for i, s in enumerate(sss, 1):
        if not isinstance(s, dict) or not s.get("soru") or not s.get("cevap"):
            hatalar.append(f"sss {i}: 'soru' ve 'cevap' birlikte yazılmalı")

    if re.search(r"^#\s", govde, re.M):
        hatalar.append("metinde '# ' ile başlayan ana başlık olmamalı; ara başlıklar '## ' ile yazılır")

    tum_metin = " ".join([str(baslik), str(aciklama), govde] +
                         [f"{s.get('soru','')} {s.get('cevap','')}" for s in sss if isinstance(s, dict)])
    if "[doğrulanacak]" in tum_metin.lower() or "[dogrulanacak]" in tum_metin.lower():
        hatalar.append("metinde '[doğrulanacak]' işareti kalmış; doğrulanmayan bilgi yayımlanamaz")
    for kalip in YASAK_IFADELER:
        bulunan = re.search(kalip, tum_metin, re.I)
        if bulunan:
            hatalar.append(f"reklam yasağı açısından sorunlu ifade: '{bulunan.group(0)}'")

    kelime = kelime_say(govde + " ".join(f"{s.get('soru','')} {s.get('cevap','')}"
                                            for s in sss if isinstance(s, dict)))
    if kelime < 700 or kelime > 1600:
        uyarilar.append(f"uzunluk {kelime} kelime (hedef 900–1.200)")

    if hatalar:
        raise YaziHatasi(f"{ad}:\n  - " + "\n  - ".join(hatalar))

    return {
        "slug": yol.stem,
        "baslik": baslik,
        "aciklama": aciklama,
        "tarih": tarih,
        "guncelleme": guncelleme,
        "alan": alan,
        "alan_ad": SITE["alanlar"][alan],
        "dayanak": dayanak,
        "sss": sss,
        "taslak": bool(bilgi.get("taslak", False)),
        "govde": govde,
        "kelime": kelime,
        "dakika": max(1, math.ceil(kelime / 200)),
        "uyarilar": uyarilar,
        "yol": f"/yazilar/{yol.stem}/",
    }


def yazilari_yukle() -> tuple[list[dict], list[str]]:
    yazilar, hatalar = [], []
    for yol in sorted(YAZILAR.glob("*.md")):
        try:
            yazilar.append(yazi_oku(yol))
        except YaziHatasi as h:
            hatalar.append(str(h))
    return yazilar, hatalar


# ---------------------------------------------------------------- şablonlar

CSS_SURUM = ""


def sayfa(*, baslik: str, aciklama: str, yol: str, icerik: str, aktif: str = "",
          og_gorsel: str = "/og/site.png", og_tur: str = "website",
          jsonld: list | None = None, baslik_tam: bool = False) -> str:
    sayfa_basligi = baslik if baslik_tam else f"{baslik} | {SITE['ad']}"
    ld = "".join(
        f'<script type="application/ld+json">{json.dumps(j, ensure_ascii=False)}</script>'
        for j in (jsonld or []))

    def menu(href, ad, anahtar):
        akim = ' aria-current="page"' if aktif == anahtar else ""
        return f'<a href="{href}"{akim}>{ad}</a>'

    y = SITE["yazar"]
    adres = "<br>".join(e(s) for s in y["adres"])
    eposta = (f'<br><a href="mailto:{e(y["eposta"])}">{e(y["eposta"])}</a>'
              if y.get("eposta") else "")
    return f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(sayfa_basligi)}</title>
<meta name="description" content="{e(aciklama)}">
<link rel="canonical" href="{tam_url(yol)}">
<meta property="og:site_name" content="{e(SITE['ad'])}">
<meta property="og:locale" content="tr_TR">
<meta property="og:type" content="{og_tur}">
<meta property="og:title" content="{e(baslik)}">
<meta property="og:description" content="{e(aciklama)}">
<meta property="og:url" content="{tam_url(yol)}">
<meta property="og:image" content="{tam_url(og_gorsel)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f5f7f6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#16191c" media="(prefers-color-scheme: dark)">
<link rel="preload" href="/fonts/literata.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="/style.css?v={CSS_SURUM}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="{e(SITE['ad'])} – yazılar" href="/rss.xml">
{ld}
</head>
<body>
<a class="atla" href="#icerik">İçeriğe geç</a>
<header class="ust">
  <div class="kap ust-ic">
    <a class="imza" href="/">
      <span class="imza-ad">{e(SITE['ad'])}</span>
      <span class="imza-alt">{e(SITE['alt_ad'])}</span>
    </a>
    <nav class="menu" aria-label="Ana menü">
      {menu('/yazilar/', 'Yazılar', 'yazilar')}
      {menu('/hakkinda/', 'Hakkında', 'hakkinda')}
    </nav>
  </div>
</header>
<main id="icerik">
{icerik}
</main>
<footer class="alt">
  <div class="kap alt-izgara">
    <div>
      <p class="alt-ad">{e(y['unvan'])} {e(y['ad'])}</p>
      <p>{e(y['baro'])}, sicil no {e(y['sicil'])}<br>{e(y['buro'])}</p>
    </div>
    <div>
      <p>{adres}</p>
    </div>
    <div>
      <p><a href="tel:{e(y['telefon_uluslararasi'])}">{e(y['telefon'])}</a>{eposta}</p>
      <p><a href="/yasal-uyari/">Yasal uyarı ve gizlilik</a><br><a href="/rss.xml">RSS ile takip et</a></p>
    </div>
  </div>
  <p class="kap alt-not">Bu sitedeki yazılar genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez.</p>
</footer>
</body>
</html>
"""


def dayanak_gruplari(dayanak: list[dict]) -> list[dict]:
    """Dayanakları kanunlara göre gruplar: [{kanun, baglanti, maddeler: [(madde, not)]}]."""
    gruplar: list[dict] = []
    for d in dayanak:
        m = re.match(r"^(.*?)\s+m\.\s*(.+)$", d["ad"])
        kanun, madde = (m.group(1), m.group(2)) if m else (d["ad"], "")
        grup = next((g for g in gruplar if g["kanun"] == kanun), None)
        if grup is None:
            grup = {"kanun": kanun, "baglanti": None, "maddeler": []}
            gruplar.append(grup)
        grup["baglanti"] = grup["baglanti"] or d.get("baglanti")
        grup["maddeler"].append((madde, d.get("not")))
    return gruplar


def dayanak_ozet(yazi: dict) -> str:
    parcalar = []
    for g in dayanak_gruplari(yazi["dayanak"]):
        maddeler = [m for m, _ in g["maddeler"] if m]
        if not maddeler:
            parcalar.append(g["kanun"])
            continue
        metin = f"{g['kanun']} m. {', '.join(maddeler[:3])}"
        if len(maddeler) > 3:
            metin += " ve diğer maddeler"
        parcalar.append(metin)
    return "; ".join(parcalar)


def kayit(yazi: dict, baslik_seviye: int = 3) -> str:
    h = f"h{baslik_seviye}"
    return f"""<li class="kayit">
  <p class="kayit-ust"><a href="/konu/{yazi['alan']}/">{e(yazi['alan_ad'])}</a><time datetime="{yazi['tarih'].isoformat()}">{tarih_tr(yazi['tarih'])}</time></p>
  <{h} class="kayit-baslik"><a href="{yazi['yol']}">{e(yazi['baslik'])}</a></{h}>
  <p class="kayit-ozet">{e(yazi['aciklama'])}</p>
  <p class="dayanak-satir"><span class="muhur" aria-hidden="true"></span><span><span class="gorunmez">Dayanak: </span>{e(dayanak_ozet(yazi))}</span></p>
</li>"""


def liste(yazilar: list[dict], seviye: int = 3) -> str:
    if not yazilar:
        return '<p class="bos">Bu konuda henüz yazı yayımlanmadı.</p>'
    return '<ol class="kayitlar" reversed>' + "\n".join(kayit(y, seviye) for y in yazilar) + "</ol>"


def alan_sayilari(yazilar: list[dict]) -> list[tuple[str, str, int]]:
    sonuc = []
    for anahtar, ad in SITE["alanlar"].items():
        n = sum(1 for y in yazilar if y["alan"] == anahtar)
        if n:
            sonuc.append((anahtar, ad, n))
    return sonuc


def konu_menusu(yazilar: list[dict], aktif: str = "") -> str:
    ogeler = []
    for anahtar, ad, n in alan_sayilari(yazilar):
        akim = ' aria-current="page"' if anahtar == aktif else ""
        ogeler.append(f'<li><a href="/konu/{anahtar}/"{akim}><span>{e(ad)}</span>'
                      f'<span class="sayi">{n} yazı</span></a></li>')
    return "<ul>" + "".join(ogeler) + "</ul>"


def site_jsonld() -> dict:
    y = SITE["yazar"]
    return {
        "@context": "https://schema.org", "@type": "WebSite", "name": SITE["ad"],
        "url": URL + "/", "inLanguage": "tr",
        "publisher": {"@type": "Person", "name": f"{y['unvan']} {y['ad']}", "jobTitle": "Avukat"},
    }


def ana_sayfa(yazilar: list[dict]) -> str:
    son = yazilar[:10]
    tum = '<p class="tum"><a href="/yazilar/">Tüm yazılar</a></p>' if len(yazilar) > 10 else ""
    icerik = f"""<section class="giris kap">
  <div class="giris-metin">
    <h1>Hukuki sorulara sade cevaplar</h1>
    <p class="giris-acik">Hukukçu olmayan okurlar için, günlük hayatta sık karşılaşılan hukuki soruları cevaplayan yazılar. Her yazıda, cevabın dayandığı kanun maddeleri ayrıca gösterilir.</p>
  </div>
  <nav class="konular" aria-labelledby="konular-b">
    <h2 id="konular-b">Konular</h2>
    {konu_menusu(yazilar)}
  </nav>
</section>
<section class="kap liste-bolum" aria-labelledby="son-b">
  <h2 id="son-b" class="bolum-baslik">Son yazılar</h2>
  {liste(son)}
  {tum}
</section>"""
    return sayfa(baslik=f"{SITE['ad']}, {SITE['alt_ad']} – hukuk yazıları", baslik_tam=True,
                 aciklama=SITE["aciklama"], yol="/", icerik=icerik, jsonld=[site_jsonld()])


def tum_yazilar(yazilar: list[dict]) -> str:
    icerik = f"""<section class="kap sayfa-bas">
  <h1>Tüm yazılar</h1>
  <p class="sayfa-acik">{len(yazilar)} yazı, en yeniden eskiye.</p>
  <nav class="konu-serit" aria-label="Konulara göre">{konu_menusu(yazilar)}</nav>
</section>
<section class="kap liste-bolum">{liste(yazilar, 2)}</section>"""
    return sayfa(baslik="Tüm yazılar", aciklama=f"{SITE['ad']} sitesindeki tüm hukuk yazıları.",
                 yol="/yazilar/", icerik=icerik, aktif="yazilar")


def konu_sayfasi(anahtar: str, ad: str, yazilar: list[dict], tumu: list[dict]) -> str:
    icerik = f"""<section class="kap sayfa-bas">
  <p class="ust-baglanti"><a href="/yazilar/">Tüm yazılar</a></p>
  <h1>{e(ad)}</h1>
  <p class="sayfa-acik">{len(yazilar)} yazı.</p>
  <nav class="konu-serit" aria-label="Konulara göre">{konu_menusu(tumu, anahtar)}</nav>
</section>
<section class="kap liste-bolum">{liste(yazilar, 2)}</section>"""
    return sayfa(baslik=f"{ad} yazıları",
                 aciklama=f"{SITE['ad']}: {ad.lower()} alanında hukukçu olmayan okurlar için yazılar.",
                 yol=f"/konu/{anahtar}/", icerik=icerik, aktif="yazilar")


def yazi_sayfasi(yazi: dict, tumu: list[dict]) -> str:
    y = SITE["yazar"]
    govde = md_donustur(yazi["govde"])
    gruplar = dayanak_gruplari(yazi["dayanak"])
    dayanak = ""
    for g in gruplar:
        kanun = (f'<a href="{e(g["baglanti"])}" rel="noopener">{e(g["kanun"])}</a>'
                 if g["baglanti"] else e(g["kanun"]))
        satirlar = "".join(
            f'<li><span class="dayanak-madde">{"m. " + e(m) if m else ""}</span>'
            f'<span class="dayanak-not">{e(n or "")}</span></li>'
            for m, n in g["maddeler"])
        dayanak += f'<div class="dayanak-grup"><p class="dayanak-kanun">{kanun}</p><ul>{satirlar}</ul></div>'
    kanun_ozet = ", ".join(g["kanun"] for g in gruplar)
    sss = ""
    if yazi["sss"]:
        maddeler = "".join(
            f'<details><summary>{e(s["soru"])}</summary><div class="cevap">{md_donustur(str(s["cevap"]))}</div></details>'
            for s in yazi["sss"])
        sss = f'<section class="sss" aria-labelledby="sss-b"><h2 id="sss-b">Sık sorulan sorular</h2>{maddeler}</section>'
    meta = f'<time datetime="{yazi["tarih"].isoformat()}">{tarih_tr(yazi["tarih"])}</time> tarihinde yayımlandı.'
    if yazi["guncelleme"]:
        meta += f' Son güncelleme: <time datetime="{yazi["guncelleme"].isoformat()}">{tarih_tr(yazi["guncelleme"])}</time>.'
    meta += f' Yaklaşık {yazi["dakika"]} dakikalık okuma.'

    ayni = [x for x in tumu if x["alan"] == yazi["alan"] and x["slug"] != yazi["slug"]]
    diger = [x for x in tumu if x["alan"] != yazi["alan"]]
    ilgili = (ayni + diger)[:3]
    ilgili_html = ""
    if ilgili:
        ilgili_html = f"""<section class="kap ilgili" aria-labelledby="ilgili-b">
  <h2 id="ilgili-b" class="bolum-baslik">Diğer yazılar</h2>
  {liste(ilgili)}
</section>"""

    icerik = f"""<article class="yazi kap">
  <header class="yazi-bas">
    <p class="yazi-alan"><a href="/konu/{yazi['alan']}/">{e(yazi['alan_ad'])}</a></p>
    <h1>{e(yazi['baslik'])}</h1>
    <p class="yazi-meta">{meta}</p>
  </header>
  <div class="yazi-izgara">
    <aside class="dayanak" aria-labelledby="dayanak-b">
      <details class="dayanak-kutu" open>
        <summary><h2 id="dayanak-b">Bu yazının dayanağı</h2><span class="dayanak-ozet">{e(kanun_ozet)}</span></summary>
        {dayanak}
        <p class="dayanak-dip">Maddeler, yazının yayım tarihindeki metinlerine göredir.</p>
      </details>
      <script>if(!matchMedia("(min-width: 56em)").matches)document.currentScript.previousElementSibling.open=false</script>
    </aside>
    <div class="yazi-govde">
      {govde}
      {sss}
      <p class="uyari">Bu yazı genel bilgilendirme amaçlıdır; somut durumunuz için bir avukattan hukuki destek almanız önerilir.</p>
      <footer class="yazar">
        <p class="yazar-ad">{e(y['unvan'])} {e(y['ad'])}</p>
        <p>{e(y['baro'])}'na kayıtlı avukat, sicil no {e(y['sicil'])}. {e(y['buro'])}, Kocasinan / Kayseri.</p>
      </footer>
    </div>
  </div>
</article>
{ilgili_html}"""

    ld = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": yazi["baslik"], "description": yazi["aciklama"], "inLanguage": "tr",
        "datePublished": yazi["tarih"].isoformat(),
        "dateModified": (yazi["guncelleme"] or yazi["tarih"]).isoformat(),
        "author": {"@type": "Person", "name": f"{y['unvan']} {y['ad']}", "jobTitle": "Avukat",
                   "url": tam_url("/hakkinda/")},
        "mainEntityOfPage": tam_url(yazi["yol"]),
        "image": tam_url(f"/og/{yazi['slug']}.png"),
        "articleSection": yazi["alan_ad"], "wordCount": yazi["kelime"],
    }
    return sayfa(baslik=yazi["baslik"], aciklama=yazi["aciklama"], yol=yazi["yol"], icerik=icerik,
                 aktif="yazilar", og_gorsel=f"/og/{yazi['slug']}.png", og_tur="article", jsonld=[ld])


def md_sayfa(dosya: str, yol: str, aktif: str = "") -> str:
    metin = (SAYFALAR / dosya).read_text(encoding="utf-8")
    m = re.match(r"\A---\s*\n(.*?)\n---\s*\n(.*)\Z", metin, re.S)
    bilgi = yaml.safe_load(m.group(1))
    govde = md_donustur(m.group(2))
    icerik = f"""<article class="kap duz-sayfa">
  <h1>{e(bilgi['baslik'])}</h1>
  <div class="yazi-govde">{govde}</div>
</article>"""
    return sayfa(baslik=bilgi["baslik"], aciklama=bilgi["aciklama"], yol=yol, icerik=icerik, aktif=aktif)


def bulunamadi() -> str:
    icerik = """<section class="kap sayfa-bas bulunamadi">
  <h1>Bu sayfa bulunamadı</h1>
  <p class="sayfa-acik">Adres değişmiş ya da yanlış yazılmış olabilir. Aradığınız yazıyı tüm yazılar listesinde bulabilirsiniz.</p>
  <p><a class="dugme" href="/yazilar/">Tüm yazıları göster</a></p>
</section>"""
    return sayfa(baslik="Sayfa bulunamadı", aciklama="Aradığınız sayfa bulunamadı.", yol="/404.html",
                 icerik=icerik)


# ---------------------------------------------------------------- akışlar

def rss(yazilar: list[dict]) -> str:
    def tarih(d):
        return format_datetime(dt.datetime(d.year, d.month, d.day, 9, 0, tzinfo=TZ))
    ogeler = "".join(f"""
  <item>
    <title>{e(y['baslik'])}</title>
    <link>{tam_url(y['yol'])}</link>
    <guid isPermaLink="true">{tam_url(y['yol'])}</guid>
    <pubDate>{tarih(y['tarih'])}</pubDate>
    <category>{e(y['alan_ad'])}</category>
    <description>{e(y['aciklama'])}</description>
  </item>""" for y in yazilar[:30])
    return f"""<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>{e(SITE['ad'])} – hukuk yazıları</title>
  <link>{URL}/</link>
  <atom:link href="{URL}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>{e(SITE['aciklama'])}</description>
  <language>tr</language>{ogeler}
</channel>
</rss>
"""


def site_haritasi(yazilar: list[dict]) -> str:
    adresler = [("/", yazilar[0]["tarih"] if yazilar else BUGUN), ("/yazilar/", None),
                ("/hakkinda/", None), ("/yasal-uyari/", None)]
    adresler += [(f"/konu/{a}/", None) for a, _, _ in alan_sayilari(yazilar)]
    adresler += [(y["yol"], y["guncelleme"] or y["tarih"]) for y in yazilar]
    satirlar = "".join(
        f"\n  <url><loc>{tam_url(yol)}</loc>" + (f"<lastmod>{t.isoformat()}</lastmod>" if t else "") + "</url>"
        for yol, t in adresler)
    return f'<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{satirlar}\n</urlset>\n'


# ---------------------------------------------------------------- paylaşım görselleri

def paylasim_gorselleri(yazilar: list[dict]) -> None:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Uyarı: Pillow yok, paylaşım görselleri üretilmedi.")
        return
    fontlar = KOK / "tools" / "fonts"
    mor, murekkep, soluk, kagit = (90, 63, 150), (31, 36, 40), (74, 83, 90), (245, 247, 246)
    hedef = CIKTI / "og"
    hedef.mkdir(parents=True, exist_ok=True)

    def ciz(baslik: str, etiket: str, dosya: Path):
        img = Image.new("RGB", (1200, 630), kagit)
        d = ImageDraw.Draw(img)
        d.rectangle([28, 28, 1171, 601], outline=mor, width=4)
        d.rectangle([40, 40, 1159, 589], outline=mor, width=1)
        etiket_f = ImageFont.truetype(str(fontlar / "InstrumentSans-SemiBold.ttf"), 30)
        d.text((96, 92), etiket, font=etiket_f, fill=mor)
        for boy in range(68, 38, -2):
            f = ImageFont.truetype(str(fontlar / "Literata-SemiBold.ttf"), boy)
            satirlar, satir = [], ""
            for kelime in baslik.split():
                deneme = (satir + " " + kelime).strip()
                if d.textlength(deneme, font=f) <= 1000:
                    satir = deneme
                else:
                    satirlar.append(satir)
                    satir = kelime
            satirlar.append(satir)
            if len(satirlar) <= 4:
                break
        yuk = boy * 1.22
        y = 160 + (300 - yuk * len(satirlar)) / 2
        for s in satirlar:
            d.text((96, y), s, font=f, fill=murekkep)
            y += yuk
        ad_f = ImageFont.truetype(str(fontlar / "Literata-SemiBold.ttf"), 34)
        alt_f = ImageFont.truetype(str(fontlar / "InstrumentSans-Regular.ttf"), 26)
        d.line([96, 486, 1104, 486], fill=(200, 205, 202), width=2)
        d.text((96, 508), SITE["ad"], font=ad_f, fill=murekkep)
        d.text((96, 551), SITE["alt_ad"], font=alt_f, fill=soluk)
        alan_adi = URL.split("//", 1)[-1]
        d.text((1104 - d.textlength(alan_adi, font=alt_f), 551), alan_adi, font=alt_f, fill=mor)
        img.save(dosya, optimize=True)

    ciz("Hukuki sorulara sade cevaplar", "Hukuk yazıları", hedef / "site.png")
    for y in yazilar:
        ciz(y["baslik"], y["alan_ad"], hedef / f"{y['slug']}.png")


# ---------------------------------------------------------------- derleme

def yaz(yol: str, metin: str) -> None:
    dosya = CIKTI / yol.lstrip("/")
    if yol.endswith("/"):
        dosya = dosya / "index.html"
    dosya.parent.mkdir(parents=True, exist_ok=True)
    dosya.write_text(metin, encoding="utf-8")


def main() -> int:
    global CSS_SURUM
    yazilar, hatalar = yazilari_yukle()
    for y in yazilar:
        for u in y["uyarilar"]:
            print(f"Uyarı – {y['slug']}: {u}")
    if hatalar:
        print("Yazılarda düzeltilmesi gereken hatalar var:\n" + "\n".join(hatalar))
        return 1
    sluglar = [y["slug"] for y in yazilar]
    if len(set(sluglar)) != len(sluglar):
        print("Aynı dosya adına sahip iki yazı var.")
        return 1

    yayinda = sorted((y for y in yazilar if not y["taslak"] and y["tarih"] <= BUGUN),
                     key=lambda y: (y["tarih"], y["slug"]), reverse=True)
    bekleyen = [y["slug"] for y in yazilar if y not in yayinda]
    print(f"{len(yayinda)} yazı yayında" + (f", {len(bekleyen)} yazı bekliyor: {', '.join(bekleyen)}" if bekleyen else "."))
    if "--kontrol" in sys.argv:
        return 0

    if CIKTI.exists():
        shutil.rmtree(CIKTI)
    shutil.copytree(STATIK, CIKTI)
    CSS_SURUM = hashlib.md5((STATIK / "style.css").read_bytes()).hexdigest()[:8]

    yaz("/", ana_sayfa(yayinda))
    yaz("/yazilar/", tum_yazilar(yayinda))
    for anahtar, ad, _ in alan_sayilari(yayinda):
        yaz(f"/konu/{anahtar}/", konu_sayfasi(anahtar, ad, [y for y in yayinda if y["alan"] == anahtar], yayinda))
    for y in yayinda:
        yaz(y["yol"], yazi_sayfasi(y, yayinda))
    yaz("/hakkinda/", md_sayfa("hakkinda.md", "/hakkinda/", "hakkinda"))
    yaz("/yasal-uyari/", md_sayfa("yasal-uyari.md", "/yasal-uyari/"))
    yaz("/404.html", bulunamadi())
    yaz("/rss.xml", rss(yayinda))
    yaz("/sitemap.xml", site_haritasi(yayinda))
    yaz("/robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {URL}/sitemap.xml\n")
    alan_adi = URL.split("//", 1)[-1]
    if not alan_adi.endswith("github.io"):
        yaz("/CNAME", alan_adi + "\n")
    paylasim_gorselleri(yayinda)
    print(f"Site {CIKTI.relative_to(KOK)}/ klasörüne üretildi.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
