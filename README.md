# 🛡️ Patrol Management System Backend

Backend service for a Patrol Management System, built with **Node.js**, **Express**, **TypeScript**, and **Sequelize**. This project provides a REST API and real-time communication using **Socket.IO**.

## 🚀 Key Features

- JWT Authentication
- RESTful API for users, patrol routes, and reporting
- Real-time communication with WebSocket
- Security middlewares: Helmet, CORS, and Compression
- Logging with Pino
- Database migration and seeding using Sequelize CLI
- Input validation with Express Validator

## 🧰 Tech Stack

- Node.js (ESM Module)
- Express 5
- PostgreSQL + Sequelize ORM
- TypeScript
- Socket.IO
- ESLint + Prettier + Husky

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/DarmawanWeb/patrol-monitoring-be.git
cd patrol-monitoring-be
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

### 4. Start the server (development)

```bash
pnpm dev
```

### 5. Start the server (production)

```bash
pnpm build
pnpm start:prod
```

---

## ⚙️ Scripts

- `pnpm dev` — Run development server with hot reload
- `pnpm build` — Compile TypeScript files
- `pnpm start` — Run compiled code
- `pnpm format` — Format code using Prettier

---

## 📄 License

© 2025 by @agus-darmawan. This project is under a proprietary license.
