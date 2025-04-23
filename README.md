# 🌾 Flour Mill Management System (atta-chakki)

A full-stack web application to manage flour mill operations efficiently. This system includes inventory tracking, billing, user roles, transaction history, and PDF report generation.

---

## 🔧 Tech Stack

### 🖥 Frontend

- **React.js**
- **sweetAlert2**
- **Tailwind CSS** (or your preferred CSS framework)
- **Formik + Yup** for forms & validation
- **React Router** for navigation
- **jsPDF** for PDF generation

### 🛠 Backend

- **Spring Boot (Java)**
- **REST API**
- **JWT Authentication**
- **Role-Based Access Control**

### 🗃 Database

- **PostgreSQL**

---

## 🧩 Features

### ✅ Admin Panel

- Manage users and roles (Activate/Deactivate users)
- View and generate weekly/monthly transaction reports
- View flour type breakdowns and download PDFs

### ✅ Billing System

- Create bills with real-time validation
- Auto-calculation of quantities, prices, and totals
- Printable/exportable invoices

### ✅ User Roles

- **Admin**: Full access to the system
- **User**: Limited to billing and viewing their own transactions

### ✅ Security

- Signup/Login with hashed passwords
- JWT-based protected routes
- Only authorized roles can access specific endpoints

### 📊 Reports

- Weekly/monthly reports with date filters
- Flour type breakdown
- Download as PDF

### 🧰 Admin Controls

- Add/Edit/Delete users
- Activate/Deactivate user accounts
- Manage transaction history

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/saaadk7/atta-chakki.git
cd atta-chakki
```
