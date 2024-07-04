import React, { useState } from 'react';
import axios from 'axios';

const CreateClass: React.FC = () => {
  const [name, setName] = useState('');
  const [teacherInCharge, setTeacherInCharge] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/class-section/classes', { name, teacherInCharge });
      console.log('Class created successfully:', response.data);
      setName('');
      setTeacherInCharge('');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Class</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Class Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 w-full"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teacher In Charge</label>
          <input 
            type="text" 
            value={teacherInCharge} 
            onChange={(e) => setTeacherInCharge(e.target.value)} 
            className="border p-2 w-full"
            required 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
