const GameDatabase = require('../../db/model/gameDatabase');

async function addLegend(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const {
    legendClass,
    legendName,
    passiveAbilityName,
    passiveAbilityDescription,
    tacticalAbilityName,
    tacticalAbilityDescription,
    ultimateAbilityName,
    ultimateAbilityDescription,
    legendImage,
    legendIcon,
    passiveAbilityIcon,
    tacticalAbilityIcon,
    ultimateAbilityIcon,
    game
  } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (
    !legendClass.trim() ||
    !legendName.trim() ||
    !passiveAbilityName.trim() ||
    !passiveAbilityDescription.trim() ||
    !tacticalAbilityName.trim() ||
    !tacticalAbilityDescription.trim() ||
    !ultimateAbilityName.trim() ||
    !ultimateAbilityDescription.trim() ||
    !legendIcon ||
    !legendImage ||
    !passiveAbilityIcon ||
    !tacticalAbilityIcon ||
    !ultimateAbilityIcon
  ) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newGameDatabaseEntry = await GameDatabase.create({
      legendClass,
      legendName,
      passiveAbilityName,
      passiveAbilityDescription,
      tacticalAbilityName,
      tacticalAbilityDescription,
      ultimateAbilityName,
      ultimateAbilityDescription,
      legendIcon,
      legendImage,
      passiveAbilityIcon,
      tacticalAbilityIcon,
      ultimateAbilityIcon,
      game,
      addedBy: profileId,
      itemType: 'legend'
    });

    const newPopulatedGameDatabaseEntry = await GameDatabase.findById({
      _id: newGameDatabaseEntry._id
    }).populate({
      path: 'addedBy',
      model: 'Profile'
    });

    return res.status(201).json({
      success: true,
      data: newPopulatedGameDatabaseEntry,
      message: 'Successfully added game database entry.'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed add game database entry.'
    });
  }
}

module.exports = addLegend;
