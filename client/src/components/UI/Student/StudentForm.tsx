import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface AcademicInfo {
  admissionDate: string;
  aadhaarCardNumber: string;
  rollNumber: string;
}

interface ParentDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  parentPhoneNumber: string;
}

interface FormData {
  photo: File | null;
  name: string;
  dob: string;
  class: string;
  section: string;
  bloodGroup: string;
  nationality: string;
  registrationNumber: string;
  address: string;
  phoneNumber: string;
  academicInfo: AcademicInfo;
  parentDetails: ParentDetails;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    name: '',
    dob: '',
    class: '',
    section: '',
    bloodGroup: '',
    nationality: '',
    registrationNumber: '',
    address: '',
    phoneNumber: '',
    academicInfo: {
      admissionDate: '',
      aadhaarCardNumber: '',
      rollNumber: ''
    },
    parentDetails: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      parentPhoneNumber: ''
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const keys = name.split('.') as (keyof FormData | keyof AcademicInfo | keyof ParentDetails)[];

    setFormData((prevData) => {
      if (keys.length > 1) {
        const [mainKey, subKey] = keys as [keyof FormData, keyof (AcademicInfo | ParentDetails)];
        if (mainKey === 'academicInfo' || mainKey === 'parentDetails') {
          return {
            ...prevData,
            [mainKey]: {
              ...prevData[mainKey],
              [subKey]: value
            }
          };
        }
      } else if (files) {
        return {
          ...prevData,
          [name]: files[0]
        };
      } else {
        return {
          ...prevData,
          [name]: value
        };
      }
      return prevData; // Fallback in case no condition is met
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        photo: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (typeof value === 'object' && value !== null && key !== 'photo') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          data.append(`${key}.${subKey}`, subValue as string);
        });
      } else if (value instanceof File) {
        data.append(key, value);
      } else if (typeof value === 'string') {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/students', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Photo:</label>
        <input type="file" name="photo" onChange={handleFileChange} />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div>
        <label>Class:</label>
        <input type="text" name="class" value={formData.class} onChange={handleChange} required />
      </div>
      <div>
        <label>Section:</label>
        <input type="text" name="section" value={formData.section} onChange={handleChange} required />
      </div>
      <div>
        <label>Blood Group:</label>
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
      </div>
      <div>
        <label>Nationality:</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
      </div>
      <div>
        <label>Registration Number:</label>
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Admission Date:</label>
        <input type="date" name="academicInfo.admissionDate" value={formData.academicInfo.admissionDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Aadhaar Card Number:</label>
        <input type="text" name="academicInfo.aadhaarCardNumber" value={formData.academicInfo.aadhaarCardNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Roll Number:</label>
        <input type="text" name="academicInfo.rollNumber" value={formData.academicInfo.rollNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Father's Name:</label>
        <input type="text" name="parentDetails.fatherName" value={formData.parentDetails.fatherName} onChange={handleChange} required />
      </div>
      <div>
        <label>Father's Occupation:</label>
        <input type="text" name="parentDetails.fatherOccupation" value={formData.parentDetails.fatherOccupation} onChange={handleChange} required />
      </div>
      <div>
        <label>Mother's Name:</label>
        <input type="text" name="parentDetails.motherName" value={formData.parentDetails.motherName} onChange={handleChange} required />
      </div>
      <div>
        <label>Mother's Occupation:</label>
        <input type="text" name="parentDetails.motherOccupation" value={formData.parentDetails.motherOccupation} onChange={handleChange} required />
      </div>
      <div>
        <label>Parent's Phone Number:</label>
        <input type="text" name="parentDetails.parentPhoneNumber" value={formData.parentDetails.parentPhoneNumber} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
