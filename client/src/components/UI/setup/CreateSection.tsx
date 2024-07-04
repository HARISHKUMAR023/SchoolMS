import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSection: React.FC = () => {
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/class-section/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/class-section/sections', { name, classId });
      console.log('Section created successfully:', response.data);
      setName('');
      setClassId('');
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Section</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Section Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 w-full"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Class</label>
          <select 
            value={classId} 
            onChange={(e) => setClassId(e.target.value)} 
            className="border p-2 w-full"
            required
          >
            <option value="">Select Class</option>
            {classes.map((classItem: any) => (
              <option key={classItem._id} value={classItem._id}>{classItem.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Section
        </button>
      </form>
    </div>
  );
};

export default CreateSection;
