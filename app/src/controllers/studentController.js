const Student = require('../models/Student');

// Get all students
const getAllStudents = (req, res) => {
  const students = Student.getAll();
  res.json({
    success: true,
    data: students,
    count: students.length
  });
};

// Get student by ID
const getStudentById = (req, res) => {
  const { id } = req.params;
  const student = Student.getById(id);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  res.json({
    success: true,
    data: student
  });
};

// Create new student
const createStudent = (req, res) => {
  const { name, email, age, course } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  const newStudent = Student.create({ name, email, age, course });
  
  res.status(201).json({
    success: true,
    data: newStudent,
    message: 'Student created successfully'
  });
};

// Update student
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, email, age, course } = req.body;
  
  const updatedStudent = Student.update(id, { name, email, age, course });
  
  if (!updatedStudent) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  res.json({
    success: true,
    data: updatedStudent,
    message: 'Student updated successfully'
  });
};

// Delete student
const deleteStudent = (req, res) => {
  const { id } = req.params;
  
  const deleted = Student.delete(id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  res.json({
    success: true,
    message: 'Student deleted successfully'
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
