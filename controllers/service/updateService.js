const Service = require('../../db/model/service');

async function updateService(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { serviceId } = req.params;
  const {
    title,
    description,
    coverPicture,
    price,
    game,
    status,
    rating,
    total_sales
  } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!serviceId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter serviceId.'
    });
  }

  try {
    const existingService = await Service.findById(serviceId);

    if (!existingService) {
      return res.status(404).json({
        success: false,
        data: {},
        message: 'Service does not exists'
      });
    }

    if (existingService.profileId.toString() !== profileId) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this service.'
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        title: title || existingService.title,
        description: description || existingService.description,
        coverPicture: coverPicture || existingService.coverPicture,
        price: price || existingService.price,
        game: game || existingService.game,
        status: status || existingService.status,
        rating: rating || existingService.rating,
        total_sales: total_sales || existingService.total_sales
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: updatedService,
      message: 'Successfully updated service'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update service' });
  }
}

module.exports = updateService;
