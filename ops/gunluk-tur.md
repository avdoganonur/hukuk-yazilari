# Günlük makale turu (zamanlanmış görev) – çalışma düzeni

Bu dosya zamanlanmış görevin çalışma düzenidir; site çıktısına girmez. (16.11.2026'da oturum ortamı sıfırlandığı için scratchpad'deki saatlik.md, ek.md, denetci-ek.md ve yayinla.sh buraya taşındı.)

Onur 24.10.2026: "Günde 2 makaleye çek şimdilik" → TUR BAŞINA 2 YAZI.

## Her tetiklemede sırayla
0. ZİNCİR: İlk iş send_later (initiation human_schedule, name "Günde 2 makale (avukatonurdogan.com)") ile ertesi gün aynı saatin :02'sine aynı mesajı kur.
1. DEPO: /home/claude/hukuk-yazilari, dal yazilar-100 (taslak dalı). Yoksa: `git clone`, `git fetch origin yazilar-100:yazilar-100 && git checkout yazilar-100`. Yayın için ayrı worktree: /home/claude/araclar-wt (detached origin/main). Depo yerel ayarı mutlaka: `git config user.name "Onur Doğan"; git config user.email "343915022+avdoganonur@users.noreply.github.com"` (ortam sıfırlanınca kaybolur; her tur kontrol et). Kişisel e-posta ASLA.
2. KONU: ops/geo-konular.md'de "- [ ]" varsa önce onlar; yoksa `git ls-tree --name-only origin/main content/yazilar/` ile işlenmemiş somut 2 soru seç (az yazılı alanlara öncelik: borçlar, tüketici, vergi/idare, icra/usul, ceza; iş ve aile arada). Aynı slug yok.
3. YAZ: konu başına bir yazar alt ajanı (arka planda). Talimat: ops/talimatlar.md (yazar bölümü) + ops/ek-kurallar.md. Atıf listesi: scratchpad/grup-30/<slug>.atiflar.txt (scratchpad silinebilir; kayıp önemli değil).
4. DENETLE: yazar bitince ayrı denetçi alt ajanı. Talimat: ops/talimatlar.md (denetçi bölümü) + ops/ek-kurallar.md. YAYINLANAMAZ denen yayınlanmaz.
5. Ara kayıt: stop hook temiz ağaç ister; taslakları yazilar-100'e commit+push et.
6. YAYINLA: `git -C /home/claude/hukuk-yazilari show origin/main:ops/yayinla.sh > /tmp/yayinla.sh && bash /tmp/yayinla.sh "Yeni yazılar: ..." <slug1> <slug2>` (betik kendi geçici worktree.sini açar). Sonra `gh run list -R avdoganonur/hukuk-yazilari -L 1` ile "Siteyi yayınla" başarı kontrolü. geo-konular'dan seçildiyse satırları "- [x]" yap.
7. PİN (Onur 22.10.2026): Metricool (blogId 7460259) bağlıysa her yazı için Pinterest pini: providers [{"network":"pinterest"}], media ["https://avukatonurdogan.com/og/<slug>.png"], pinterestData {"boardId":"774619273348500994","pinTitle": kurumsal başlık ≤100 karakter,"pinLink":"https://avukatonurdogan.com/yazilar/<slug>/","pinNewFormat":true}, text = aciklama. Günde en çok 2 pin (11:00 ve 19:00 İstanbul), dolu saatleri atla. Bağlı değilse ops/pin-bekleyen.md'ye ekle.
8. BİLDİR: SendUserMessage ile kısa Türkçe: yayınlanan başlıklar, önemli düzeltmeler, yayınlanmayan varsa nedeni, bekleyen pin sayısı.

Kurallar: Türk hukuku; reklam yasağı; karar künyesi yalnız resmî karar aramada bulunursa; değişken tutar yok; Instagram/WhatsApp/Facebook açılmaz; mevzuat.gov.tr/resmigazete WebFetch engelini aşmaya çalışma.
Durdurma: Onur "görevi durdur" derse zincir kurulmaz, bekleyen send_later delete_trigger ile silinir.
