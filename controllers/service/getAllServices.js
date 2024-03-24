const Service = require('../../db/model/service');

async function getAllServices(req, res) {
  const { profileId } = req.query;
  try {
    let services = [];
    if (profileId) {
      services = await Service.find({ profileId })
        .sort({ createdAt: -1 })
        .populate({
          path: 'profileId',
          model: 'Profile'
        });
    } else {
      services = await Service.find({}).sort({ createdAt: -1 }).populate({
        path: 'profileId',
        model: 'Profile'
      });
    }

    if (services.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No services found' });
    }

    return res.status(200).json({
      success: true,
      data: services,
      message: 'Successfully retrieved all services'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        success: false,
        data: [],
        message: 'Failed to retrieve services'
      });
  }
}

module.exports = getAllServices;
