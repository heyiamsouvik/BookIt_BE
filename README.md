# Travel Booking Backend

This is the backend service for the Travel Booking project. It provides APIs for authentication, destination listings, and booking functionality and validating promocode validation.

## Features

- User registration and login (JWT based)
- Add and fetch travel destinations
- Book trips (requires login)
- MongoDB database integration
- Environment-based configuration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication

---

## Folder Structure

backend/
┣ src/
┃ ┣ controllers/
┃ ┣ middleware/
┃ ┣ models/
┃ ┣ routes/
┃ ┣ utils/
┃ ┗ index.ts
┣ .env
┣ package.json
┗ tsconfig.json

## Installation

### 1. Clone repo
```bash
git clone https://github.com/heyiamsouvik/BookIt_BE.git
cd travel-backend
```
### 2. Install dependencies
```bash
npm install
cd BookIt_BE
```
### 3. Environment Setup
```bash
Create a `.env` file in root:
```

 - PORT=5000
 - DB_URL=your_mongo_connection_string
 - JWT_SECRET=your_jwt_secret_key
 - FE_WEBSITE_LINK=http://localhost:5173

- Make sure to replace the values with real credentials.

### 4. Start development server
```bash
node app.js
```

### 5. Test the endpoints 
```bash
http://localhost:5173/
```

