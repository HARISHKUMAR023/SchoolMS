import { useSelector } from 'react-redux';
import { RootState } from '../../Store/index';
import { useEffect, useState } from 'react';

const Mystudent = () => {
    const teacherId = useSelector((state: RootState) => state.auth.teacherId);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        if (teacherId) {
            fetchStudentInformation(teacherId);
        }
    }, [teacherId]);

    const fetchStudentInformation = async (teacherId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/teacher/${teacherId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student information');
            }
            const studentsData = await response.json();
            setStudents(studentsData); // Assuming studentsData is an array of Student objects
        } catch (error) {
            console.error('Error fetching student information:', error);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-3">My Students</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">Grade</th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{student.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{student.age}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{student.grade}</td>
                                {/* Add more columns based on student data */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mystudent;
