# Registration and Dashboard Portal

This project is a premium full-stack registration and login application featuring a modern glassmorphic dashboard interface, dynamic front-end pagination, validation schemas, and descriptive error messaging.

---

## Architectural Features

### Client
- Built using Vite, React 19, TypeScript, and Tailwind CSS.
- Interactive dashboard showing a users table with dynamic front-end pagination (5 entries per page for a total of 20 mock users).
- Modern premium dark theme with vibrant blue-green gradients, glassmorphic layout overlays, and custom glowing ambient backdrops.
- Robust error reporting that extracts and flashes specific, backend-returned error responses (e.g., "User already exists", "Invalid credentials") inside toast notifications.

### Server
- Node.js environment built with Express and TypeScript.
- Persistent data layer integrated with MongoDB Atlas via Mongoose.
- Strong schema validation using Zod for API endpoints.
- Secure password hashing using bcryptjs.
- Stateless authentication using JSON Web Tokens (JWT).
- Auto-restart and hot-reloading capability integrated with Nodemon.

---

## Tech Stack

### Frontend
- Vite
- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- React Router DOM

### Backend
- Node.js
- Express
- TypeScript
- MongoDB / Mongoose
- Zod
- JWT (jsonwebtoken)
- bcryptjs
- Nodemon

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher) or Bun installed on your machine.
- Access to a MongoDB database (local or MongoDB Atlas).

### Project Structure

```text
registration/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts            # Preconfigured Axios instance with baseURL
│   │   ├── components/
│   │   │   ├── protected-route.tsx # Restricts page access to logged-in users only
│   │   │   └── public-route.tsx    # Restricts page access to non-authenticated users
│   │   ├── data/
│   │   │   └── index.ts            # Mock data representing 20 database user profiles
│   │   ├── pages/
│   │   │   ├── dashboard.tsx       # Paginated dashboard displaying users and logout functionality
│   │   │   ├── login.tsx           # Authentication portal for registered users
│   │   │   └── register.tsx        # Registration portal with Zod validation feedback
│   │   ├── routes/
│   │   │   └── index.tsx           # Client-side router path setup
│   │   ├── App.tsx                 # Root application wrapper component
│   │   ├── index.css               # Global styling directives and custom Tailwind imports
│   │   └── main.tsx                # Client entrypoint mounting react application
│   ├── index.html
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
└── server/
    ├── config/
    │   └── db.ts                   # Mongoose configuration linking to MongoDB Atlas database
    ├── controllers/
    │   └── auth.controller.ts      # Auth route controller functions (register, login, getMe)
    ├── middlewares/
    │   ├── auth.middleware.ts      # Authentication guard verifying client JWT token signature
    │   └── rateLimiter.ts          # Middleware restricting maximum requests for safety
    ├── models/
    │   └── user.model.ts           # Mongoose model schema layout for database user entries
    ├── routes/
    │   └── auth.route.ts           # Server routing structure defining endpoints
    ├── utils/
    │   └── jwt.ts                  # Helper function issuing stateless JSON Web Tokens
    ├── validations/
    │   └── auth.validations.ts     # Zod schema definitions validating client request payloads
    ├── app.ts                      # Express routing app wrapper setting cors, helmet, and body-parsers
    ├── server.ts                   # Web server runner establishing database connections
    ├── nodemon.json
    ├── tsconfig.json
    └── package.json
```

---

## Installation & Setup

### Server Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Create a `.env` file in the root of the `server/` directory and configure the environment variables:
   ```env
   MONGO_URI="your_mongodb_connection_string"
   PORT=5000
   JWT_SECRET="your_jwt_secret_key"
   ```

4. Start the server in development mode:
   ```bash
   bun dev
   # or
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### Client Configuration

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Create a `.env` file in the root of the `client/` directory to configure the API base URL if needed (Axios is pre-configured to hit `http://localhost:5000/api`):
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api"
   ```

4. Run the frontend development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```
   The client application will run on `http://localhost:5173`. Open this URL in your web browser.

---

## API Documentation

### Base URL
All API requests are made to: `http://localhost:5000/api`

---

### 1. Register User

Creates a new user profile in the system.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`

- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "dob": "1995-10-15",
    "email": "janedoe@example.com",
    "password": "securepassword123"
  }
  ```

- **Validation Rules (Zod)**:
  - `name`: String, minimum 3 characters.
  - `dob`: String (format: YYYY-MM-DD).
  - `email`: Valid email format.
  - `password`: String, minimum 6 characters.

- **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "message": "Registration successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "data": {
        "id": "6472f8832a8848a47ff9618b",
        "name": "Jane Doe",
        "dob": "1995-10-15T00:00:00.000Z",
        "email": "janedoe@example.com"
      }
    }
    ```

- **Error Responses**:
  - **Code**: `400 Bad Request` (Email already registered)
    - **Content**:
      ```json
      {
        "message": "User already exists"
      }
      ```
  - **Code**: `400 Bad Request` (Zod Validation Failure)
    - **Content**:
      ```json
      {
        "message": "Validation Error",
        "errors": "Password must be at least 6 characters long"
      }
      ```
  - **Code**: `500 Internal Server Error`
    - **Content**:
      ```json
      {
        "message": "Failed to register user",
        "error": "Error details..."
      }
      ```

---

### 2. Login User

Authenticates existing user and retrieves a JSON Web Token.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`

- **Request Body**:
  ```json
  {
    "email": "janedoe@example.com",
    "password": "securepassword123"
  }
  ```

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "data": {
        "id": "6472f8832a8848a47ff9618b",
        "name": "Jane Doe",
        "dob": "1995-10-15T00:00:00.000Z",
        "email": "janedoe@example.com"
      }
    }
    ```

- **Error Responses**:
  - **Code**: `400 Bad Request` (Invalid email or password mismatch)
    - **Content**:
      ```json
      {
        "message": "Invalid credentials"
      }
      ```
  - **Code**: `400 Bad Request` (Zod Validation Failure)
    - **Content**:
      ```json
      {
        "message": "Validation Error",
        "errors": "Invalid email format"
      }
      ```

---

### 3. Get Current User Profile

Retrieves the profile data of the currently logged-in user.

- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token_string>`

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "_id": "6472f8832a8848a47ff9618b",
      "name": "Jane Doe",
      "dob": "1995-10-15T00:00:00.000Z",
      "email": "janedoe@example.com",
      "createdAt": "2026-05-20T07:11:42.000Z",
      "updatedAt": "2026-05-20T07:11:42.000Z",
      "__v": 0
    }
    ```

- **Error Responses**:
  - **Code**: `401 Unauthorized` (Token missing or malformed)
    - **Content**:
      ```json
      {
        "message": "No token provided, authorization denied"
      }
      ```
  - **Code**: `401 Unauthorized` (Token signature invalid or expired)
    - **Content**:
      ```json
      {
        "message": "Token is not valid"
      }
      ```
  - **Code**: `404 Not Found` (User profile not found in database)
    - **Content**:
      ```json
      {
        "message": "User not found"
      }
      ```


Built with ❤️ by [Jeet Das](https://github.com/JeetDas5)