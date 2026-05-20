# Registration Client

The frontend client of the Registration and Dashboard Portal.

## Setup & Running

1. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api"
   ```

3. Run the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Build for production:
   ```bash
   bun run build
   # or
   npm run build
   ```

## Production Routing Configuration
For routing to function correctly on Vercel deployments, a `vercel.json` is located in this directory to handle SPA rewrites to `/index.html`.
