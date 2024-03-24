const Service = require('../../db/model/service');

async function deleteService(req, res) {
  const user = req.user;
  const profileId = user?.profileId;

  const { serviceId } = req.params;

  if (!serviceId) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter service ID' });
  }

  try {
    const service = await Service.findById({ _id: serviceId });

    if (!service) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Service does not exist' });
    }

    console.log('SERVICE ID: ', service.profileId, 'USER ID: ', profileId);

    // if (!user.roles.includes('admin') && service?.profileId?.toString() !== profileId) {
    if (service?.profileId?.toString() !== profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'You do not have permission to delete this service'
      });
    }
    const { deletedCount } = await Service.deleteOne({ _id: service.id });

    if (deletedCount === 1) {
      return res.status(200).json({
        success: true,
        data: {},
        message: 'Successfully deleted service'
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete service' });
  }
}

module.exports = deleteService;
