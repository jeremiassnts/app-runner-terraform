// In-memory storage for students
let students = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 20,
    course: 'Computer Science'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 22,
    course: 'Engineering'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 21,
    course: 'Mathematics'
  }
];

let nextId = 4;

class Student {
  // Get all students
  static getAll() {
    return students;
  }
  
  // Get student by ID
  static getById(id) {
    return students.find(student => student.id === id);
  }
  
  // Create new student
  static create(data) {
    const newStudent = {
      id: String(nextId++),
      name: data.name,
      email: data.email,
      age: data.age || null,
      course: data.course || null
    };
    
    students.push(newStudent);
    return newStudent;
  }
  
  // Update student
  static update(id, data) {
    const index = students.findIndex(student => student.id === id);
    
    if (index === -1) {
      return null;
    }
    
    students[index] = {
      ...students[index],
      ...data,
      id: students[index].id // Ensure ID doesn't change
    };
    
    return students[index];
  }
  
  // Delete student
  static delete(id) {
    const index = students.findIndex(student => student.id === id);
    
    if (index === -1) {
      return false;
    }
    
    students.splice(index, 1);
    return true;
  }
  
  // Reset data (useful for testing)
  static reset() {
    students = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 20,
        course: 'Computer Science'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 22,
        course: 'Engineering'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        age: 21,
        course: 'Mathematics'
      }
    ];
    nextId = 4;
  }
}

module.exports = Student;
