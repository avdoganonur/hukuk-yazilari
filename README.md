# Av. Onur Doğan – hukuk yazıları

Hukukçu olmayan okurlar için yazılmış hukuk yazılarının yayımlandığı site.

**Site:** [avukatonurdogan.com](https://avukatonurdogan.com)

## Nasıl çalışır?

- Yazılar `content/yazilar/` klasöründe, her biri bir Markdown (`.md`) dosyasıdır. Biçim ve içerik kuralları: [YAZIM-KURALLARI.md](YAZIM-KURALLARI.md).
- "Hakkında" ve "Yasal uyarı" sayfaları `content/sayfalar/` altındadır.
- Site adı, adres ve iletişim bilgileri `site.yaml` dosyasındadır.
- `main` dalına her gönderimde GitHub Actions siteyi derleyip GitHub Pages'te yayımlar.

## Yerelde derleme

```bash
pip install -r requirements.txt
python build.py --kontrol   # yalnızca yazıları denetler
python build.py             # siteyi dist/ klasörüne üretir
```

## Lisanslar

Yazı tipleri (Literata, Instrument Sans) SIL Open Font License ile kullanılmaktadır; lisans metinleri `static/fonts/` klasöründedir. Yazıların telif hakkı yazara aittir.
