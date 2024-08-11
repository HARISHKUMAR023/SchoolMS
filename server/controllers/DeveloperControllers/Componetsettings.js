const Setting = require('../../models/Settings');

exports.createComponentSettings = async (req,res)=>{
    const { component, isVisible } = req.body;

    try {
      const setting = await Setting.findOneAndUpdate(
        { component },
        { isVisible },
        { new: true, upsert: true } // Create if not exists, return the updated document
      );
      res.status(201).json(setting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

}

exports.getingComponentSettings = async (req, res )=>{
    try {
        const settings = await Setting.find();
        res.json(settings);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}