# Full-Stack Template Reference
## React + Vite + Tailwind · Express + Node · SQLite

Read this file completely before writing Phase 7 output.

---

## Folder Structure

```
[app-name]/
├── package.json              ← root workspace
├── README.md
├── server/
│   ├── index.js              ← Express entry point
│   ├── db/
│   │   ├── schema.js         ← SQLite table setup
│   │   └── seed.js           ← synthetic data
│   └── routes/
│       └── [entity].js       ← one file per entity
└── client/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css         ← NOVA Eclipse CSS vars + reset
        ├── lib/
        │   └── api.js        ← fetch helpers
        ├── components/       ← one file per component
        └── pages/            ← one file per screen
```

---

## package.json (root)

```json
{
  "name": "[app-name]",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "node --watch server/index.js",
    "dev:client": "cd client && npm run dev",
    "install:all": "npm install && cd server && npm install && cd ../client && npm install",
    "test": "cd client && npm run test"
  },
  "engines": {
    "node": ">=22.0.0"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

---

## server/index.js

```js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initDb } from './db/schema.js';
import { seedDb } from './db/seed.js';
// import [entity]Router from './routes/[entity].js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Mount routes
// app.use('/api/[entity]', [entity]Router);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Init DB — schema first, then seed, then listen
initDb();
seedDb();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Global error handler — must be last, must have 4 params
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
```

---

---

## .gitignore

```
node_modules/
dist/
.env
.env.local
*.db
.DS_Store
```

---

## .nvmrc

```
22
```

Place in project root. Works with `nvm use`, `fnm use`, Volta, and most Node version managers.

---

## server/package.json

```json
{
  "name": "[app-name]-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch index.js",
    "start": "node index.js"
  },
  "engines": {
    "node": ">=22.0.0"
  },
  "dependencies": {
    "libsql": "^0.4.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "helmet": "^7.1.0"
  }
}
```

---

## server/db/schema.js

```js
import Database from 'libsql';
export const db = new Database(':memory:');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS [entity] (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      name    TEXT    NOT NULL,
      status  TEXT    DEFAULT 'active',
      amount  REAL,
      date    TEXT,
      created TEXT    DEFAULT (datetime('now'))
    );
    -- add tables per entity from Phase 2
  `);
}
```

---

## server/db/seed.js

```js
import { db } from './schema.js';

export function seedDb() {
  const count = db.prepare('SELECT COUNT(*) as n FROM [entity]').get();
  if (count.n > 0) return; // already seeded

  const insert = db.prepare(
    'INSERT INTO [entity] (name, status, amount, date) VALUES (?, ?, ?, ?)'
  );

  const records = [
    // 15–25 realistic records
    // NO lorem ipsum. NO "Item 1". NO "$0.00".
    // Mixed statuses: active/pending/overdue/paid/cancelled
    // Dates spanning last 18 months
    // 1–2 edge cases per entity
  ];

  const insertMany = db.transaction((rows) => {
    for (const r of rows) insert.run(r.name, r.status, r.amount, r.date);
  });
  insertMany(records);
}
```

---

## server/routes/[entity].js

```js
import { Router } from 'express';
import { db } from '../db/schema.js';

const router = Router();

// List with optional search
router.get('/', (req, res) => {
  const { search, status } = req.query;
  let query = 'SELECT * FROM [entity] WHERE 1=1';
  const params = [];
  if (search) { query += ' AND name LIKE ?'; params.push(`%${search}%`); }
  if (status) { query += ' AND status = ?'; params.push(status); }
  query += ' ORDER BY created DESC';
  res.json(db.prepare(query).all(...params));
});

// Single
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM [entity] WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Create
router.post('/', (req, res) => {
  const { name, status, amount, date } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const result = db.prepare(
    'INSERT INTO [entity] (name, status, amount, date) VALUES (?, ?, ?, ?)'
  ).run(name, status || 'active', amount, date);
  res.status(201).json(db.prepare('SELECT * FROM [entity] WHERE id = ?').get(result.lastInsertRowid));
});

// Update
router.put('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM [entity] WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const updated = { ...row, ...req.body };
  db.prepare(
    'UPDATE [entity] SET name=?, status=?, amount=?, date=? WHERE id=?'
  ).run(updated.name, updated.status, updated.amount, updated.date, req.params.id);
  res.json(db.prepare('SELECT * FROM [entity] WHERE id = ?').get(req.params.id));
});

// Delete
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM [entity] WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

export default router;
```

