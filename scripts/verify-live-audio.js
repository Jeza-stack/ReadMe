/*
  Verify live audio assets on Vercel
  - Reads filenames from local public/data/*.json
  - Fetches https://read-me-self.vercel.app/data/<file>.json
  - Extracts `audio` fields from each vocabulary entry
  - Requests each audio URL and verifies 200 + >0 bytes
  - Prints missing or broken audio
*/
const fs = require('fs');
const path = require('path');

const LIVE_BASE = process.env.LIVE_BASE || 'https://read-me-self.vercel.app';
const DATA_DIR = path.resolve(__dirname, '../public/data');

function listDataFiles() {
  return fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function toAbsoluteUrl(p) {
  if (!p) return null;
  const rel = p.startsWith('/') ? p : `/${p}`;
  return `${LIVE_BASE}${rel}`;
}

async function fetchAudio(url) {
  const res = await fetch(url);
  if (!res.ok) return { ok: false, status: res.status, size: 0 };
  const buf = Buffer.from(await res.arrayBuffer());
  return { ok: true, status: res.status, size: buf.length };
}

async function withLimit(items, limit, worker) {
  const results = [];
  let idx = 0;
  const running = new Set();
  async function runOne(i) {
    const p = worker(items[i]).then((r) => { running.delete(p); results[i] = r; });
    running.add(p);
    await p;
  }
  while (idx < items.length) {
    while (running.size < limit && idx < items.length) {
      void runOne(idx++);
    }
    if (running.size > 0) {
      await Promise.race(Array.from(running));
    }
  }
  return results;
}

(async () => {
  const red = (s) => `\x1b[31m${s}\x1b[0m`;
  const green = (s) => `\x1b[32m${s}\x1b[0m`;
  const yellow = (s) => `\x1b[33m${s}\x1b[0m`;

  const files = listDataFiles();
  const problems = [];
  let totalChecked = 0;

  console.log(`Verifying live audio at ${LIVE_BASE} for ${files.length} dataset(s)\n`);

  for (const file of files) {
    const jsonUrl = `${LIVE_BASE}/data/${file}`;
    try {
      const data = await fetchJson(jsonUrl);
      const vocab = Array.isArray(data.vocabulary) ? data.vocabulary : [];
      console.log(`- ${file}: ${vocab.length} entries`);
      const checks = await withLimit(vocab, 10, async (entry) => {
        totalChecked += 1;
        const label = `${file} -> ${entry.word}`;
        if (!entry.audio) {
          problems.push(`${label}: missing audio key`);
          return;
        }
        const audioUrl = toAbsoluteUrl(entry.audio);
        try {
          const res = await fetchAudio(audioUrl);
          if (!res.ok) {
            problems.push(`${label}: HTTP ${res.status} at ${audioUrl}`);
          } else if (res.size <= 0) {
            problems.push(`${label}: zero bytes at ${audioUrl}`);
          }
        } catch (err) {
          problems.push(`${label}: fetch failed ${err.message} at ${audioUrl}`);
        }
      });
      void checks; // not used
    } catch (err) {
      problems.push(`${file}: cannot fetch dataset (${jsonUrl}) :: ${err.message}`);
    }
  }

  if (problems.length === 0) {
    console.log(green(`All ${totalChecked} audio files verified OK.`));
  } else {
    console.log(yellow(`Checked ${totalChecked} audio files.`));
    console.error(red(`Found ${problems.length} problem(s):`));
    for (const p of problems) console.error(red(`- ${p}`));
    process.exitCode = 1;
  }
})();