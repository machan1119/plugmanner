# PlugManner.com

A full-stack web application built with **Next.js** (frontend) and **Strapi** (backend CMS).  
This project is deployed on **DigitalOcean**.

---

## 🧠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend/CMS**: [Strapi](https://strapi.io/)
- **Deployment**: [DigitalOcean](https://www.digitalocean.com/)
- **Database**: PostgreSQL (configurable)
- **Authentication**: Built-in with Strapi / Custom (if applicable)
- **API Communication**: REST or GraphQL (update as per usage)

---

## 🚀 Project Structure

/frontend → Next.js frontend
/backend → Strapi CMS backend

## 🔧 Getting Started Locally

### 1. Clone the repository

```
git clone https://github.com/machan1119/plugmanner.git
cd plugmanner
```

### 2. Install Dependencies

Frontend
```
cd frontend
npm install
```

Backend
```
cd ../backend
npm install
```

### 3. Environment Variables

Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:1337
```

Backend
```
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

### 4. Run Development Servers

Backend (Strapi)
```
cd backend
npm run develop
```

Frontend (Next.js)
```
cd frontend
npm run dev
```
