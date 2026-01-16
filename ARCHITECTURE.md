# System Architecture – Chatbot Platform

## 1. Architecture Overview

The Chatbot Platform follows a **client–server architecture** with a clear separation between frontend and backend.  
The frontend handles user interaction and UI rendering, while the backend processes requests and generates chatbot responses.

The frontend and backend communicate using **RESTful APIs** over HTTP.

---

## 2. High-Level Architecture Flow

User  
↓  
Frontend (React + Vite + Tailwind CSS)  
↓ REST API  
Backend (Node.js + Express)  
↓  
Chat Logic / AI Integration  

---

## 3. Frontend Architecture

### Technology Stack
- React.js
- Vite
- Tailwind CSS
- JavaScript
- Deployed on Vercel

### Responsibilities
- Render chat user interface
- Capture user input
- Send messages to backend API
- Display chatbot responses
- Handle UI states (loading, messages, errors)

### Frontend Flow
1. User types a message in the chat input.
2. The message is sent to the backend using a REST API request.
3. The UI waits for the response.
4. The chatbot reply is displayed in the chat window.

---

## 4. Backend Architecture

### Technology Stack
- Node.js
- Express.js
- REST API

### Responsibilities
- Receive chat messages from frontend
- Validate incoming requests
- Execute chatbot logic (placeholder or AI-based)
- Send responses back to the frontend

### Backend Flow
1. Backend receives a POST request from the frontend.
2. Request data is validated.
3. Chat logic processes the message.
4. A response is generated.
5. Response is returned as JSON.

---

## 5. API Communication

### Sample Request
```json
{
  "message": "Hello"
}

### Sample Response
{
  "reply": "Hi! How can I help you?"
}
