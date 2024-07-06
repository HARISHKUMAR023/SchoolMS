import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
interface Student {
  _id: string;
  photo: string;
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
  const printRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
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

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${studentToDelete._id}`); // Replace with your API endpoint
        setStudents(students.filter(student => student._id !== studentToDelete._id));
        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
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

  const downloadPDF = async () => {
    if (!selectedStudent || !printRef.current) return;

    const input = printRef.current;

    // Use html2canvas to capture the content as a canvas
    const canvas = await html2canvas(input, {
      useCORS: true,  // Allow cross-origin images to be loaded
      scale: 2,  // Increase the resolution of the canvas
      logging: true,  // Enable logging for troubleshooting
      onclone: (clonedDoc) => {
        // Ensure that the image is fully loaded in the cloned document
        const images = clonedDoc.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete) {
            img.onload = () => {
              // Do nothing, just wait for the image to load
            };
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Define custom margins
    const marginLeft = 10;
    const marginTop = 10;
    const pdfWidth = pdf.internal.pageSize.getWidth() - marginLeft * 2;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, pdfWidth, pdfHeight);
    pdf.save(`${selectedStudent.name}.pdf`);
  };

  const printContent = () => {
    if (!printRef.current) return;
  
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
  
    const contentWindow = iframe.contentWindow;
    if (contentWindow) {
      contentWindow.document.open();
      contentWindow.document.write('<html><head><title>Print</title></head><body>');
      contentWindow.document.write(printRef.current.innerHTML);
      contentWindow.document.write('</body></html>');
      contentWindow.document.close();
  
      // Wait for images to load
      const images = contentWindow.document.images;
      const imagesLoadedPromise: Promise<void>[] = Array.from(images).map(img => new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve on error to not block printing on image load failure
        }
      }));
  
      Promise.all(imagesLoadedPromise).then(() => {
        contentWindow.print();
        contentWindow.onafterprint = () => document.body.removeChild(iframe);
      });
    } else {
      alert("Unable to print. Please check your browser settings.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 dark:bg-darkbg2 bg-primarybg rounded-lg shadow max-h-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Student List</h2>
      <div className="mb-4 flex justify-between">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="p-2 rounded dark:bg-white/10 outline-none bg-gray-200/60 dark:text-white"
        />
        <select value={filterClass} onChange={handleFilterClass} className="p-2 rounded bg-gray-200/60  dark:bg-white/10 outline-none">
          <option className='dark:text-black dark:bg-white/10' value="">All Classes</option>
          <option className='dark:text-black dark:bg-white/10' value="Class 1">Class 1</option>
          <option className='dark:text-black dark:bg-white/10' value="Class 2">Class 2</option>
          {/* Add more class options as needed */}
        </select>
        <select value={filterBloodGroup} onChange={handleFilterBloodGroup} className="p-2 rounded bg-gray-200/60 dark:bg-white/10 outline-none">
          <option className='dark:text-black dark:bg-white/10' value="">All Blood Groups</option>
          <option className='dark:text-black dark:bg-white/10' value="A+">A+</option>
          <option className='dark:text-black dark:bg-white/10' value="B+">B+</option>
          {/* Add more blood group options as needed */}
        </select>
      </div>
      <div className="bg-white dark:bg-white/10 shadow-md rounded overflow-hidden">
        <table className="min-w-full ">
          <thead>
            <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">DOB</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Blood Group</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm  dark:text-white">
            {currentStudents.map((student) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 " key={student._id}>
                <td className="py-3 px-6 text-left">{student.name}</td>
                <td className="py-3 px-6 text-left">{student.dob}</td>
                <td className="py-3 px-6 text-left">{student.class}</td>
                <td className="py-3 px-6 text-left">{student.bloodGroup}</td>
                <td className="py-1 px-6 text-left">
                  <button 
                    onClick={() => handleViewMore(student)} 
                    className="bg-blue-500 px-2 py-1 rounded text-white dark:text-blue-400 hover:text-blue-700 focus:outline-none"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleViewMore(student)} 
                    className="bg-yellow-500 px-2 py-1 rounded text-white dark:text-yellow-400 hover:text-yellow-700 focus:outline-none mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(student)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    <MdDelete />
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
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div ref={printRef} className="pdf-content">
              <img src={`http://localhost:5000/${selectedStudent.photo}`} alt={selectedStudent.name} className="student-photo w-32 h-32 border border-gray-500" />
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
              <p><strong>Contact:</strong> {selectedStudent.contact}</p>
              <p><strong>Guardian Name:</strong> {selectedStudent.guardianName}</p>
              <p><strong>Additional Details:</strong> {selectedStudent.additionalDetails}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={downloadPDF} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Download PDF
              </button>
              <button 
                onClick={printContent} 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}


      
{isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md dark:bg-darkbg2 dark:text-white">
            <h3 className="text-xl font-bold mb-4 text-center">Confirm Delete</h3>
            <p className="text-center mb-4">Are you sure you want to delete {studentToDelete.name}?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
