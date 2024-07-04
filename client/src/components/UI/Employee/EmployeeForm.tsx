import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const initialValues = {
  name: '',
  dob: '',
  address: '',
  phoneNumber: '',
  email: '',
  joiningDate: '',
  employeeType: 'teacher',
  typeSpecificInfo: {
    subject: '',
    qualification: '',
    experience: 0,
    licenseNumber: '',
    routeNumber: '',
    busNumber: '',
    department: '',
    role: '',
  },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  dob: Yup.date().required('Date of Birth is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  joiningDate: Yup.date().required('Joining Date is required'),
  employeeType: Yup.string().required('Employee Type is required'),
//   typeSpecificInfo: Yup.object().shape({
//     subject: Yup.string().when('employeeType', {
//       is: 'teacher',
//       then: Yup.string().required('Subject is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     qualification: Yup.string().when('employeeType', {
//       is: 'teacher',
//       then: Yup.string().required('Qualification is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     experience: Yup.number().when('employeeType', {
//       is: (value: string) => ['teacher', 'driver', 'conductor', 'other'].includes(value),
//       then: Yup.number().required('Experience is required'),
//       otherwise: Yup.number().notRequired(),
//     }),
//     licenseNumber: Yup.string().when('employeeType', {
//       is: 'driver',
//       then: Yup.string().required('License Number is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     routeNumber: Yup.string().when('employeeType', {
//       is: 'driver',
//       then: Yup.string().required('Route Number is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     busNumber: Yup.string().when('employeeType', {
//       is: 'conductor',
//       then: Yup.string().required('Bus Number is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     department: Yup.string().when('employeeType', {
//       is: 'other',
//       then: Yup.string().required('Department is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//     role: Yup.string().when('employeeType', {
//       is: 'other',
//       then: Yup.string().required('Role is required'),
//       otherwise: Yup.string().notRequired(),
//     }),
//   }),
});

const EmployeeForm: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/employees', values);
        toast.success('Employee added successfully');
        console.log(response.data);
        // resetForm();
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        toast.error('There was an error submitting the form!');
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-white/10 shadow-gray-500 dark:shadow-black rounded-lg shadow-md">
         <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Employee Form</h2>
      <form onSubmit={formik.handleSubmit} className=''>
        <div id='full' className='flex w-full gap-x-8'>
          <div id='left' className='w-full'>
              <div className="mb-4">
                <label className="block text-sm font-medium dark:text-white text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none 
                            dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="mt-1 rounded-full text-red-500 text-sm">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-red-500 text-sm">{formik.errors.dob}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500 text-sm">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>
              
          </div>
        
          <div id='right' className='w-full'>
          <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.joiningDate}
                  className=" mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                />
                {formik.touched.joiningDate && formik.errors.joiningDate ? (
                  <div className="text-red-500 text-sm">{formik.errors.joiningDate}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="dark:text-white block text-sm font-medium text-gray-700">Employee Type</label>
                <select
                  name="employeeType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employeeType}
                  className="dark:text-white cursor-pointer mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10  dark:focus:border-white"
                >
                  <option value="teacher" className="dark:bg-darkbg1 dark:text-white">Teacher</option>
                  <option value="driver" className="dark:bg-darkbg1 dark:text-white">Driver</option>
                  <option value="conductor" className="dark:bg-darkbg1 dark:text-white">Conductor</option>
                  <option value="other" className="dark:bg-darkbg1 dark:text-white">Other</option>
                </select>
                {formik.touched.employeeType && formik.errors.employeeType ? (
                  <div className="text-red-500 text-sm">{formik.errors.employeeType}</div>
                ) : null}
              </div>
              {formik.values.employeeType === 'teacher' && (
                <>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.subject"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.subject}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.subject && formik.errors.typeSpecificInfo?.subject ? (
                      <div className="dark:text-red-400 text-red-500 text-sm">{formik.errors.typeSpecificInfo.subject}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className=" dark:text-white block text-sm font-medium text-gray-700">Qualification</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.qualification"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.qualification}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.qualification && formik.errors.typeSpecificInfo?.qualification ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.qualification}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">Experience</label>
                    <input
                      type="number"
                      name="typeSpecificInfo.experience"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.experience}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.experience && formik.errors.typeSpecificInfo?.experience ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.experience}</div>
                    ) : null}
                  </div>
                </>
              )}
              {formik.values.employeeType === 'driver' && (
                <>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">License Number</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.licenseNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.licenseNumber}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.licenseNumber && formik.errors.typeSpecificInfo?.licenseNumber ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.licenseNumber}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">Route Number</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.routeNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.routeNumber}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.routeNumber && formik.errors.typeSpecificInfo?.routeNumber ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.routeNumber}</div>
                    ) : null}
                  </div>
                </>
              )}
              {formik.values.employeeType === 'conductor' && (
                <div className="mb-4">
                  <label className="dark:text-white block text-sm font-medium text-gray-700">Bus Number</label>
                  <input
                    type="text"
                    name="typeSpecificInfo.busNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.typeSpecificInfo.busNumber}
                    className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                  />
                  {formik.touched.typeSpecificInfo?.busNumber && formik.errors.typeSpecificInfo?.busNumber ? (
                    <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.busNumber}</div>
                  ) : null}
                </div>
              )}
              {formik.values.employeeType === 'other' && (
                <>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.department"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.department}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.department && formik.errors.typeSpecificInfo?.department ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.department}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="dark:text-white block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      name="typeSpecificInfo.role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeSpecificInfo.role}
                      className="mt-1 p-2 block w-full border-b border-gray-300 focus:border-b-black outline-none dark:bg-white/10 dark:text-white dark:focus:border-white"
                    />
                    {formik.touched.typeSpecificInfo?.role && formik.errors.typeSpecificInfo?.role ? (
                      <div className="text-red-500 text-sm">{formik.errors.typeSpecificInfo.role}</div>
                    ) : null}
                  </div>
                </>
              )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
