// src/components/AddClass.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddClass: React.FC = () => {
  const [className, setClassName] = useState<string>('');
  const [sections, setSections] = useState<string[]>(['']);
  
  const handleSectionChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, '']);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/classes', {
        name: className,
        sections: sections.filter(section => section) // Remove empty sections
      });
      setClassName('');
      setSections(['']);
      alert('Class and sections added successfully!');
    } catch (error) {
      console.log(error);
      alert('Failed to add class and sections.');
    }
  };

  return (
    <div>
      <h2>Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input 
            type="text" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Sections:</label>
          {sections.map((section, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={section}
                onChange={(e) => handleSectionChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveSection(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddSection}>Add Section</button>
        </div>
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
