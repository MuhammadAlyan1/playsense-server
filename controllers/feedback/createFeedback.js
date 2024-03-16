const Feedback = require('../../db/model/feedback');

async function createFeedback(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { contents, type, game, status } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!contents || !profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newFeedback = await Feedback.create({
      contents,
      type: type || 'suggestion',
      game: game || 'apex legends',
      status: status || 'new',
      profileId
    });

    const newPopulatedFeedback = await Feedback.findById({
      _id: newFeedback._id
    }).populate({
      path: 'profileId',
      model: 'Profile'
    });

    return res.status(201).json({
      success: true,
      data: newPopulatedFeedback,
      message: 'Successfully created feedback'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create feedback' });
  }
}

module.exports = createFeedback;
