# DESIGN.md: avukatonurdogan.com

Bu dosya sitenin görsel dilini tanımlar. Siteye yeni bir sayfa, bölüm ya da araç ekleyen herkes (insan ya da yapay zekâ) buna uyar. Değerler `static/style.css` dosyasındaki gerçek değerlerdir; ikisi çelişirse style.css esastır ve bu dosya güncellenir.

## Karakter

Sakin, okunaklı, güven veren bir hukuk bilgilendirme sitesi. Bir gazetenin hukuk köşesi ya da iyi dizilmiş bir kitap gibi okunur; bir pazarlama sayfası gibi değil. Hukukçu olmayan okur için yazılır: önce kısa ve net cevap, sonra ayrıntı ve dayanak.

Avukatlık reklam yasağı (Av. K. m.55, TBB Reklam Yasağı Yönetmeliği) tasarımın da sınırıdır: "hemen arayın" düğmeleri, başarı rozetleri, müvekkil yorumları, ücret ya da kampanya kutuları, sayaçlar, övücü başlıklar yok. Tek iletişim öğesi sağ alttaki WhatsApp balonu ve Hakkında sayfasıdır.

## Renkler

### 21 Ekim 2026 tasarım güncellemesi

Açık tema sıcak kâğıt (#f6f3ed), lacivert mürekkep (#192b3b), ikincil metin (#54606b), çizgi (#dcd7ce), bronz vurgu (#825c33) ve açık vurgu (#eee6da) kullanır. Koyu temada vurgu #dfbb89, açık vurgu #30312f olur; diğer koyu tema değerleri korunur. Aşağıdaki eski renk tablosunun yerine bu değerler geçerlidir.

Ana sayfa rehberi iki temada da `--panel` (#192b3b), `--panel-metin` (#fffaf2), `--panel-ikincil` (#ccd4da), `--panel-vurgu` (#dfbb89), `--panel-cizgi` (#465460) kullanır.

Ana sayfa 56em ve üzerinde tanıtım ve konu rehberi olarak iki sütundur; dar ekranlarda tek sütuna iner. Yazı listeleri geniş ekranda iki sütun, dar ekranda tek sütundur. Literata bölüm ve liste başlıklarında da kullanılır; makale gövdesi sistem sans olarak korunur. Metinler iki yana yaslanmaz. Ana başlık 2.7–4.8rem, satır yüksekliği 1.13; liste başlığı 1.5rem olur. Üst bant 3px, kart köşeleri 4px olarak güncellenir. Makale içeriği, URL'ler, arama ve hesaplama işlevleri değişmez.

Tümü `:root` üzerinde değişkendir; koyu tema `prefers-color-scheme: dark` ile aynı adları yeniden tanımlar. Kodda renk değeri yazılmaz, yalnız değişken kullanılır.

| Rol | Değişken | Açık | Koyu | Kullanım |
|---|---|---|---|---|
| Zemin | `--kagit` | #f7f8f6 | #101d25 | Sayfa arka planı |
| Yüzey | `--yuzey` | #ffffff | #182a34 | Üst bant, kutular |
| Mürekkep | `--murekkep` | #172d3b | #edf3f3 | Metin, başlık |
| İkincil | `--ikincil` | #4b5e68 | #bacbd0 | Tarih, açıklama, not |
| Çizgi | `--cizgi` | #d5dfdd | #344952 | Ayırıcılar, kenarlıklar |
| Vurgu | `--mor` | #17675f | #8dd5c3 | Bağlantı, odak, düğme, üst bandın 4px şeridi |
| Vurgu açık | `--mor-acik` | #e9f2ee | #203831 | "Kısaca" kutusu zemini |
| Vurgu üstü | `--mor-uzerinde` | #ffffff | #101d25 | Vurgu zeminindeki yazı |

Not: değişkenin adı `--mor` olsa da renk koyu yeşil-petroldür; adı değiştirme (tüm kod buna bağlı). Yeni renk eklenmez; gerekiyorsa önce bu tabloya eklenir. Degrade, parıltı, dekoratif gölge yok.

## Yazı tipleri

- **Literata** (serif, `--serif`): yalnızca h1 başlıkları, büro imzası, yazar adı. Yerel dosya: `static/fonts/literata.woff`, italik ayrı dosya.
- **Sistem sans** (`--sans`: system-ui, -apple-system, Segoe UI, Arial): gövde metni, menü, ara başlıklar, araç formları. style.css'te Instrument Sans için @font-face tanımı var ama `--sans` onu içermez; şu an kullanılmıyor.
- İki aileden fazlası eklenmez. Harici yazı tipi servisi (Google Fonts vb.) kullanılmaz; yazı tipleri depodadır (SIL OFL lisansları `static/fonts/`).

## Ölçek

- Gövde: 1.125rem (telefon), 1.25rem (≥48em); satır aralığı 1.8. Satır uzunluğu en çok yaklaşık 46rem (`.kayitlar`, `.yazi-bas`).
- Ana sayfa h1: `clamp(2.5rem, 1.45rem + 4.6vw, 4.6rem)`, satır aralığı 1.02, ağırlık 500, harf aralığı -0.024em, genişlik en çok 11ch.
- Sayfa h1: `clamp(2.25rem, 1.6rem + 2.8vw, 3.4rem)`. Yazı h1: `clamp(2rem, 1.35rem + 2.8vw, 3.1rem)`.
- Liste başlıkları: `clamp(1.375rem, 1.1rem + 1vw, 1.75rem)`.
- Küçük metin (tarih, meta, atıf): 0.8125–0.9375rem, `--ikincil` renginde.
- Bir sayfada beşten fazla yazı boyutu kullanılmaz.

## Yerleşim

- Kap: `.kap`, en çok 72rem, iç boşluk 1rem (telefon) ve 2rem (≥48em). Her bölüm bu kabı kullanır; iki yan boşluk eşittir.
- Üst bant: üstte 4px vurgu şeridi, altta 1px çizgi, `--yuzey` zemin. Solda büro imzası (Literata), sağda menü. 34em altında satır kırılır.
- Yazı sayfası sırası değişmez: alan etiketi, h1, meta (tarih, okuma süresi, yazı boyutu düğmesi), "Kısaca" kutusu (sol kenarda 3px vurgu çizgisi, `--mor-acik` zemin), içindekiler, metin, Sık sorulanlar, Dayanak, yazar kutusu, ilgili yazılar.
- Hesaplama aracı sayfası: başlık, kısa açıklama, form, sonuç tablosu, "Nasıl hesaplanır", "Dayanak ve kaynaklar", genel uyarı.
- Köşe yuvarlaması: düğme ve küçük kutularda 3–6px, etiket ve yazı boyutu düğmesinde tam yuvarlak (999px). Başka yarıçap eklenmez.

## Bileşenler

- **Bağlantı:** vurgu rengi, 1px alt çizgi, üzerine gelince 2px.
- **Düğme (`.dugme`):** düz vurgu zemini, `--mor-uzerinde` yazı, 4px köşe; ikincil düğme kenarlıklı. Bir ekranda tek ana düğme.
- **Odak:** her etkileşimli öğede `:focus-visible` 2px vurgu çerçevesi, 3px boşluk. Kaldırılmaz.
- **"İçeriğe atla" bağlantısı** (`.atla`) her sayfada kalır.
- **WhatsApp balonu (`.wa`):** sağ alt, sabit. Oturum başına bir kez 3 saniye sonra kendiliğinden açılır (Onur'un isteği). Panelde hassas bilgi paylaşmama uyarısı bulunur. Telefonda sayfa altına 5rem boşluk bırakılır ki balon içeriği örtmesin.
- **Tablolar (araç sonuçları):** satır çizgileri serbesttir; telefonda yatay kaydırma kutusu içinde.

## Hareket

Yok denecek kadar az. Geçişler yalnız renk ve kenarlıkta, 150 ms civarında; okuma ilerleme çubuğu yalnız `prefers-reduced-motion: no-preference` iken hareket eder. Kaydırmaya bağlı animasyon, açılış animasyonu, otomatik oynayan medya yok. `prefers-reduced-motion` her yeni harekette dikkate alınır.

## Görseller

Yazılarda görsel zorunlu değildir; metin ve tablo esastır. Kullanılırsa: telifi uygun, açıklayıcı `alt` metinli, kişisel veri ya da müvekkil bilgisi içermeyen görseller. Stok "terazi, tokmak, el sıkışma" fotoğrafları kullanılmaz. Sosyal paylaşım görselleri `build.py` tarafından Pillow ile üretilir.

## Erişilebilirlik ve performans

- Metin ile zemin arasında en az WCAG AA kontrast; yeni renk çifti eklenmeden önce kontrol edilir.
- Her sayfada tek h1, sıralı başlıklar, anlamlı bağlantı metinleri.
- Harici betik, izleme kodu ya da çerez yok. Konum haritası (Google Haritalar iframe'i) yalnızca okur "haritayı aç" düğmesine basınca yüklenir. Araçlar girilen bilgiyi hiçbir yere göndermez.
- Telefon (390px) ve masaüstü (1280px) genişliklerinde yatay kaydırma olmamalı.

## Kontrol

Tasarım değişikliğinden sonra: `python3 build.py --kontrol` hatasız; 390px ve 1280px genişliklerde ekran görüntüsü alınıp bakılır; açık ve koyu tema ikisi de denenir.
