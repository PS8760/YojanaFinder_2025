# YojanaFinder 🇮🇳

A modern web application to help Indian citizens discover government schemes and benefits they're eligible for. Built with React, Firebase, and powered by AI for intelligent scheme recommendations.

## 🚀 How to Run the Project

### Step 1: Start Backend Server

```bash
# Navigate to backend directory
cd YojanaFinder/yf/backend

# Install dependencies (first time only)
npm install

# Start backend server
npm run dev
```

**Backend will run on:** http://localhost:8091

### Step 2: Start Frontend Server

Open a new terminal:

```bash
# Navigate to frontend directory
cd YojanaFinder/yf

# Install dependencies (first time only)
npm install

# Start frontend server
npm run dev
```

**Frontend will run on:** http://localhost:5173

## 📋 Environment Setup

### Backend Environment (backend/.env)
```env
PORT=8091
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_PROJECT_ID=yojana-527ea
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
MONGO_URI=your_mongodb_connection_string
```

### Frontend Environment (.env)
```env
VITE_FIREBASE_API_KEY=AIzaSyCcDXPJrnp9uL9LDwv95BEAvBgy4rycC_M
VITE_FIREBASE_AUTH_DOMAIN=yojana-527ea.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=yojana-527ea
VITE_FIREBASE_STORAGE_BUCKET=yojana-527ea.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=262280638660
VITE_FIREBASE_APP_ID=1:262280638660:web:e7c3661171a779b8089991
VITE_API_URL=http://localhost:8091
```

## 🛠️ Available Commands

### Backend Commands (from backend/ directory)
- `npm run dev` - Start backend development server
- `npm start` - Start backend production server

### Frontend Commands (from root directory)
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run lint` - Run code linting

## 🔧 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Firebase
- **Backend**: Node.js, Express.js, Firebase Admin, Gemini AI
- **Database**: Firebase Firestore, MongoDB

## 📁 Project Structure

```
YojanaFinder/yf/
├── src/                    # Frontend React code
├── backend/               # Backend Express server
├── public/               # Static assets
├── .env                  # Frontend environment variables
└── backend/.env          # Backend environment variables
```

## ✨ Features

- AI-powered scheme search using Gemini
- User authentication with Firebase
- Responsive mobile-first design
- Real-time scheme recommendations
- Contact form with backend integration

---

**Access URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8091
