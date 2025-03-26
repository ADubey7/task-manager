# Task Manager

## Overview
Task Manager is a full-stack web application designed to help users efficiently manage their tasks. It provides a user-friendly interface for creating, editing, deleting, and marking tasks as completed. The application includes secure user authentication and a dark mode toggle to enhance the user experience.

## Features
### 🔒 User Authentication:
- Secure registration and login functionality.
- JWT-based authentication for protected access.
- Robust password management and security.

### 📋 Task Management:
- Create new tasks with comprehensive details.
- Edit existing tasks with ease.
- Delete tasks that are no longer relevant.
- Mark tasks as completed or incomplete.
- Organize and prioritize your workflow.

### 🌓 Dark Mode:
- Toggle between light and dark themes.
- Reduce eye strain during extended use.
- Personalize your visual experience.

### 📱 Responsive Design:
- Seamless experience across desktop and mobile devices.
- Consistent UI/UX across all platforms.

## Technologies Used
- **🖥 Frontend:** 
  - React.js
  - React Bootstrap
  - Axios

- **🗄 Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)

## Prerequisites
Before running the project, ensure you have the following installed:
- **🟢 Node.js:** Version 16 or higher
- **🍃 MongoDB:** Local or cloud instance
- **📦 npm (Node Package Manager)**

## Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ADubey7/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies
#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment
Create a `.env` file in the backend directory:
```properties
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4️⃣ Start the Application
#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Frontend Development Server
```bash
cd ../frontend
npm start
```

### 5️⃣ Access the Application
Open your browser and navigate to:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📂 Project Structure
```
task-manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## 🖼️ Screenshots
### Login Page
![Login Page](screenshots/loginpage.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

## 🤝 Contributing
We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeatureName`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/YourFeatureName`
5. Open a Pull Request on GitHub

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📩 Contact
For any questions or feedback, feel free to reach out:
- **👤 Name:** Ashish Dubey
- **✉️ Email:** honeyashish72@gmail.com
- **🐙 GitHub:** https://github.com/ADubey7

### Acknowledgments
- **🌐 React** – Frontend framework
- **🚀 Express.js** – Backend framework
- **🗃️ MongoDB** – Database
- **🎨 Bootstrap** – UI components

Thank you for checking out the Task Manager! 🚀