---

## client/index.html

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[App Name]</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## client/vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true }
    }
  }
});
```

client `package.json`:
```json
{
  "name": "[app-name]-client",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4",
    "vitest": "^1.3.1"
  }
}
```

---

## client/tailwind.config.js

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans:  ['Geist', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## client/postcss.config.js

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
};
```

---

## client/src/index.css

Import this as the first line in `main.jsx`. Contains all NOVA Eclipse tokens, reset, and animations.

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { color-scheme: dark light; }

[data-theme="dark"], :root {
  --bg:#09090F; --bg-subtle:#0F0F1A; --bg-elevated:#141420;
  --surface:rgba(255,255,255,0.035); --surface-hover:rgba(255,255,255,0.065);
  --surface-raised:rgba(255,255,255,0.09); --surface-solid:#141420;
  --border:rgba(255,255,255,0.08); --border-strong:rgba(255,255,255,0.14);
  --border-focus:rgba(255,97,84,0.6);
  --text:#F0EDFF; --text-muted:#9B96B8; --text-subtle:#524F6A;
  --accent:#FF6154; --accent-hover:#E5503F;
  --accent-dim:rgba(255,97,84,0.12); --accent-glow:rgba(255,97,84,0.3);
  --accent-fg:#FFFFFF;
  --accent2:#7EFFF5; --accent2-hover:#5EEDDF;
  --accent2-dim:rgba(126,255,245,0.10); --accent2-glow:rgba(126,255,245,0.25);
  --accent2-fg:#09090F;
  --success:#34D399; --success-bg:rgba(52,211,153,0.10);
  --warning:#FBBF24; --warning-bg:rgba(251,191,36,0.10);
  --destructive:#F87171; --destructive-bg:rgba(248,113,113,0.10);
  --info:#7EFFF5; --info-bg:rgba(126,255,245,0.10);
  --radius-sm:5px; --radius:7px; --radius-md:10px;
  --radius-lg:14px; --radius-xl:20px; --radius-full:9999px;
}

[data-theme="light"] {
  --bg:#F7F5F0; --bg-subtle:#EDEAE3; --bg-elevated:#FAFAF8;
  --surface:rgba(0,0,0,0.032); --surface-hover:rgba(0,0,0,0.055);
  --surface-raised:rgba(0,0,0,0.075); --surface-solid:#FFFFFF;
  --border:rgba(0,0,0,0.09); --border-strong:rgba(0,0,0,0.16);
  --border-focus:rgba(232,66,47,0.55);
  --text:#1A1825; --text-muted:#6B6888; --text-subtle:#A09DBE;
  --accent:#E8422F; --accent-hover:#C93520;
  --accent-dim:rgba(232,66,47,0.10); --accent-glow:rgba(232,66,47,0.20);
  --accent-fg:#FFFFFF;
  --accent2:#00B8AB; --accent2-hover:#009D91;
  --accent2-dim:rgba(0,184,171,0.10); --accent2-glow:rgba(0,184,171,0.20);
  --accent2-fg:#FFFFFF;
  --success:#059669; --success-bg:rgba(5,150,105,0.08);
  --warning:#D97706; --warning-bg:rgba(217,119,6,0.08);
  --destructive:#DC2626; --destructive-bg:rgba(220,38,38,0.08);
  --info:#0891B2; --info-bg:rgba(8,145,178,0.08);
}

