# Items List Backend

This is the backend server for the Items List application. It provides RESTful APIs for managing items and user authentication.

## Features

- User authentication (register/login) with JWT
- CRUD operations for items
- PostgreSQL database integration
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database:
```bash
createdb items_db
```

4. Set up environment variables by creating a `.env` file:
```
PORT=5001
DATABASE_URL=postgresql://localhost:5432/items_db
JWT_SECRET=your_jwt_secret_key
```

5. Run database migrations:
```bash
psql -d items_db -f src/db/schema.sql
```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
  - Body: { name: string, email: string, password: string }
- POST /api/auth/login - Login user
  - Body: { email: string, password: string }

### Items
- GET /api/items - Get all items
- GET /api/items/:id - Get a single item by ID
- POST /api/items - Create a new item (requires authentication)
  - Body: { name: string, description: string }
- PUT /api/items/:id - Update an item (requires authentication)
  - Body: { name: string, description: string }
- DELETE /api/items/:id - Delete an item (requires authentication)

All authenticated routes require an 'x-auth-token' header with a valid JWT token.

## Testing

Run tests:
```bash
npm test
``` 