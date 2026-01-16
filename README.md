# Chatbot Platform

A full-stack **Chatbot Platform** with a clear separation between frontend and backend, designed to allow users to interact with an intelligent chatbot interface. The project is built with scalability and extensibility in mind, making it suitable for real-world conversational applications.

---

## 🚀 Live Demo

🔗 https://chatbot-platform-hk6l.vercel.app/

---

## 📌 Table of Contents

- About  
- Features  
- Tech Stack  
- Getting Started  
- Project Structure  
- Usage  

---

## 📖 About

**Chatbot Platform** is a modular and scalable chatbot application that follows a clean frontend–backend architecture. It serves as a strong foundation for building conversational systems and can be extended to integrate AI/LLM models, third-party chat APIs, authentication, and persistent conversation storage.

---

## ✨ Features

- Responsive and modern chat user interface  
- Real-time message handling  
- Clean separation of frontend and backend  
- Easily extensible for AI/NLP integration  
- Deployed and ready for demonstration  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express.js |
| API Communication | REST, OpenRouter API |
| Deployment | Vercel, Render |

---

## 🧰 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amarsin22/Chatbot-Platform.git
cd Chatbot-Platform
```
2. Install backend dependencies
   cd backend
   npm install   
4. Install frontend dependencies
   cd ../frontend
   npm install

## ▶️ Running the Application
1. Start the backend server
   cd backend
   npm run dev
2. Start the frontend application
   cd frontend
   npm run dev

## 🗂 Project Structure

Chatbot-Platform/
│
├── backend/
│   ├── config/              # Configuration files (DB, API keys, app config)
│   ├── controllers/         # Request handling & business logic
│   ├── middleware/          # Custom middlewares (auth, error handling)
│   ├── models/              # Database models / schemas
│   ├── routes/              # API route definitions
│   ├── node_modules/
│   ├── .env                 # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js            # Backend entry point
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, fonts
│   │   ├── components/      # Reusable UI components
│   │   ├── layouts/         # Layout components (wrappers, shells)
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API calls & service logic
│   │   ├── utils/           # Helper & utility functions
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx         # Frontend entry point
│   │
│   ├── node_modules/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
└── README.md

## 📌 Usage
1. Open the frontend application in your browser.
2. Enter a message in the chat input field.
3. The message is sent to the backend API.
4. The backend processes the request and returns a response (placeholder logic or integrated AI).

## 👨‍💻 Author
   Amar Singh
   GitHub: https://github.com/amarsin22


