const request = require('supertest');
const app = require('../server');
const Student = require('../models/Student');

describe('Student API Tests', () => {
  beforeEach(() => {
    // Reset students data before each test
    Student.reset();
  });

  describe('GET /api/students', () => {
    it('should return all students', async () => {
      const response = await request(app).get('/api/students');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.count).toBe(3);
    });
  });

  describe('GET /api/students/:id', () => {
    it('should return a student by ID', async () => {
      const response = await request(app).get('/api/students/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('1');
      expect(response.body.data.name).toBe('John Doe');
    });

    it('should return 404 for non-existent student', async () => {
      const response = await request(app).get('/api/students/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Student not found');
    });
  });

  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const newStudent = {
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        age: 19,
        course: 'Physics'
      };

      const response = await request(app)
        .post('/api/students')
        .send(newStudent);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Alice Brown');
      expect(response.body.data.email).toBe('alice.brown@example.com');
      expect(response.body.message).toBe('Student created successfully');
    });

    it('should return 400 if name is missing', async () => {
      const invalidStudent = {
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/students')
        .send(invalidStudent);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Name and email are required');
    });

    it('should return 400 if email is missing', async () => {
      const invalidStudent = {
        name: 'Test Student'
      };

      const response = await request(app)
        .post('/api/students')
        .send(invalidStudent);
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/students/:id', () => {
    it('should update an existing student', async () => {
      const updateData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        age: 21,
        course: 'Computer Science'
      };

      const response = await request(app)
        .put('/api/students/1')
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('John Updated');
      expect(response.body.message).toBe('Student updated successfully');
    });

    it('should return 404 for non-existent student', async () => {
      const updateData = {
        name: 'Test',
        email: 'test@example.com'
      };

      const response = await request(app)
        .put('/api/students/999')
        .send(updateData);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('should delete a student', async () => {
      const response = await request(app).delete('/api/students/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Student deleted successfully');

      // Verify student is deleted
      const getResponse = await request(app).get('/api/students/1');
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent student', async () => {
      const response = await request(app).delete('/api/students/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });
  });
});
