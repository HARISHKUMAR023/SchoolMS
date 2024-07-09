import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './StudentForm.css'


interface ClassSection {
  _id: string;
  name: string;
}

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

const initialFormData: FormData = {
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
};

const StudentForm: React.FC = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [classOptions, setClassOptions] = useState<ClassSection[]>([]);
  const [sectionOptions, setSectionOptions] = useState<ClassSection[]>([]);

  useEffect(() => {
    fetchClassAndSectionOptions();
  }, []);

  const fetchClassAndSectionOptions = async () => {
    try {
      const classResponse = await axios.get<ClassSection[]>('http://localhost:5000/api/class-section/classes');
      const sectionResponse = await axios.get<ClassSection[]>('http://localhost:5000/api/class-section/sections');
      setClassOptions(classResponse.data);
      setSectionOptions(sectionResponse.data);
    } catch (error) {
      console.error('Error fetching class and section options:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    let files: FileList | null = null;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      files = e.target.files;
    }
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

    if (files && files.length > 0) {
      previewFile(files[0]);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        photo: files[0]
      }));
      previewFile(files[0]);
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
      // Clear form fields after successful submission
      toast.success('Student added successfully!');
      setFormData(initialFormData);
      setImagePreviewUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  return ( 
      <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-white/10 shadow-gray-500 dark:shadow-black rounded-lg shadow-md">
       <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Studednts Form</h2>
        <form onSubmit={handleSubmit}>
          <div id='photo'>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">Photo</label>
            {imagePreviewUrl && (
        <div>
          <img src={imagePreviewUrl} 
               alt="Preview" 
               className='mb-2 mt-2 size-28'/>
          </div>
         )}
            <input type="file" name="photo" onChange={handleFileChange} className='bg-transparent' />
          </div>
               
          <div id="full" className="flex w-full gap-x-8 mt-4">
            <div id="left" className="w-full space-y-4">
             <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Class
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="cursor-pointer mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10  dark:focus:border-white"
                >
                  <option value="" className="dark:bg-darkbg1 dark:text-white">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls._id} value={cls._id} className="dark:bg-darkbg1 dark:text-white">
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className="cursor-pointer mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10  dark:focus:border-white"
                >
                  <option value="" className="dark:bg-darkbg1 dark:text-white">
                    Select Section
                  </option>
                  {sectionOptions.map((sec) => (
                    <option
                      key={sec._id}
                      value={sec._id}
                      className="dark:bg-darkbg1 dark:text-white hover:bg-white/10 hover:text-black"
                    >
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Blood Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                              dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
  
            <div id="right" className="w-full space-y-4">
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Admission Date
                </label>
                <input
                  type="date"
                  name="academicInfo.admissionDate"
                  value={formData.academicInfo.admissionDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Aadhaar Card Number
                </label>
                <input
                  type="text"
                  name="academicInfo.aadhaarCardNumber"
                  value={formData.academicInfo.aadhaarCardNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="academicInfo.rollNumber"
                  value={formData.academicInfo.rollNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="parentDetails.fatherName"
                  value={formData.parentDetails.fatherName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Father's Occupation
                </label>
                <input
                  type="text"
                  name="parentDetails.fatherOccupation"
                  value={formData.parentDetails.fatherOccupation}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Mother's Name:
                </label>
                <input
                  type="text"
                  name="parentDetails.motherName"
                  value={formData.parentDetails.motherName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Mother's Occupation
                </label>
                <input
                  type="text"
                  name="parentDetails.motherOccupation"
                  value={formData.parentDetails.motherOccupation}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div>
                <label className="dark:text-white block text-sm font-medium text-gray-700">
                  Parent's Phone Number
                </label>
                <input
                  type="text"
                  name="parentDetails.parentPhoneNumber"
                  value={formData.parentDetails.parentPhoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
              </div>
              <div className='flex'><button 
                type="submit"
                className="mt-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md ml-auto"
                >Submit</button>    </div>
            </div>
          </div>
          
        </form>
      </div>

  );
};

export default StudentForm;
