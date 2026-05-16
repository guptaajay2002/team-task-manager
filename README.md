# team-task-manager
# Team Task Manager

A full-stack style Team Task Manager web application where users can create projects, assign tasks, and track progress with role-based access control.

---

# Live Demo

(Add your deployed live URL here)

Example:

https://team-task-manager.vercel.app

---

# GitHub Repository

(Add your GitHub repository link here)

Example:

https://github.com/yourusername/team-task-manager

---

# Features

## Authentication
- User Signup
- User Login
- Logout functionality
- Persistent login using LocalStorage

---

## Role-Based Access Control

### Admin
Can:
- Create projects
- Delete projects
- Create tasks
- Delete tasks
- Assign tasks
- Update task status

### Member
Can:
- View projects
- View tasks
- Update task status only

---

## Project Management
- Add new projects
- Add team members
- View all projects
- Delete projects
- Persistent storage after refresh

---

## Task Management
- Create tasks
- Assign tasks manually
- Set task priority
- Set deadlines
- Update task status
- Delete tasks
- Persistent storage after refresh

---

## Dashboard
- Navigation between pages
- User role display
- Logout option
- Responsive UI

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- JavaScript
- LocalStorage

---

# Folder Structure

```bash
src/
│
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   └── Tasks.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/team-task-manager.git
```

---

## Navigate to Project

```bash
cd team-task-manager
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# Application Routes

| Route | Description |
|---|---|
| `/` | Login Page |
| `/signup` | Signup Page |
| `/dashboard` | Dashboard |
| `/projects` | Project Management |
| `/tasks` | Task Management |

---

# How Role-Based Access Works

The application stores user roles during signup.

Roles:
- admin
- member

Access is controlled using conditional rendering.

Example:

```js
user?.role === 'admin'
```

---

# Data Storage

The application currently uses browser LocalStorage for persistence.

| Data | Storage Key |
|---|---|
| Users | `users` |
| Logged In User | `user` |
| Projects | `projects` |
| Tasks | `tasks` |

---

# Future Improvements

- MongoDB Integration
- Express.js Backend
- JWT Authentication
- Redux Toolkit
- Drag & Drop Tasks
- Charts & Analytics
- Real-Time Updates
- Notifications
- Team Collaboration

---

# Author

Aditya Bhadouriya

---

# License

This project is for assignment/demo purposes.
