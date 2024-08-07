const GameDatabase = require('../../db/model/gameDatabase');

async function addWeapon(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const {
    weaponType,
    weaponName,
    ammoType,
    fireMode,
    attachments,
    weaponImage,
    weaponIcon,
    bodyDamage,
    headshotDamage,
    legDamage,
    damagePerSecond,
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
    !weaponType?.trim() ||
    !weaponName?.trim() ||
    !weaponImage?.trim() ||
    !weaponIcon?.trim() ||
    !game?.trim() ||
    ammoType?.length === 0 ||
    fireMode?.length === 0 ||
    attachments?.length === 0 ||
    bodyDamage === 0 ||
    headshotDamage === 0 ||
    legDamage === 0 ||
    damagePerSecond === 0
  ) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newGameDatabaseEntry = await GameDatabase.create({
      itemType: 'weapon',
      weaponType,
      weaponName,
      ammoType,
      fireMode,
      attachments,
      weaponImage,
      weaponIcon,
      bodyDamage,
      headshotDamage,
      legDamage,
      damagePerSecond,
      game,
      addedBy: profileId
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

module.exports = addWeapon;
