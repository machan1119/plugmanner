# 🧭 SocialPlug [Project ID: P-470]

A modern full-stack platform for managing and presenting services, free tools, articles, and blogs—powered by a Strapi headless CMS backend and a Next.js frontend with multi-language support.

---

## 📚 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Contact](#-contact)
- [Acknowledgements](#-acknowledgements)

---

## 🧩 About

This project provides an intuitive interface for managing services, free tools, articles, and blog content efficiently. It solves the need for a flexible, content-driven website with a powerful admin panel (Strapi) and a fast, localized frontend (Next.js). Key goals include headless content management, SEO-friendly pages, and a smooth experience across multiple languages (e.g. English, Spanish, Portuguese).

---

## ✨ Features

- **Headless CMS** – Manage articles, services, free tools, and sub-services via Strapi admin with rich editing (CKEditor) and SEO plugins.
- **Multi-language frontend** – Next.js app with `next-intl` for locales (e.g. en, es-ES, pt-BR) and locale-aware routing.
- **Services & free tools** – Structured content types for services, sub-services, free services, and free tools with detailed metadata.
- **Blogs & articles** – Article and category content types with flexible components (chapters, sections, author, etc.).
- **Authentication** – NextAuth integration for secure sign-in and user management.
- **Modern UI** – Tailwind CSS, Lottie animations, Swiper carousels, and responsive layouts.

---

## 🧠 Tech Stack

| Category    | Technologies |
|------------|--------------|
| **Languages** | TypeScript, JavaScript |
| **Frontend**  | Next.js 15, React 19, Tailwind CSS |
| **Backend/CMS** | Strapi 5.9 |
| **Database**   | SQLite (better-sqlite3) / PostgreSQL (pg) |
| **Auth**       | NextAuth, Strapi Users & Permissions |
| **Tools**      | Axios, next-intl, Lottie, Swiper, Mongoose (client) |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/machan1119/plugmanner.git

# Navigate to the project directory
cd plugmanner

# Install server (Strapi) dependencies
cd server && yarn install   # or npm install

# Install client (Next.js) dependencies
cd ../client && npm install   # or yarn install
```

---

## 🚀 Usage

**Run the Strapi backend (admin + API):**

```bash
cd server
yarn develop   # or npm run develop
```

Then open the Strapi admin:  
👉 [http://localhost:1337/admin](http://localhost:1337/admin)

**Run the Next.js frontend:**

```bash
cd client
npm run dev   # or yarn dev
```

Then open your browser:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧾 Configuration

Create a `.env` file in the appropriate folder as needed.

**Server (`server/.env`):**

- `HOST`, `PORT` – Strapi host and port (e.g. `PORT=1337`)
- `DATABASE_CLIENT` – `sqlite` or `postgres`
- For PostgreSQL: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET` – Strapi security keys

**Client (`client/.env` or `client/.env.local`):**

- `NEXTAUTH_SECRET` – Secret for NextAuth
- `NEXTAUTH_URL` – e.g. `http://localhost:3000`
- `STRAPI_URL` or `NEXT_PUBLIC_STRAPI_URL` – Strapi API base URL (e.g. `http://localhost:1337`)

---

## 🖼 Screenshots

Add demo images, GIFs, or UI preview screenshots here.

*Example:*

<!-- ![Home](doc/screenshots/home.png) -->

---

## 📜 API Documentation

The Strapi server exposes a REST API. After running the server with the Documentation plugin, open:

👉 [http://localhost:1337/documentation](http://localhost:1337/documentation)

**Example content types and endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/articles`        | List articles |
| GET    | `/api/services`        | List services |
| GET    | `/api/subservices`     | List sub-services |
| GET    | `/api/free-services`   | List free services |
| GET    | `/api/free-tools`      | List free tools |
| GET    | `/api/article-categories` | List article categories |

Use Strapi’s built-in documentation for full request/response details and authentication.

---

## 📬 Contact

**Author** 1-2-RIG
**Email:** sl.highlight999@gmail.com
**GitHub:** [@machan1119](https://github.com/machan1119)  
**Telegram:** [@machan1119](https://t.me/machan1119)  

---

## 🌟 Acknowledgements

- [Strapi](https://strapi.io) – Headless CMS  
- [Next.js](https://nextjs.org) – React framework  
- [Tailwind CSS](https://tailwindcss.com) – Styling  
- [next-intl](https://next-intl-docs.vercel.app) – Internationalization  
- Inspiration or resources used; libraries, icons, or tutorials referenced; collaborators or contributors.
