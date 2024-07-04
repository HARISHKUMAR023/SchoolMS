import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateSection from '../../components/UI/setup/CreateSection';
import CreateClass from '../../components/UI/setup/CreateClass';
const AssignClassSection = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:5000/api/students');
        console.log(studentResponse.data);
        const classResponse = await axios.get('http://localhost:5000/api/class-section/classes');
        const sectionResponse = await axios.get('http://localhost:5000/api/class-section/sections');
        setStudents(studentResponse.data);
        setClasses(classResponse.data);
        setSections(sectionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      await axios.put('http://localhost:5000/api/students/assign-class-section', {
        studentId: selectedStudent,
        classId: selectedClass,
        sectionId: selectedSection,
      });
      alert('Class and section assigned successfully');
    } catch (error) {
      console.error('Error assigning class and section:', error);
      alert('Error assigning class and section');
    }
  };

  return (
    <div>
        <CreateClass/>
        <CreateSection/>
      <h2>Assign Class and Section to Student</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Student:</label>
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Class:</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Section:</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>{section.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAssign}>Assign</button>
      </form>
    </div>
  );
};

export default AssignClassSection;
