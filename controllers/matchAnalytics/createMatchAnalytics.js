const MatchAnalytics = require('../../db/model/matchAnalytics');

const createMatchAnalytics = async (req, res) => {
  const user = req.user;
  const userId = user.id;

  const {
    map,
    character,
    weapons,
    mode,
    eliminationReason,
    position,
    mapCoordinates
  } = req.body;

  if (
    !userId ||
    !map ||
    !mode ||
    !eliminationReason ||
    weapons.length === 0 ||
    isNaN(mapCoordinates.x) ||
    isNaN(mapCoordinates.y)
  ) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all fields.'
    });
  }

  let kills = 0;
  let downs = 0;
  let assists = 0;
  let damage = 0;

  weapons.forEach((weapon) => {
    kills += weapon?.kills || 0;
    assists += weapon?.assists || 0;
    downs += weapon?.downs || 0;
    damage += weapon?.damage || 0;
  });

  try {
    const newMatchAnalytics = await MatchAnalytics.create({
      userId,
      kills,
      assists,
      downs,
      damage,
      map,
      character,
      weapons,
      mode,
      eliminationReason,
      position,
      mapCoordinates
    });

    return res.status(201).json({
      success: true,
      data: newMatchAnalytics,
      message: 'Successfully created match analytics.'
    });
  } catch (error) {
    console.error('Error creating match analytics:', error);
    return res.status(500).json({
      success: false,
      data: {},
      message: 'Failed to create match analytics.'
    });
  }
};

module.exports = createMatchAnalytics;
