const Service = require('../../db/model/service');

async function createService(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { title, description, coverPicture, price, game, status } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!title || !description || !coverPicture || !price || !profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newService = await Service.create({
      title,
      description,
      coverPicture,
      price,
      game: game || 'apex legends',
      status: status || 'active',
      profileId
    });

    const newPopulatedService = await Service.findById({
      _id: newService._id
    }).populate({
      path: 'profileId',
      model: 'Profile'
    });

    return res.status(201).json({
      success: true,
      data: newPopulatedService,
      message: 'Successfully created service'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create service' });
  }
}

module.exports = createService;
