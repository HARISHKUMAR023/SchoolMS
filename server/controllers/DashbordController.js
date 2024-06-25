const StudentModel = require('../models/Student');

exports.totalStudent =  async (req,res)=>{
    try {
        const studentCount = await StudentModel.countDocuments();
        res.json({ count: studentCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}