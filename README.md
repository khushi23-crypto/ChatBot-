# Real-Time Chat Application

A **real-time chat application** built using **Rust (Actix Web, WebSockets)** for the backend and **React (JavaScript)** for the frontend.  
This project is currently private and not open-source.  

The app allows multiple users to connect and chat in real-time, similar to Slack, Discord, or WhatsApp Web, but simplified for learning and development.

---

## 🚀 Features

- Real-time communication using WebSockets
- Multiple users can join and chat simultaneously
- Clean React frontend (JavaScript, not TypeScript)
- Backend built with **Actix Web (Rust)**along with the very popular **tokio & tungstenite**.
- Scalable architecture for future improvements
- Secure JWT-based authentication (planned)
- Database integration for persistent chat history (planned)
- Will try to make it end-to-end encrypted.

---

## 🛠️ Tech Stack

### Backend
- **Rust**
- **Actix Web** (Web framework)
- **WebSockets** (real-time communication)
- **SQLx + Postgres** (planned for persistence)
- **JWT Authentication** (planned)
- 

### Frontend
- **React (JavaScript)**  
- **Tailwind CSS** for styling (optional)
- **WebSocket API** for connecting to backend

---

## 📂 Project Structure

```
chat-app/
│
├── backend/                # Rust Actix Web backend
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── handlers.rs     # WebSocket handlers
│   │   ├── models.rs       # (Planned) Database models
│   │   └── auth.rs         # (Planned) JWT authentication
│   └── Cargo.toml
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── ChatBox.js
│   │   │   └── Message.js
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## ⚡ Getting Started

### Backend Setup

1. Install [Rust](https://www.rust-lang.org/tools/install)  
2. Navigate to backend folder:
   ```bash
   cd backend
   ```
3. Run the server:
   ```bash
   cargo run
   ```
4. Server will run on: `http://localhost:8080`

---

### Frontend Setup

1. Install [Node.js](https://nodejs.org/)  
2. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm start
   ```
5. Frontend will run on: `http://localhost:3000`

---

## 🔮 Future Enhancements

- Persistent chat storage with Postgres
- JWT-based authentication
- Private rooms / Direct messages
- User profiles and avatars
- File sharing
- Notifications

---

## 📌 Notes

- This project is **private** and not open-source (yet).  
- For development purposes, the focus is on **learning Rust (backend) + React (frontend)** together.
