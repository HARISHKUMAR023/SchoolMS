import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const SubmitHomework = () => {
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [homeworkText, setHomeworkText] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    fetchClassAndSectionOptions();
  }, []);

  const fetchClassAndSectionOptions = async () => {
    try {
      const classResponse = await axios.get('http://localhost:5000/api/class-section/classes');
      const sectionResponse = await axios.get('http://localhost:5000/api/class-section/sections');
      setClassOptions(classResponse.data);
      setSectionOptions(sectionResponse.data);
    } catch (error) {
      console.error('Error fetching class and section options:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/homework', {
        classId: selectedClass,
        sectionId: selectedSection,
        homeworkText
      });
      alert('Homework submitted and SMS sent successfully');
        toast.success('Homework submitted and SMS sent successfully');
    } catch (error) {
      console.error('Error submitting homework:', error);
        toast.error('Error submitting homework:');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <ToastContainer />
      <div>
        <label>Class:</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required>
          <option value="">Select Class</option>
          {classOptions.map((cls) => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Section:</label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} required>
          <option value="">Select Section</option>
          {sectionOptions.map((sec) => (
            <option key={sec._id} value={sec._id}>{sec.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Homework:</label>
        <textarea value={homeworkText} onChange={(e) => setHomeworkText(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitHomework;
