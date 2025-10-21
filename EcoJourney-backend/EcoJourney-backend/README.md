
# EcoJourney Backend (Node.js + Express + MongoDB)

Track travel-related CO₂ emissions in **grams** for different modes (Car, Bus, Bike, Train, Flight, Walk). Secure JWT auth included.

## 🚀 Tech
- Node.js 20+, Express
- MongoDB (local)
- JWT auth, bcrypt password hashing
- CORS enabled

## ⚙️ Setup
```bash
npm install
cp .env.example .env
npm start
```
Server runs on http://localhost:5000

## 🧪 API (prefix: /api)
### Auth
- POST /api/auth/register
- POST /api/auth/login

### Journeys (requires Bearer token)
- POST /api/journeys
- GET /api/journeys
- GET /api/journeys/summary
