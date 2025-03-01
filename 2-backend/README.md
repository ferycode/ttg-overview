# Backend User API

A RESTful API service for managing users data.

## Requirements

- Node.js (v18 or higher)
- MySQL
- Docker (optional)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file in root directory
```env
NODE_ENV='development'

# Database
DATABASE_URL='mysql://user_db:pass_db@localhost:3306/ttg_db'
```

4. Setup database configuration in `config/database.json`
```json
{
  "development": {
    "username": "ttg", // user db
    "password": "ttg", // password db 
    "database": "ttg_db", // db name
    "host": "mysql", // set to localhost if not using docker
    "port": 3306,
    "dialect": "mysql"
  },
}
```

5. Run database migrations:
```bash
# Using Docker
npm run db:migrate

# Without Docker
npm run raw:db:migrate
```

6. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Using Docker
- Setup with docker compose
```
docker compose up -d
```

## API Documentation

### Users

#### Create User
```
POST /v1/users
```
Body:
- `email`: your email address (required)
- `password`: your password (optional)
- `name`: your name (optional)
- `phone`: your phone (optional)
- `address`: your address (optional)
```json
{
    "email": "user@example.com",
    "password": "123456",
    "name": "Fery Dedi Supardi",
    "phone": "+6285733100499",
    "address": "Malang"
}
```
Response:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "user@example.com",
        "name": "Fery Dedi Supardi",
        "phone": "+6285733100499",
        "address": "Malang",
        "updatedAt": "2025-02-28T22:40:06.244Z",
        "createdAt": "2025-02-28T22:40:06.244Z"
    }
}
```

#### List User
```
GET /v1/users
```
Query Parameters:
- `name`: user name (optional)
- `email`: user email (optional)
- `phone`: user phone (optional)
- `address`: user address (optional)
- `page`: page (optional, default 1)
- `perPage`: perPage (optional, default 50)

Sample:
- http://localhost:3000/v1/reports?periodStart=2025-02-25&periodEnd=2025-02-29&phone=+6285733100499&department=IT

Response:
```json
{
    "data": [
        {
            "id": 1,
            "email": "user1@example.com",
            "name": "User Name 1",
            "phone": "+6285733100499",
            "address": "Karangploso, Malang",
            "createdAt": "2025-02-28T22:36:41.000Z",
            "updatedAt": "2025-02-28T22:36:41.000Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "email": "user2@example.com",
            "name": "User Name 2",
            "phone": "+6285733100499",
            "address": "Karangploso, Malang",
            "createdAt": "2025-02-28T22:37:42.000Z",
            "updatedAt": "2025-02-28T22:37:42.000Z",
            "deletedAt": null
        }
    ],
    "count": 2
}
```

#### Detail User
```
GET /v1/users/:id
```
Response:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "user@example.com",
        "name": "Fery Dedi Supardi",
        "phone": "+6285733100499",
        "address": "Malang",
        "updatedAt": "2025-02-28T22:40:06.244Z",
        "createdAt": "2025-02-28T22:40:06.244Z"
    }
}
```

#### Update User
```
PUT /v1/users/:1
```
Body:
- `name`: your name (optional)
- `phone`: your phone (optional)
- `address`: your address (optional)
```json
{
    "name": "Fery Dedi Supardi",
    "phone": "+6285733100499",
    "address": "Malang"
}
```
Response:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "fery.dedi@gmail.com",
        "name": "Fery Dedi Supardi",
        "phone": "+6285733100499",
        "address": "Malang"
        "createdAt": "2025-02-28T22:36:41.000Z",
        "updatedAt": "2025-02-28T22:36:41.000Z",
        "deletedAt": null
    }
}
```

#### Delete User
```
DELETE /v1/users/:1
```
Response:
```json
{
    "success": true
}
```