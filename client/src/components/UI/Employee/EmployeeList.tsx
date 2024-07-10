import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Employee {
  _id: string;
  photo: string;
  name: string;
  dob: string;
  phoneNumber: string;
  employeeType: string;
  experience: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmployeeType, setFilterEmployeeType] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const printRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewMore = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterEmployeeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterEmployeeType(e.target.value);
  };

  const handleFilterExperience = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterExperience(e.target.value);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${employeeToDelete._id}`); // Replace with your API endpoint
        setEmployees(employees.filter(employee => employee._id !== employeeToDelete._id));
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterEmployeeType ? employee.employeeType === filterEmployeeType : true) &&
      (filterExperience ? employee.experience === filterExperience : true)
    )
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

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
    if (!selectedEmployee || !printRef.current) return;

    const input = printRef.current;

    const canvas = await html2canvas(input, {
      useCORS: true,
      scale: 2,
      logging: true,
      onclone: (clonedDoc) => {
        const images = clonedDoc.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete) {
            img.onload = () => {};
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const marginLeft = 10;
    const marginTop = 10;
    const pdfWidth = pdf.internal.pageSize.getWidth() - marginLeft * 2;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', marginLeft, marginTop, pdfWidth, pdfHeight);
    pdf.save(`${selectedEmployee.name}.pdf`);
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

      const images = contentWindow.document.images;
      const imagesLoadedPromise: Promise<void>[] = Array.from(images).map(img => new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
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
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Employee List</h2>
      <div className="mb-4 flex justify-between">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="border p-2 rounded"
        />
        <select value={filterEmployeeType} onChange={handleFilterEmployeeType} className="border p-2 rounded">
          <option value="">All Employee Types</option>
          <option value="teacher">Teacher</option>
          <option value="Driver">Driver</option>
        </select>
        <select value={filterExperience} onChange={handleFilterExperience} className="border p-2 rounded">
          <option value="">All Experience Levels</option>
          <option value="A+">2 Years</option>
          <option value="B+">3 years</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">DOB</th>
              <th className="py-3 px-6 text-left">Employee Type</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentEmployees.map((employee) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100" key={employee._id}>
                <td className="py-3 px-6 text-left">{employee.name}</td>
                <td className="py-3 px-6 text-left">{employee.dob}</td>
                <td className="py-3 px-6 text-left">{employee.employeeType}</td>
                <td className="py-1 px-6 text-left">
                  <button 
                    onClick={() => handleViewMore(employee)} 
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-700 focus:outline-none"
                  >
                    <FaEye />
                  </button>
                  <button 
                    onClick={() => handleViewMore(employee)} 
                    className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-700 focus:outline-none mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(employee)} 
                    className="text-red-500 dark:text-red-400 hover:text-red-700 focus:outline-none mx-1"
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

      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <div className='flex justify-between'>
              <h3 className="text-xl font-semibold mb-4">Employee Details</h3>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div ref={printRef} className="pdf-content">
              {/* <img src={`http://localhost:5000/${selectedEmployee.photo}`} alt={selectedEmployee.name} className="employee-photo w-32 h-32 border border-gray-500" /> */}
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>DOB:</strong> {selectedEmployee.dob}</p>
              <p><strong>Employee Type:</strong> {selectedEmployee.employeeType}</p>
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

      {isDeleteModalOpen && employeeToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Confirm Delete</h3>
            <p className="text-center mb-4">Are you sure you want to delete {employeeToDelete.name}?</p>
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

export default EmployeeList;
