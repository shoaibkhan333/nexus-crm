# NexusCRM — Interactive CRM Dashboard

A professional, fully interactive Customer Relationship Management (CRM) dashboard built with modern frontend technologies. Manage contacts, track deals through a drag-and-drop pipeline, and visualize sales performance with interactive charts.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

**Live Demo:** [https://nexus-crm-two-psi.vercel.app/](https://nexus-crm-two-psi.vercel.app/)  
**GitHub:** [github.com/shoaibkhan333/nexus-crm](https://github.com/shoaibkhan333/nexus-crm)

---

## Features

| Module | Description |
|--------|-------------|
| **Dashboard** | KPI cards, revenue vs target charts, pipeline overview, activity feed |
| **Contacts** | Search, sort, filter, add/edit/delete with modals |
| **Deals Pipeline** | Drag-and-drop Kanban across 5 sales stages |
| **Analytics** | Conversion funnel, lead sources, performance charts |
| **Settings** | Editable profile, dark/light theme (persisted in localStorage) |
| **Global Search** | Filter contacts and deals from the header |
| **Notifications** | Interactive dropdown with read/unread states |

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — fast dev server & build
- **Tailwind CSS v4** — utility-first styling with class-based dark mode
- **Recharts** — interactive data visualization
- **Framer Motion** — smooth UI animations
- **Lucide React** — icon library
- **Context API** — global state management

---

## Screenshots

_Add 3–4 screenshots here after deployment (Dashboard, Contacts, Deals Pipeline, Dark Mode)._

```markdown
![Dashboard](./docs/screenshots/dashboard.png)
![Deals Pipeline](./docs/screenshots/deals.png)
![Dark Mode](./docs/screenshots/dark-mode.png)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/shoaibkhan333/nexus-crm.git
cd nexus-crm

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Deploy to GitHub + Vercel (Free Live Demo)

### Step 1 — Install Git (one time)

Download and install: **https://git-scm.com/download/win**

Restart your terminal after installation.

### Step 2 — Create GitHub Repository

1. Go to **https://github.com** and sign in (create account if needed)
2. Click **New repository**
3. Name: `nexus-crm` (or any name)
4. Set to **Public**
5. Do **NOT** add README (project already has one)
6. Click **Create repository**

### Step 3 — Push Code to GitHub

Open terminal in your project folder:

```bash
cd "c:\Users\SHOAIB KHAN\Desktop\project"

git init
git add .
git commit -m "Initial commit: NexusCRM interactive dashboard"
git branch -M main
git remote add origin https://github.com/shoaibkhan333/nexus-crm.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 4 — Deploy on Vercel (Free)

1. Go to **https://vercel.com** and sign up with GitHub
2. Click **Add New → Project**
3. Import your `nexus-crm` repository
4. Vercel auto-detects Vite — keep default settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**
6. In 1–2 minutes you get a live URL like: `https://nexus-crm.vercel.app`

### Step 5 — Update README

Your live demo is already linked at the top of this README.

---

## Resume / LinkedIn Description

Copy-paste these lines for your portfolio:

**Short (2 lines):**
> Built NexusCRM, a full-featured CRM dashboard using React, TypeScript, and Tailwind CSS with interactive charts, drag-and-drop deal pipeline, and dark mode. Implemented global state management, search/filter, CRUD modals, and responsive UI with Framer Motion animations.

**Bullet points (for resume):**
- Developed a responsive CRM dashboard with React 19, TypeScript, and Tailwind CSS v4
- Built drag-and-drop Kanban deal pipeline, searchable contacts table, and Recharts analytics
- Implemented Context API state management, localStorage persistence, and class-based dark mode
- Deployed production build on Vercel with optimized Vite bundling

**LinkedIn project entry:**
- **Title:** NexusCRM — Sales Dashboard
- **URL:** _(your Vercel link)_
- **Description:** Interactive CRM web app for managing contacts, tracking sales pipelines, and visualizing revenue analytics. Built with React, TypeScript, Recharts, and Tailwind CSS.

---

## Roadmap — Next Features for Job Applications

These additions will make your portfolio stand out to employers:

| Priority | Feature | Why it matters |
|----------|---------|----------------|
| ⭐⭐⭐ | **Login / Signup (Supabase Auth)** | Shows you can handle authentication |
| ⭐⭐⭐ | **Backend + Database (Supabase)** | Real data instead of mock — full-stack skill |
| ⭐⭐⭐ | **Deploy live demo** | Recruiters click links, not just read code |
| ⭐⭐ | **REST API integration** | Fetch/create contacts & deals from API |
| ⭐⭐ | **Export to CSV/PDF** | Common business feature |
| ⭐⭐ | **Email notifications** | Real-world CRM functionality |
| ⭐ | **Unit tests (Vitest)** | Shows professional development practices |
| ⭐ | **Role-based access (Admin/User)** | Enterprise-level thinking |

**Recommended order:** Deploy live → Supabase auth → Connect database → Add tests

---

## Project Structure

```
src/
├── components/
│   ├── analytics/     # Charts & analytics views
│   ├── contacts/        # Contact management
│   ├── dashboard/       # Main dashboard
│   ├── deals/           # Kanban pipeline
│   ├── layout/          # Sidebar, header
│   ├── settings/        # Profile & preferences
│   └── ui/              # Reusable UI components
├── context/             # Global state (CRMContext)
├── data/                # Mock data & helpers
└── types/               # TypeScript interfaces
```

---

## Author

**Shoaib Khan** — Frontend Developer

- GitHub: [@shoaibkhan333](https://github.com/shoaibkhan333)
- Live Demo: [nexus-crm-two-psi.vercel.app](https://nexus-crm-two-psi.vercel.app/)
- LinkedIn: _(add your link)_

---

## License

MIT — free to use for portfolio and learning.
