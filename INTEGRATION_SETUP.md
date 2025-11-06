# API Integration Setup - Frontend to Backend Connection

## Overview
This document describes the successful integration between the React frontend (API-Integration-Task) and the Node.js/MongoDB backend (MongoDB-IT).

## What Was Implemented

### Backend Setup (MongoDB-IT)
1. **User Model** (`models/User.js`):
   - Created MongoDB schema with fields: firstName, lastName, age, email, phone, birthDate
   - Added validation for all fields
   - Configured unique email constraint
   - Added timestamps (createdAt, updatedAt)

2. **API Routes** (`routes/users.js`):
   - `GET /api/users` - Fetch all users
   - `GET /api/users/:id` - Fetch user by ID
   - `POST /api/users/add` - Create new user
   - `PUT /api/users/:id` - Update user
   - `DELETE /api/users/:id` - Delete user

3. **Server Configuration** (`server.js`):
   - Updated to include user routes
   - Configured CORS for frontend communication
   - MongoDB connection established

4. **Environment Configuration** (`.env`):
   - Set MongoDB URI: `mongodb://localhost:27017/api-integration-task`
   - Set PORT: `5000`

### Frontend Updates (API-Integration-Task)
1. **API Configuration** (`src/apis/user.ts`):
   - Changed API base URL from dummyjson.com to local backend
   - Updated all CRUD operations to work with new backend
   - Added support for both string (MongoDB) and number (local) IDs

2. **React Query Integration** (`src/hooks/useUserQueries.ts`):
   - Implemented hooks for all CRUD operations
   - Added optimistic updates for better UX
   - Configured proper cache invalidation

3. **UI Components** (`src/pages/pageA/users.tsx`):
   - Updated users page to fetch data from backend
   - Integrated create user functionality with backend
   - Combined backend and local store data for seamless experience

4. **Type Updates** (`src/components/data-table/columns.tsx`):
   - Updated User schema to support both string and number IDs
   - Enhanced action buttons with loading states
   - Added proper error handling

5. **Environment Configuration** (`.env`):
   - Added `VITE_API_BASE_URL=http://localhost:5000/api`

## How to Run

### Start Backend:
```bash
cd "MongoDB-IT"
npm start
```
Server runs on: http://localhost:5000

### Start Frontend:
```bash
cd "API-Integration-Task"
npm run dev
```
Frontend runs on: http://localhost:5173

## Usage
1. Navigate to http://localhost:5173/newly-added
2. Click "Add Data" to create new users
3. Users are saved to MongoDB database
4. All CRUD operations (View, Edit, Delete) work with the backend

## Database
- Uses local MongoDB instance
- Database name: `api-integration-task`
- Collection: `users`

## API Endpoints
- Base URL: `http://localhost:5000/api/users`
- All standard REST operations are available
- Returns JSON responses with proper error handling

## Features
- ✅ Create users and save to MongoDB
- ✅ View all users from database
- ✅ Edit existing users
- ✅ Delete users from database
- ✅ Real-time UI updates
- ✅ Error handling
- ✅ Loading states
- ✅ Data validation

The integration is now complete and functional!