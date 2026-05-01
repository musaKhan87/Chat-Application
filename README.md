# 💬 Chat-Zone – Real-Time Chat Application

**Live Demo:** [Chat-Zone on Render](https://chat-zone-p6gv.onrender.com) *(may take time to load)*  
**GitHub Repository:** [Chat Application](https://github.com/musaKhan87/Chat-Application)

## 📌 Overview

**Chat-Zone** is a real-time full-stack chat application built using **MERN stack** with **Socket.io** for instant messaging. It supports **one-to-one** and **group chats**, **typing indicators**, and **message notifications**.  
The app ensures secure communication with **JWT authentication**, **bcrypt password hashing**, and **MongoDB data storage**.

## 🚀 Features

### 🔹 User Features
- **Authentication**: Secure registration & login with JWT.
- **Real-Time Messaging**: Instant chat using Socket.io.
- **One-to-One Chat**: Direct private messaging between users.
- **Group Chat**: Create, join, and manage group conversations.
- **Typing Indicator**: See when the other user is typing.
- **Message Notifications**: Real-time alerts for new messages.
- **User Profiles**: View other users’ profiles with details and avatars.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.

### 🔹 Admin & Security
- **Protected Routes**: Role-based access control.
- **Password Encryption**: Secure storage with bcrypt.
- **JWT Authentication**: Token-based authentication.
- **Data Validation**: Server-side input checks.

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Chakra UI** for modern UI components
- **Axios** for API requests
- **Socket.io-client** for real-time communication

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **Socket.io** for real-time messaging
- **JWT** for authentication
- **Bcrypt.js** for password hashing

## 📱 Responsive Design
- **Mobile**: Slide-in menu, stacked chat UI, touch-friendly controls.
- **Tablet**: Adaptive layouts with split chat panels.
- **Desktop**: Full-width chat interface with multi-panel layout.

## 📋 Prerequisites
- Node.js (v14 or later)
- MongoDB (Local or Atlas)

## 🔧 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/musaKhan87/Chat-Application.git
   cd Chat-Application

2. **Install Server Dependencies**
   npm install

3. **Install Server Dependencies**
    cd frontend
    npm install
    cd ..

4. **Environment Variables**
    Create a .env file in the root directory:
    PORT=5000
    NODE_ENV=development
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

5. **Run in Development Mode**
    npm run dev

 API Endpoints
Authentication
POST /api/user – Register a new user

POST /api/user/login – Login user

GET /api/user – Search users

Chats
POST /api/chat – Access or create one-to-one chat

GET /api/chat – Get all chats for the logged-in user

POST /api/chat/group – Create a new group chat

PUT /api/chat/rename – Rename group

PUT /api/chat/groupadd – Add user to group

PUT /api/chat/groupremove – Remove user from group

Messages
POST /api/message – Send a message

GET /api/message/:chatId – Get messages for a chat

📂 Project Structure

Chat-Application/
├── backend/
│   ├── utils/           # Database connection
│   ├── controllers/      # API logic
│   ├── middleware/       # Auth and error handling
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Entry point
│
├── frontend/
│   ├── src/              # React source files
│   ├── public/           # Static assets
│   ├── vite.config.js    # Vite config
│
├── .env
├── package.json
└── README.md

Security Features
JWT-based Authentication

Bcrypt Password Hashing

Protected Routes

Input Validation

👨‍💻 Developer
Musa Khan – Full Stack Developer
GitHub

📝 License
This project is licensed under the MIT License.
