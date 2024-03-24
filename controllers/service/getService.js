const Service = require('../../db/model/service');
const getService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter serviceId'
      });
    }

    const service = await Service.findById(serviceId).populate({
      path: 'profileId',
      model: 'Profile'
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        data: {},
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service,
      message: 'Service retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: {},
      message: 'Error retrieving service'
    });
  }
};

module.exports = getService;
