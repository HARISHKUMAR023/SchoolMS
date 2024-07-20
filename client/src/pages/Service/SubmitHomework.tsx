import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

interface ClassOption {
  _id: string;
  name: string;
}

interface SectionOption {
  _id: string;
  name: string;
}

const SubmitHomework: React.FC = () => {
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [sectionOptions, setSectionOptions] = useState<SectionOption[]>([]);
  const [homeworkText, setHomeworkText] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMessageType, setSelectedMessageType] = useState<string>('');

  const messageTemplates: { [key: string]: string } = {
    homework: 'Please complete the following homework: ',
    holiday: 'School will be closed for holidays on the following dates: ',
    feesPending: 'Your fees are pending. Please pay the due amount by the following date: ',
  };

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

  const handleMessageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setSelectedMessageType(selectedType);
    setHomeworkText(messageTemplates[selectedType] || '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/homework', {
        classId: selectedClass,
        sectionId: selectedSection,
        homeworkText,
      });
      toast.success('Message submitted and SMS sent successfully');
      setHomeworkText('');
      setSelectedClass('');
      setSelectedSection('');
      setSelectedMessageType('');
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error(`Error submitting message`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=''>
 <form onSubmit={handleSubmit} className="max-w-md  mt-10 p-4 border rounded shadow-lg">
      <ToastContainer />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Class</option>
          {classOptions.map((cls) => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Section:</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Section</option>
          {sectionOptions.map((sec) => (
            <option key={sec._id} value={sec._id}>{sec.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Message Type:</label>
        <select
          value={selectedMessageType}
          onChange={handleMessageTypeChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Message Type</option>
          <option value="homework">Homework</option>
          <option value="holiday">Holiday</option>
          <option value="feesPending">Fees Pending</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
        <textarea
          value={homeworkText}
          onChange={(e) => setHomeworkText(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded "
          rows={4}
          placeholder="Enter message"
          cols={50}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    </div>
   
  );
};

export default SubmitHomework;
