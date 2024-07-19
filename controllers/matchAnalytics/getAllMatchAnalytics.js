const MatchAnalytics = require('../../db/model/matchAnalytics');

async function getAllMatchAnalytics(req, res) {
  const { profileId } = req.query;
  try {
    let matchAnalytics = [];
    if (profileId) {
      matchAnalytics = await MatchAnalytics.find({ profileId }).sort({
        createdAt: -1
      });
    } else {
      matchAnalytics = await MatchAnalytics.find({}).sort({ createdAt: -1 });
    }

    if (matchAnalytics.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: 'No match analytics found' });
    }

    return res.status(200).json({
      success: true,
      data: matchAnalytics,
      message: 'Successfully retrieved all matchAnalytics'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: [],
      message: 'Failed to retrieve match analytics'
    });
  }
}

module.exports = getAllMatchAnalytics;
