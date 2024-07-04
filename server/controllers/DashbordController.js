const StudentModel = require('../models/Student');
const EmployeeModel = require('../models/Employee');
exports.totalStudent =  async (req,res)=>{
    try {
        const studentCount = await StudentModel.countDocuments();
        res.json({ count: studentCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.totalEmployee = async (req,res)=>{
    try {
        const employeeCount = await EmployeeModel.countDocuments();
        res.json({ count: employeeCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}