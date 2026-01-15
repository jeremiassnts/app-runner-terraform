# Student CRUD API

A simple REST API built with Node.js and Express for managing students with CRUD operations (Create, Read, Update, Delete). Data is stored in-memory using an array.

## Project Structure

```
app/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # Data models (in-memory)
│   ├── routes/           # API routes
│   ├── __tests__/        # Test files
│   └── server.js         # Main server file
├── package.json
└── jest.config.js
```

## Features

- RESTful API with Express.js
- In-memory data storage (array of students)
- Full CRUD operations (Create, Read, Update, Delete)
- Input validation
- CORS enabled
- Comprehensive test suite with Jest and Supertest
- Health check endpoint
- Docker support with multi-stage build

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

## Getting Started

### Local Development

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

4. Start the production server:
```bash
npm start
```

## API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create new student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |
| GET | `/health` | Health check |

### Student Object Schema

```json
{
  "id": "string",
  "name": "string (required)",
  "email": "string (required)",
  "age": "number (optional)",
  "course": "string (optional)"
}
```

### Example Requests

**Get All Students:**
```bash
curl http://localhost:3000/api/students
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 20,
      "course": "Computer Science"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "age": 22,
      "course": "Engineering"
    }
  ],
  "count": 2
}
```

**Get Student by ID:**
```bash
curl http://localhost:3000/api/students/1
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "course": "Computer Science"
  }
}
```

**Create Student:**
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Brown",
    "email": "alice@example.com",
    "age": 19,
    "course": "Physics"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "4",
    "name": "Alice Brown",
    "email": "alice@example.com",
    "age": 19,
    "course": "Physics"
  },
  "message": "Student created successfully"
}
```

**Update Student:**
```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 21,
    "course": "Computer Science"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 21,
    "course": "Computer Science"
  },
  "message": "Student updated successfully"
}
```

**Delete Student:**
```bash
curl -X DELETE http://localhost:3000/api/students/1
```

Response:
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Health Check:**
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Testing

The API includes comprehensive test coverage for all endpoints:

```bash
cd app
npm test
```

To run tests with coverage report:
```bash
npm test -- --coverage
```

### Test Coverage

Tests include:
- ✅ GET all students
- ✅ GET student by ID
- ✅ GET student by ID (404 error)
- ✅ POST create student
- ✅ POST create student (validation errors)
- ✅ PUT update student
- ✅ PUT update student (404 error)
- ✅ DELETE student
- ✅ DELETE student (404 error)
- ✅ Health check endpoint

## Docker Deployment

### Build and run with Docker:

```bash
# Build the image
docker build -t student-crud-api .

# Run the container
docker run -p 3000:3000 student-crud-api
```

### Using Docker Compose:

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

The Dockerfile uses a multi-stage build:
1. **Builder stage**: Installs all dependencies
2. **Production stage**: Copies only necessary files and production dependencies for a smaller, optimized image

## Project Structure Details

### Main Files

- **`src/server.js`**: Main application entry point, sets up Express server
- **`src/routes/studentRoutes.js`**: Defines all API routes
- **`src/controllers/studentController.js`**: Contains business logic for each endpoint
- **`src/models/Student.js`**: Data model with in-memory storage and CRUD methods

### Initial Data

The API comes pre-populated with 3 sample students:
1. John Doe (Computer Science)
2. Jane Smith (Engineering)
3. Mike Johnson (Mathematics)

**Note:** Since data is stored in-memory, all changes will be lost when the server restarts.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-Origin Resource Sharing middleware
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library for testing
- **Docker**: Containerization

## Environment Variables

You can customize the server port using environment variables:

```bash
PORT=4000 npm start
```

Default port is `3000`.

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

## Development Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon (auto-reload)
npm test        # Run tests
npm test -- --coverage  # Run tests with coverage report
```

## Future Improvements

For production use, consider adding:
- Database integration (PostgreSQL, MongoDB, etc.)
- Authentication and authorization (JWT)
- Input sanitization and validation library (Joi, express-validator)
- Rate limiting
- Request logging (Morgan, Winston)
- API documentation (Swagger/OpenAPI)
- Environment configuration (.env files)
- Pagination for large datasets
- Search and filtering capabilities

## License

MIT
