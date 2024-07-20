import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableBill from '../../components/UI/Accounting/PrintableBill';

interface FormDetails {
  receiptNo: string;
  academicYear: string;
  classAndSection: string;
  studentName: string;
  admissionNo: string;
  receiptDate: string;
  receiptAmount: string;
  receiptNarration: string;
}

interface FeeDetail {
  feeType: string;
  month: string;
  feeAmount: string;
  paymentType: string;
  balance: string;
  nowPaid: string;
}

const FeeBillingPage: React.FC = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    receiptNo: '',
    academicYear: '',
    classAndSection: '',
    studentName: '',
    admissionNo: '',
    receiptDate: '',
    receiptAmount: '',
    receiptNarration: '',
  });

  const [feeDetails, setFeeDetails] = useState<FeeDetail[]>([{
    feeType: '',
    month: '',
    feeAmount: '',
    paymentType: '',
    balance: '',
    nowPaid: ''
  }]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleFeeDetailChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFeeDetails = [...feeDetails];
    newFeeDetails[index][name as keyof FeeDetail] = value;
    setFeeDetails(newFeeDetails);
  };

  const addFeeRow = () => {
    setFeeDetails([...feeDetails, { feeType: '', month: '', feeAmount: '', paymentType: '', balance: '', nowPaid: '' }]);
  };

  const removeFeeRow = (index: number) => {
    const newFeeDetails = feeDetails.filter((_, i) => i !== index);
    setFeeDetails(newFeeDetails);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Details:', formDetails);
    console.log('Fee Details:', feeDetails);
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Fee Billing Page</h1>
      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Receipt No</label>
          <input type="text" name="receiptNo" value={formDetails.receiptNo} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Academic Year</label>
          <input type="text" name="academicYear" value={formDetails.academicYear} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Class and Section</label>
          <input type="text" name="classAndSection" value={formDetails.classAndSection} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Student Name</label>
          <input type="text" name="studentName" value={formDetails.studentName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Admission No</label>
          <input type="text" name="admissionNo" value={formDetails.admissionNo} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Receipt Date</label>
          <input type="date" name="receiptDate" value={formDetails.receiptDate} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Receipt Amount</label>
          <input type="number" name="receiptAmount" value={formDetails.receiptAmount} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block mb-2">Receipt Narration</label>
          <input type="text" name="receiptNarration" value={formDetails.receiptNarration} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Bill</button>
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Fee Details</h2>
      <table className="w-full table-auto border-collapse border border-gray-400 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Fee Type</th>
            <th className="border border-gray-300 p-2">Month</th>
            <th className="border border-gray-300 p-2">Fee Amount</th>
            <th className="border border-gray-300 p-2">Payment Type</th>
            <th className="border border-gray-300 p-2">Balance</th>
            <th className="border border-gray-300 p-2">Now Paid</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeDetails.map((feeDetail, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input type="text" name="feeType" value={feeDetail.feeType} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <input type="text" name="month" value={feeDetail.month} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <input type="number" name="feeAmount" value={feeDetail.feeAmount} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <input type="text" name="paymentType" value={feeDetail.paymentType} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <input type="number" name="balance" value={feeDetail.balance} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <input type="number" name="nowPaid" value={feeDetail.nowPaid} onChange={(e) => handleFeeDetailChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
              </td>
              <td className="border border-gray-300 p-2">
                <button type="button" onClick={() => removeFeeRow(index)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addFeeRow} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Fee Row</button>
      <div className="flex justify-end">
        <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded">Print Bill</button>
      </div>

      <div style={{ display: 'none' }}>
        <div ref={componentRef} className='w-[100%] h-[100%]'>
          <PrintableBill formDetails={formDetails} feeDetails={feeDetails} />
        </div>
      </div>
    </div>
  );
};

export default FeeBillingPage;
