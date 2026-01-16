# Chatbot Platform

A full-stack **Chatbot Platform** built with a clean separation between frontend and backend, designed for real-world conversational applications. The system supports AI-powered responses, persistent chat storage using MongoDB Atlas, and a scalable architecture suitable for production use.

---

## 🚀 Live Demo

🔗 https://chatbot-platform-hk6l.vercel.app/

---

## 📌 Table of Contents

- About  
- Features  
- Tech Stack  
- Architecture Overview  
- Getting Started  
- Project Structure  
- Usage  
- Future Enhancements  

---

## 📖 About

**Chatbot Platform** is a modular and scalable chatbot application that allows users to interact with an intelligent conversational interface. It follows industry best practices with a clear frontend–backend separation and supports persistent data storage using MongoDB Atlas.

The platform is designed to be easily extensible for AI/LLM integrations, authentication, and advanced conversation management.

---

## ✨ Features

- Responsive and modern chat user interface  
- Real-time message handling  
- Clean frontend–backend separation  
- AI-powered responses via OpenRouter API  
- Persistent chat storage using MongoDB Atlas  
- Secure environment-based configuration  
- Deployed and production-ready  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI Integration | OpenRouter API |
| API Communication | REST (JSON) |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🏗 Architecture Overview

The application follows a **multi-layer architecture**:

User → Frontend (React)
→ Backend (Express API)
→ MongoDB Atlas (Persistence)
→ OpenRouter API (AI Response)
→ Backend
→ Frontend


- Frontend handles UI and user interaction  
- Backend manages business logic and integrations  
- MongoDB Atlas stores chat conversations  
- OpenRouter API generates AI-driven responses  

Detailed request flow is documented in `ARCHITECTURE.md`.

---

## 🧰 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- OpenRouter API key

---

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amarsin22/Chatbot-Platform.git
cd Chatbot-Platform
```
2. Backend setup
   cd backend
   npm install
   
Create a .env file inside backend/:
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key

4. Frontend setup
   cd ../frontend
   npm install

## ▶️ Running the Application
1. Start the backend server
   cd backend
   npm run dev
2. Start the frontend
   cd frontend
   npm run dev

## 🗂 Project Structure
Chatbot-Platform/
│
├── backend/
│   ├── config/              # DB & app configuration
│   ├── controllers/         # Business logic
│   ├── middleware/          # Validation & error handling
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── .env
│   ├── server.js            # Backend entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images & static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── layouts/         # Layout wrappers
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API calls
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── README.md
└── ARCHITECTURE.md

## 📌 Usage
1. Open the frontend application in your browser
2. Enter a message in the chat input
3. The message is sent to the backend API
4. Backend stores the message in MongoDB Atlas
5. Message is forwarded to OpenRouter API
6. AI response is saved and returned to the frontend
7. Chat UI updates in real time

## 🚧 Future Enhancements
1. User authentication and authorization
2. Chat history and conversation context memory
3. Multi-agent chatbot support
4. Role-based dashboards
5. Caching and performance optimization
6. CI/CD pipeline integration

## 🎯 Purpose
This project demonstrates:
1. Full-stack development skills
2. Clean and scalable system architecture
3. AI API integration
4. Cloud database usage with MongoDB Atlas

It is suitable for portfolio showcase, technical interviews, and real-world chatbot systems.

## 👨‍💻 Author
Amar Singh
GitHub: https://github.com/amarsin22

