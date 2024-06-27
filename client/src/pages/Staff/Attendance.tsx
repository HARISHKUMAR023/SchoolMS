import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
interface Student {
  _id: string;
  name: string;
  class: string;
  section: string;
  rollNumber: number;
}

interface AttendanceStatus {
  [key: string]: string;
}

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceStatus>({});
  const [date, setDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Automatically set today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    setDate(formattedDate);

    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const markAttendance = () => {
    setLoading(true);
    const attendancePromises = Object.keys(attendance).map(studentId => {
      return axios.post('http://localhost:5000/api/attendance', {
        student: studentId,
        date,
        status: attendance[studentId],
      })
      .then(response => response.data)
      .catch(error => {
        console.log(`Error marking attendance for student ${studentId}:`, error);
        throw error;
      });
    });
  
    const minLoadingTime = new Promise<void>(resolve => setTimeout(resolve, 10000));
  
    Promise.all([...attendancePromises, minLoadingTime])
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.log('Error marking attendance:', error);
        setLoading(false);
        if (error.response && error.response.status === 409) {
          toast.error('Attendance already taken for this student on this date.');
        } else {
          toast.error('Failed to mark attendance. Please try again later.');
        }
      });
  };
  

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const markAllAttendance = (status: string) => {
    const updatedAttendance: AttendanceStatus = {};
    students.forEach(student => {
      updatedAttendance[student._id] = status;
    });
    setAttendance(updatedAttendance);
  };

  return (
    <div className="container mx-auto p-4">
        <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <div className="mb-4 flex space-x-2">
        <span className="border rounded p-2 bg-gray-100">{date}</span>
        <button 
          onClick={() => markAllAttendance('present')} 
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Mark All Present
        </button>
        <button 
          onClick={() => markAllAttendance('absent')} 
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Mark All Absent
        </button>
      </div>
      <ul className="">
        {students.map(student => (
          <li key={student._id} className="flex items-center  border p-4 rounded">
            <div>
              <p>{student.name}</p>
              <p>{student.class} - {student.section}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleAttendanceChange(student._id, 'present')}
                className={`py-2 px-4 rounded-full font-bold ${attendance[student._id] === 'present' ? 'bg-green-500 text-white' : 'bg-white'}`}
              >
                P
              </button>
              <button 
                onClick={() => handleAttendanceChange(student._id, 'absent')}
                className={`py-2 px-4 rounded-full font-bold ${attendance[student._id] === 'absent' ? 'bg-red-500 text-white' : 'bg-white'}`}
              >
                A
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button 
        onClick={markAttendance} 
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Mark Attendance'}
      </button>
    </div>
  );
};

export default Attendance;
