# Registration Server

The backend API server of the Registration and Dashboard Portal.

## Setup & Running

1. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   MONGO_URI="your_mongodb_connection_string"
   PORT=5000
   JWT_SECRET="your_jwt_secret_key"
   ```

3. Run the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Build and start the production server:
   ```bash
   bun run build
   bun start
   # or
   npm run build
   npm start
   ```

## API Endpoints

- `POST /api/auth/register` - Create a new user profile
- `POST /api/auth/login` - Authenticate user and retrieve JWT token
- `GET /api/auth/me` - Retrieve current logged-in user profile (requires Authorization header)
