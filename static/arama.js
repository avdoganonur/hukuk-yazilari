/* Site içi arama: sorgular bir arama hizmetine gönderilmez. */
(function () {
  'use strict';
  function normalize(text) {
    return String(text).toLocaleLowerCase('tr-TR').replace(/ı/g, 'i')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function prepare(items) {
    return items.map(item => ({ ...item, title: normalize(item.baslik),
      summary: normalize(item.aciklama), area: normalize(item.alan), body: normalize(item.metin) }));
  }
  function search(items, query) {
    const phrase = normalize(query);
    if (phrase.length < 2) return [];
    const terms = [...new Set(phrase.split(' '))];
    return items.map(item => {
      const all = [item.title, item.summary, item.area, item.body].join(' ');
      if (!terms.every(term => all.includes(term))) return null;
      let score = item.title.includes(phrase) ? 100 : 0;
      for (const term of terms) score += (item.title.includes(term) ? 15 : 0) +
        (item.summary.includes(term) ? 5 : 0) + (item.area.includes(term) ? 3 : 0);
      return { item, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.item.baslik.localeCompare(b.item.baslik, 'tr'))
      .map(result => result.item);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalize, prepare, search };
  if (typeof document === 'undefined') return;
  const app = document.getElementById('arama-uygulamasi');
  if (!app) return;
  const input = document.getElementById('arama-q');
  const status = document.getElementById('arama-durum');
  const list = document.getElementById('arama-sonuclar');
  const more = document.getElementById('arama-devam');
  const retry = document.getElementById('arama-tekrar');
  let index = null, loading = null, matches = [], shown = 0, revision = 0, timer;
  function appendResults() {
    const chunk = matches.slice(shown, shown + 20);
    for (const item of chunk) {
      const li = document.createElement('li');
      const area = document.createElement('p'); area.className = 'kayit-ust'; area.textContent = item.alan;
      const heading = document.createElement('h2'); heading.className = 'kayit-baslik';
      const link = document.createElement('a');
      const url = new URL(item.url, location.origin);
      if (url.origin !== location.origin || !url.pathname.includes('/yazilar/')) continue;
      link.href = url.href; link.textContent = item.baslik; heading.append(link);
      const summary = document.createElement('p'); summary.className = 'kayit-ozet'; summary.textContent = item.aciklama;
      li.append(area, heading, summary); list.append(li);
    }
    shown += chunk.length;
    more.hidden = shown >= matches.length;
    status.textContent = matches.length ? `${matches.length} yazı bulundu; ${shown} sonuç gösteriliyor.` :
      'Sonuç bulunamadı. Daha kısa bir kelime veya farklı bir ifade deneyin.';
  }
  async function run() {
    const current = ++revision;
    const query = input.value.trim().slice(0, 160);
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    list.replaceChildren(); more.hidden = true; retry.hidden = true;
    if (normalize(query).length < 2) { status.textContent = 'Aramak için en az iki harf yazın.'; return; }
    status.textContent = 'Yazılar aranıyor…';
    try {
      if (!index) {
        if (!loading) loading = fetch(app.dataset.index).then(response => {
          if (!response.ok) throw new Error('index unavailable');
          return response.json();
        }).then(prepare).finally(() => { loading = null; });
        index = await loading;
      }
      if (current !== revision) return;
      matches = search(index, query); shown = 0; appendResults();
    } catch (_) {
      if (current !== revision) return;
      status.textContent = 'Arama verileri yüklenemedi. Bağlantınızı kontrol edip yeniden deneyin.';
      retry.hidden = false;
    }
  }
  document.getElementById('arama-form').addEventListener('submit', event => { event.preventDefault(); clearTimeout(timer); run(); });
  input.addEventListener('input', () => { clearTimeout(timer); ++revision; timer = setTimeout(run, 180); });
  more.addEventListener('click', appendResults);
  retry.addEventListener('click', run);
  window.addEventListener('popstate', () => { input.value = new URLSearchParams(location.search).get('q') || ''; run(); });
  input.value = (new URLSearchParams(location.search).get('q') || '').slice(0, 160);
  run();
}());
