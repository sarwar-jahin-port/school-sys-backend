# 🏫 School Management System Backend API

A robust backend REST API built with [NestJS](https://nestjs.com/) for managing school operations — starting with secure user authentication.

> ⚠️ This project is under development. Currently, it supports basic user **signup** and **signin** functionalities.

---

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL (via Docker)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Authentication**: Argon2 password hashing + JWT
- **Containerization**: [Docker](https://www.docker.com/)

---

## 📦 Features Implemented

- ✅ User Registration (`/auth/signup`)
- ✅ User Login (`/auth/signin`)
- ✅ Secure password hashing with Argon2
- ✅ JWT-based authentication
- ✅ Dockerized PostgreSQL setup

---

## 🛠️ Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-sys-backend.git
cd school-sys-backend

yarn install

or

npm install
```

### 2. Create .env
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=postgres
DB_PASSWORD=123
DB_NAME=school_sys_nest_db
JWT_SECRET=yourSuperSecretKey

### 3. Start PostgreSQL with Docker

If Docker is installed, run:

```bash
docker-compose up -d
```
Make sure your docker-compose.yml has PostgreSQL exposed on port 5434.

### 4. Run the NestJS Application
For development:
```
yarn start:dev
```
For Production:
```
yarn build
yarn start:prod
```

# 🔐 Auth API Reference

## 📤 Signup - `POST /auth/signup`

Registers a new user.

### Request Body:
```json
{
  "email": "john@example.com",
  "password": "strongpassword123",
  "name": "John Doe"
}
```

## 📤 Signin - `POST /auth/signin`

Login user.

### Request Body:
```json
{
  "email": "john@example.com",
  "password": "strongpassword123",
}
```

🧪 Future Roadmap
✅ Role-based access control (Admin, Teacher, Student)

👤 Student & Teacher profiles

📚 Class & subject management

🕓 Attendance tracking

📝 Exam & result APIs
