# Items List Application

A full-stack application with a frontend and backend for managing items.

## Project Structure

- `frontend/` - Frontend application
- `backend/` - Backend server and API

## Prerequisites

- Node.js
- PostgreSQL database
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the following variables in `.env`:
     - `DB_USER`: Your PostgreSQL username
     - `DB_PASSWORD`: Your PostgreSQL password
     - `DB_NAME`: Your database name
     - `DB_HOST`: Database host (default: localhost)
     - `DB_PORT`: Database port (default: 5432)
     - `PORT`: Backend server port (default: 3000)

4. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Development

- Backend runs on: `http://localhost:3000` (default)
- Frontend runs on: `http://localhost:5173` (default)

## License

MIT
