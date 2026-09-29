# Tracking Approvals 📊

A modern, high-performance administrative letter tracking, SLA analytics, and workflow management dashboard built with Next.js, React, Tailwind CSS, and Lucide Icons.

---

## 🌟 Overview & Showcase

**Tracking Approvals** provides government entities, enterprises, and administrative departments with a centralized, real-time platform to monitor incoming, outgoing, and internal correspondence, track Service Level Agreements (SLAs), and visualize organizational throughput.

> **Note for Testers & Reviewers:**
> This repository is a standalone **Showcase Edition**. It comes pre-loaded with rich, realistic synthetic Kurdish mock data (320+ letters across multiple departments) and bypasses authentication barriers so reviewers can immediately explore all dashboards, presentation views, charts, and filtering capabilities without needing database connections or credentials.

---

## ✨ Key Features

- **📨 Complete Correspondence Tracking**:
  - **Received Letters (نامە وەرگیراوەکان)**: Monitor incoming requests, response deadlines, and SLA turnaround times.
  - **Sent Letters (نامە نێردراوەکان)**: Track outgoing official correspondence and departmental distribution.
  - **Incoming Letters (نامە هاتوەکان)**: Manage newly arrived letters awaiting assignment or processing.

- **⏱️ SLA & Performance Intelligence**:
  - Automatic calculation of SLA deadlines, compliance percentages, and overdue warnings.
  - Dynamic status indicators: *Within SLA (لە کاتی خۆیدا)*, *Near Deadline (نزیک لە بەسەرچوون)*, and *Overdue (بەسەرچوو)*.

- **📊 Visual Analytics & Executive Dashboards**:
  - KPI summary metric cards (Total Letters, Active, Completed, SLA Compliance Rate).
  - Departmental distribution charts and workload balance analysis.
  - Monthly timeline volume trend graphs.
  - Multi-criteria filter bar (Filter by year, department, SLA status, letter type, and keywords).

- **📺 Presentation & Meeting Modes**:
  - **Executive Presentation View**: Designed for projector displays and board meetings.
  - **TV Kiosk Mode**: Clean, auto-refreshing dashboard for wall-mounted displays.
  - **Department Comparison (بەراورد کردن)**: Side-by-side performance comparison across administrative branches.

- **🌍 RTL & Kurdish Localization**:
  - Fully native Right-to-Left (RTL) interface optimized with Sorani Kurdish typography and formatting.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamediqbalghaffar/tracking-approvals.git
   cd tracking-approvals
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to immediately explore the application.

---

## 🛠️ Built With

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Date Utilities:** [date-fns](https://date-fns.org/)
- **Spreadsheets:** [xlsx](https://sheetjs.com/)

---

## 📁 Project Structure

```
tracking-approvals/
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── layout.tsx       # Root layout with fonts and providers
│   │   ├── page.tsx         # Main entry point with instant dashboard access
│   │   └── api/             # Fallback API routes
│   ├── components/          # UI Components & Modules
│   │   ├── Dashboard.tsx    # Core letter tracking dashboard
│   │   ├── AdminHub.tsx     # Mode selection & admin hub
│   │   ├── PresentationView.tsx # Executive presentation module
│   │   ├── ComparisonView.tsx   # Departmental comparison
│   │   └── ui/              # Reusable UI elements (cards, modals, badges)
│   ├── context/             # Global State & Providers
│   │   ├── AuthContext.tsx  # Showcase auth provider (pre-authenticated admin)
│   │   ├── DataContext.tsx  # Data state initialized with mock datasets
│   │   └── PermissionsContext.tsx # Showcase permission provider
│   ├── data/
│   │   └── mockData.ts      # 320+ Synthetic Kurdish mock letters
│   └── utils/               # Parsers, SLA calculation, and date formatting
├── public/                  # Static assets and fonts
└── package.json
```

---

## 📄 License

This showcase project is available under the [MIT License](LICENSE).
