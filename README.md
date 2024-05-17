# Project Thinkable

This project is a Next.js application that provides APIs for managing Blog topics. It includes functionalities to create, retrieve, update, and delete topics in a MongoDB database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) (version 6.x or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or a cloud instance)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdelhadi-elbcir/Thinkable-Coding-Challenge.git
   cd project-thinkable
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start your MongoDB server if it's not already running.

2. Create a `.env.local` file in the root directory of your project and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production, run:
```bash
npm run build
```

This will create an optimized production build.

### Running Tests

1. Ensure you have the necessary dev dependencies installed:
   ```bash
   npm install --save-dev jest ts-jest @types/jest mongodb-memory-server mongoose
   ```

2. Run the tests:
   ```bash
   npm test
   ```

## API Documentation

### Create a Topic

**Endpoint**: `POST /api/topics`

**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "content": "string"
}
```

**Response**:
- `201 Created`:
  ```json
  {
    "message": "Topic Created"
  }
  ```
- `500 Internal Server Error`:
  ```json
  {
    "message": "Error creating topic"
  }
  ```

### Retrieve All Topics

**Endpoint**: `GET /api/topics`

**Response**:
- `200 OK`:
  ```json
  {
    "topics": [
      {
        "title": "string",
        "description": "string",
        "category": "string",
        "content": "string"
      }
    ]
  }
  ```

### Retrieve a Topic by ID

**Endpoint**: `GET /api/topics/:id`

**Response**:
- `200 OK`:
  ```json
  {
    "topic": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "content": "string"
    }
  }
  ```
- `404 Not Found`:
  ```json
  {
    "error": "Topic not found"
  }
  ```

### Update a Topic

**Endpoint**: `PUT /api/topics/:id`

**Request Body**:
```json
{
  "newTitle": "string",
  "newDescription": "string",
  "newContent": "string",
  "newCategory": "string"
}
```

**Response**:
- `200 OK`:
  ```json
  {
    "message": "Topic updated"
  }
  ```

### Delete a Topic

**Endpoint**: `DELETE /api/topics/:id`

**Response**:
- `200 OK`:
  ```json
  {
    "message": "Topic deleted"
  }
  ```
```