body {
  font-family: 'Geist', -apple-system, sans-serif;
  font-size: 14px; line-height: 1.65;
  color: var(--text); min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

[data-theme="dark"] body {
  background:
    radial-gradient(ellipse 70% 45% at 15% -5%,  rgba(255,97,84,0.08)   0%, transparent 55%),
    radial-gradient(ellipse 55% 40% at 90% 10%,  rgba(126,255,245,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 60% 55% at 50% 110%, rgba(255,97,84,0.04)   0%, transparent 55%),
    #09090F;
}

[data-theme="light"] body {
  background:
    radial-gradient(ellipse 70% 45% at 15% -5%, rgba(232,66,47,0.05) 0%, transparent 55%),
    radial-gradient(ellipse 55% 40% at 90% 10%, rgba(0,184,171,0.04)  0%, transparent 50%),
    #F7F5F0;
}

input, button, select, textarea { font-family: inherit; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; }

*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 99px; }
::selection { background: var(--accent-dim); color: var(--text); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## client/src/lib/api.js

```js
const BASE = '/api';

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null;
  return res.json();
}

// Generate one set of helpers per entity:
export const [entity]Api = {
  list:   (params = {}) => req('GET', `/[entity]?${new URLSearchParams(params)}`),
  get:    (id)           => req('GET', `/[entity]/${id}`),
  create: (data)         => req('POST', `/[entity]`, data),
  update: (id, data)     => req('PUT', `/[entity]/${id}`, data),
  remove: (id)           => req('DELETE', `/[entity]/${id}`),
};
```

---

## client/src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
// import all page components
// import ModeToggle from './components/ModeToggle';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
        {/* Sidebar or top nav */}
        {/* <ModeToggle /> — always in nav top-right */}
        <Routes>
          <Route path="/" element={<Navigate to="/[first-slug]" replace />} />
          {/* <Route path="/[slug]" element={<PageComponent />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

---

## client/src/main.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Apply saved theme before render
const saved = localStorage.getItem('nova-theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## client/vitest.config.js

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
});
```

---

## Running Tests

Tests in `tests/api.test.js` hit the live server at `http://localhost:3001`.
**The server must be running before you run tests.**

```bash
# Terminal 1 — start the server
npm run dev:server

# Terminal 2 — run tests
npm test
```

Tests in `tests/seed.test.js` run in-process and do not require the server.

---

## tests/api.test.js (Vitest)

```js
import { describe, it, expect, beforeAll } from 'vitest';

const BASE = 'http://localhost:3001/api';

describe('[Entity] API', () => {
  it('GET /[entity] returns array', async () => {
    const res = await fetch(`${BASE}/[entity]`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(15);
  });

  it('GET /[entity]/:id returns one record', async () => {
    const list = await (await fetch(`${BASE}/[entity]`)).json();
    const res = await fetch(`${BASE}/[entity]/${list[0].id}`);
    const item = await res.json();
    expect(item.id).toBe(list[0].id);
    expect(item.name).toBeDefined();
  });

  it('POST /[entity] creates a record', async () => {
    const res = await fetch(`${BASE}/[entity]`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Record', status: 'active' }),
    });
    const item = await res.json();
    expect(res.status).toBe(201);
    expect(item.id).toBeDefined();
    expect(item.name).toBe('Test Record');
  });

  it('PUT /[entity]/:id updates a record', async () => {
    const list = await (await fetch(`${BASE}/[entity]`)).json();
    const res = await fetch(`${BASE}/[entity]/${list[0].id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'inactive' }),
    });
    const updated = await res.json();
    expect(updated.status).toBe('inactive');
  });

  it('DELETE /[entity]/:id removes a record', async () => {
    const list = await (await fetch(`${BASE}/[entity]`)).json();
    const last = list[list.length - 1];
    const res = await fetch(`${BASE}/[entity]/${last.id}`, { method: 'DELETE' });
    expect(res.status).toBe(204);
  });
});
```

---

## README.md

```md
# [App Name]

[one-liner from Phase 1]

## Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express + Node
- **Database**: SQLite (in-memory, pre-seeded)
- **Design**: NOVA Eclipse — dark/light mode

## Start

\`\`\`bash
npm run install:all
npm run dev
\`\`\`

- Client → http://localhost:5173
- API    → http://localhost:3001/api

## Test

Start the server first — API tests hit a live endpoint:

\`\`\`bash
# Terminal 1
npm run dev:server

# Terminal 2
npm test
\`\`\`

## API

| Method | Route | Description |
|--------|-------|-------------|
[fill from Phase 2 routes]
```

---

*v1.0.0 · Swami Chandrasekaran*
