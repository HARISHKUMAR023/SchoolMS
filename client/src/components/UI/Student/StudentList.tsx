import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  dob: string;
  class: string;
  bloodGroup: string;
  address: string;
  contact: string;
  guardianName: string;
  additionalDetails: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students'); // Replace with your API endpoint
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleViewMore = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterClass(e.target.value);
  };

  const handleFilterBloodGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBloodGroup(e.target.value);
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterClass ? student.class === filterClass : true) &&
      (filterBloodGroup ? student.bloodGroup === filterBloodGroup : true)
    )
    .slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Student List</h2>
      <div className="mb-4 flex justify-between">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="border p-2 rounded"
        />
        <select value={filterClass} onChange={handleFilterClass} className="border p-2 rounded">
          <option value="">All Classes</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          {/* Add more class options as needed */}
        </select>
        <select value={filterBloodGroup} onChange={handleFilterBloodGroup} className="border p-2 rounded">
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          {/* Add more blood group options as needed */}
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">DOB</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Blood Group</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentStudents.map((student) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100" key={student._id}>
                <td className="py-3 px-6 text-left">{student.name}</td>
                <td className="py-3 px-6 text-left">{student.dob}</td>
                <td className="py-3 px-6 text-left">{student.class}</td>
                <td className="py-3 px-6 text-left">{student.bloodGroup}</td>
                <td className="py-3 px-6 text-left">
                  <button 
                    onClick={() => handleViewMore(student)} 
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className='flex justify-between'>
              <h3 className="text-xl font-semibold mb-4">Student Details</h3>
              <button 
                onClick={closeModal} 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
              >
                Close
              </button>
            </div>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>DOB:</strong> {selectedStudent.dob}</p>
            <p><strong>Class:</strong> {selectedStudent.class}</p>
            <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Contact:</strong> {selectedStudent.contact}</p>
            <p><strong>Guardian Name:</strong> {selectedStudent.guardianName}</p>
            <p><strong>Additional Details:</strong> {selectedStudent.additionalDetails}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
