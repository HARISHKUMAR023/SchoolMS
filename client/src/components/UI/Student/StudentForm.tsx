import { useState } from 'react';
import axios from 'axios';

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
  academicInfo: {
    admissionDate: string;
    aadhaarCardNumber: string;
    rollNumber: string;
  };
  parentDetails: {
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    parentPhoneNumber: string;
  };
}

const StudentForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const formValue = formData[key as keyof FormData];

        if (key === 'photo') {
          // Handle file separately
          if (formValue instanceof File) {
            data.append(key, formValue);
          }
        } else if (typeof formValue === 'object' && formValue !== null) {
          // Handle nested objects
          for (const subKey in formValue) {
            if (Object.prototype.hasOwnProperty.call(formValue, subKey)) {
              data.append(`${key}.${subKey}`, formValue[subKey as keyof typeof formValue]);
            }
          }
        } else {
          // Handle other simple types
          data.append(key, formValue as string);
        }
      }
    }

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
