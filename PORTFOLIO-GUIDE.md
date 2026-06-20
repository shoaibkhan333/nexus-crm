# Portfolio & Career Guide (Roman Urdu)

Yeh guide aapke liye hai — GitHub, Vercel, Resume, aur agle steps.

---

## 1. GitHub + Live Deploy — Step by Step

### Pehle Git install karein (aapke PC par abhi nahi hai)

1. Open: **https://git-scm.com/download/win**
2. Download karein, install karein (sab default options OK)
3. Terminal / Cursor restart karein

### GitHub par project upload

1. **github.com** par account banayein (free)
2. **New repository** → name: `nexus-crm` → **Public** → Create
3. Terminal mein ye commands chalayein:

```bash
cd "c:\Users\SHOAIB KHAN\Desktop\project"
git init
git add .
git commit -m "Initial commit: NexusCRM dashboard"
git branch -M main
git remote add origin https://github.com/APNA-USERNAME/nexus-crm.git
git push -u origin main
```

`APNA-USERNAME` ki jagah apna GitHub username likhein.

### Vercel par live website (FREE)

1. **vercel.com** → Sign up with GitHub
2. **Add New Project** → apna `nexus-crm` repo select karein
3. **Deploy** click — kuch minute mein live URL milega
4. Example: `https://nexus-crm-xyz.vercel.app`

**Zaroori:** Live link ko LinkedIn aur Resume par lagayein!

---

## 2. Resume / LinkedIn — Copy Paste

### English (Resume ke liye — 2 lines)

```
Built NexusCRM, a full-featured CRM dashboard using React, TypeScript, and 
Tailwind CSS with interactive charts, drag-and-drop deal pipeline, and dark 
mode. Implemented global state management, search/filter, CRUD modals, and 
responsive UI with Framer Motion animations.
```

### Resume bullets (3 points)

- Developed responsive CRM dashboard with React 19, TypeScript, Tailwind CSS v4
- Built drag-and-drop Kanban pipeline, searchable contacts, Recharts analytics
- Deployed on Vercel; Context API + localStorage for state & theme persistence

### LinkedIn "Projects" section

| Field | Value |
|-------|-------|
| **Project name** | NexusCRM — Sales Dashboard |
| **URL** | Apna Vercel link |
| **Description** | Interactive CRM for contacts, deals pipeline & revenue analytics. React, TypeScript, Recharts, Tailwind. |

### Skills tag karein LinkedIn par

React · TypeScript · JavaScript · Tailwind CSS · HTML/CSS · Git · Vite · Responsive Design

---

## 3. Agle Features — Job ke liye kya add karein?

### Priority 1 (sab se important)

| # | Feature | Kyun? |
|---|---------|-------|
| 1 | **Live deploy (Vercel)** | Recruiters link click karte hain |
| 2 | **GitHub public repo** | Code dekh sakte hain |
| 3 | **Screenshots README mein** | Professional lagta hai |

### Priority 2 (full-stack dikhane ke liye)

| # | Feature | Tool |
|---|---------|------|
| 4 | **Login / Signup** | Supabase Auth (free) |
| 5 | **Real database** | Supabase PostgreSQL |
| 6 | **API se data** | Contacts/deals save hon |

### Priority 3 (extra impress)

| # | Feature |
|---|---------|
| 7 | Export contacts CSV |
| 8 | Tests (Vitest) |
| 9 | Admin vs User roles |

### Recommended order

```
Week 1: Git install → GitHub upload → Vercel deploy → LinkedIn update
Week 2: Supabase account → Login page add karein
Week 3: Database connect → mock data ki jagah real save
Week 4: 1 aur project start (e-commerce ya todo app)
```

---

## 4. Remote Job — Kahan apply karein?

### Freelance (pehle experience)

- **Upwork.com** — "React developer", "web developer"
- **Fiverr.com** — "I will build React website"
- **Facebook groups** — "Web developers Pakistan"

### Remote jobs

- **LinkedIn Jobs** — filter: Remote, Entry level
- **remoteok.com**
- **weworkremotely.com**
- **indeed.com** — "remote react developer"

### Pakistan se common path

```
Freelance (Upwork) → 2-3 clients → Experience resume par
        ↓
Junior Remote Job apply
        ↓
Mid-level after 1-2 years
```

---

## 5. Checklist — Portfolio ready?

- [ ] Git installed
- [ ] Code GitHub par public
- [ ] Vercel par live demo
- [ ] README mein live link + screenshots
- [ ] LinkedIn par project add
- [ ] Resume par project + link
- [ ] 2-3 aur projects (goal)

---

**Agla step:** Git install karein, phir mujhe bolein — main Supabase login feature add karne mein help kar sakta hoon.
