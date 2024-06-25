import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
interface Student {
  name: string;
  dob: string;
  class: string;
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

const StudentForm: React.FC = () => {
  const formik = useFormik<Student>({
    initialValues: {
      name: '',
      dob: '',
      class: '',
      bloodGroup: '',
      nationality: '',
      registrationNumber: '',
      address: '',
      phoneNumber: '',
      academicInfo: {
        admissionDate: '',
        aadhaarCardNumber: '',
        rollNumber: '',
      },
      parentDetails: {
        fatherName: '',
        fatherOccupation: '',
        motherName: '',
        motherOccupation: '',
        parentPhoneNumber: '',
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      dob: Yup.date().required('Date of Birth is required'),
      class: Yup.string().required('Class is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      nationality: Yup.string().required('Nationality is required'),
      registrationNumber: Yup.string().required('Registration Number is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().required('Phone Number is required').min(10, 'Phone Number must be at least 10 characters'),
      academicInfo: Yup.object({
        admissionDate: Yup.date().required('Admission Date is required'),
        aadhaarCardNumber: Yup.string().required('Aadhaar Card Number is required'),
        rollNumber: Yup.string().required('Roll Number is required'),
      }),
      parentDetails: Yup.object({
        fatherName: Yup.string().required('Father\'s Name is required'),
        fatherOccupation: Yup.string().required('Father\'s Occupation is required'),
        motherName: Yup.string().required('Mother\'s Name is required'),
        motherOccupation: Yup.string().required('Mother\'s Occupation is required'),
        parentPhoneNumber: Yup.string().required('Parent Phone Number is required').min(10, 'Parent Phone Number must be at least 10 characters'),
      }),
    }),
    onSubmit: async (values: Student, { setSubmitting, resetForm }: FormikHelpers<Student>) => {
      try {
        const response = await axios.post('http://localhost:5000/api/students', values);
        console.log(response.data);
        toast.success('Student added successfully!');
        resetForm();
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        toast.error('There was an error submitting the form!');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">Student Information</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Basic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.dob && formik.errors.dob ? (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.class}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.class && formik.errors.class ? (
              <div className="text-red-500 text-sm">{formik.errors.class}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bloodGroup}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
              <div className="text-red-500 text-sm">{formik.errors.bloodGroup}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              type="text"
              name="nationality"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationality}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.nationality && formik.errors.nationality ? (
              <div className="text-red-500 text-sm">{formik.errors.nationality}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationNumber}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.registrationNumber && formik.errors.registrationNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.registrationNumber}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>

          {/* Academic Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Admission Date</label>
            <input
              type="date"
              name="academicInfo.admissionDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academicInfo.admissionDate}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.academicInfo?.admissionDate && formik.errors.academicInfo?.admissionDate ? (
              <div className="text-red-500 text-sm">{formik.errors.academicInfo.admissionDate}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhaar Card Number</label>
            <input
              type="text"
              name="academicInfo.aadhaarCardNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academicInfo.aadhaarCardNumber}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.academicInfo?.aadhaarCardNumber && formik.errors.academicInfo?.aadhaarCardNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.academicInfo.aadhaarCardNumber}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              name="academicInfo.rollNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academicInfo.rollNumber}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.academicInfo?.rollNumber && formik.errors.academicInfo?.rollNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.academicInfo.rollNumber}</div>
            ) : null}
          </div>

          {/* Parent Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              type="text"
              name="parentDetails.fatherName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentDetails.fatherName}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.parentDetails?.fatherName && formik.errors.parentDetails?.fatherName ? (
              <div className="text-red-500 text-sm">{formik.errors.parentDetails.fatherName}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
            <input
              type="text"
              name="parentDetails.fatherOccupation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentDetails.fatherOccupation}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.parentDetails?.fatherOccupation && formik.errors.parentDetails?.fatherOccupation ? (
              <div className="text-red-500 text-sm">{formik.errors.parentDetails.fatherOccupation}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              name="parentDetails.motherName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentDetails.motherName}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.parentDetails?.motherName && formik.errors.parentDetails?.motherName ? (
              <div className="text-red-500 text-sm">{formik.errors.parentDetails.motherName}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
            <input
              type="text"
              name="parentDetails.motherOccupation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentDetails.motherOccupation}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.parentDetails?.motherOccupation && formik.errors.parentDetails?.motherOccupation ? (
              <div className="text-red-500 text-sm">{formik.errors.parentDetails.motherOccupation}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Phone Number</label>
            <input
              type="text"
              name="parentDetails.parentPhoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parentDetails.parentPhoneNumber}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {formik.touched.parentDetails?.parentPhoneNumber && formik.errors.parentDetails?.parentPhoneNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.parentDetails.parentPhoneNumber}</div>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
