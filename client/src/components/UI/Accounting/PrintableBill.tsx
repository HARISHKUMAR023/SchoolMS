import React from 'react';
import logo from '../../../../public/black.svg';

interface FormDetails {
  studentName: string;
  receiptNo: string;
  // className: string;
  // section: string;
  receiptDate: string;
}

interface FeeDetail {
  feeType: string;
  month: string;
  feeAmount:string;
  paymentType: string;
  balance: string;
  nowPaid: string;
}

interface PrintableBillProps {
  formDetails: FormDetails;
  feeDetails: FeeDetail[];
}

const PrintableBill: React.FC<PrintableBillProps> = ({ formDetails, feeDetails }) => {
  return (
    <div className="p-8  rounded-md  max-w-4xl mx-auto ">
       <div className="absolute inset-0 opacity-10 flex justify-center items-center">
        <img src={logo} alt="Watermark" className="h-96" />
      </div>
      <div className="flex justify-between items-center mb-8">
        <img src={logo} alt="Logo" className="h-16" />
        <div className="text-right">
          <h2 className="text-2xl font-bold">School Name</h2>
          <p className="text-sm">Address Line 1</p>
          <p className="text-sm">Address Line 2</p>
          <p className="text-sm">City, State, ZIP Code</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold">Billing Information</h3>
        <p><strong>Student Name:</strong> {formDetails.studentName}</p>
        <p><strong>Receipt No:</strong> {formDetails.receiptNo}</p>
        {/* <p><strong>Class:</strong> {formDetails.className}</p>
        <p><strong>Section:</strong> {formDetails.section}</p> */}
        <p><strong>Date:</strong> {formDetails.receiptDate}</p>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-400 mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Fee Type</th>
            <th className="border border-gray-300 p-2">Month</th>
            <th className="border border-gray-300 p-2">Fee Amount</th>
            <th className="border border-gray-300 p-2">Payment Type</th>
            <th className="border border-gray-300 p-2">Balance</th>
            <th className="border border-gray-300 p-2">Now Paid</th>
          </tr>
        </thead>
        <tbody>
          {feeDetails.map((feeDetail, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{feeDetail.feeType}</td>
              <td className="border border-gray-300 p-2">{feeDetail.month}</td>
              <td className="border border-gray-300 p-2">{feeDetail.feeAmount}</td>
              <td className="border border-gray-300 p-2">{feeDetail.paymentType}</td>
              <td className="border border-gray-300 p-2">{feeDetail.balance}</td>
              <td className="border border-gray-300 p-2">{feeDetail.nowPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mb-8">
        <p className="text-lg"><strong>Total Amount Due:</strong> ₹{feeDetails.reduce((sum, detail) => sum + parseInt(detail.balance), 0)}</p>
        <p className="text-lg"><strong>Total Paid:</strong> ₹{feeDetails.reduce((sum, detail) => sum + parseInt(detail.nowPaid), 0)}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold">Disclaimer</h3>
        <p className="text-sm">This bill is computer generated and does not require a signature. Please ensure all payments are made before the due date to avoid any late fees.</p>
      </div>

      <div className="text-center ">
        <p className="text-sm">Thank you for your prompt payment!</p>
        <p className="text-sm">For any queries, contact us at (123) 456-7890 or email at info@schoolname.com</p>
      </div>
    </div>
  );
};

export default PrintableBill;
