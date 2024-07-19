const MatchAnalytics = require('../../db/model/matchAnalytics');
const User = require('../../db/model/user');
const mongoose = require('mongoose');

const getStatistics = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    const matches = await MatchAnalytics.find({
      profileId: new mongoose.Types.ObjectId(profileId)
    });

    if (matches.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: 'No match analytics found' });
    }

    let totalKills = 0;
    let totalDamage = 0;
    let totalDowns = 0;
    let totalAssists = 0;
    const eliminationReasons = {
      'Fair Fight': 0,
      'Focused Fire': 0,
      '3rd Partied': 0,
      'Resource Deficit': 0,
      'Zone Death': 0,
      Others: 0
    };
    const favoriteCharacters = {};
    const favoriteMaps = {
      'Kings Canyon': 0,
      'Broken Moon': 0,
      'Storm Point': 0,
      "World's Edge": 0,
      Olympus: 0,
      Others: 0
    };
    const characterKills = {};
    const weaponKills = {};
    const position = {
      'First Place': 0,
      'Second Place': 0,
      'Early Game': 0,
      'Top Three': 0,
      'Top Five': 0,
      'Top Ten': 0,
      Others: 0
    };
    const totalMatches = matches.length;

    matches.forEach((match) => {
      totalKills += match.kills;
      totalDamage += match.damage;
      totalAssists += match.assists;
      totalDowns += match.downs;

      favoriteCharacters[match.character] =
        (favoriteCharacters[match.character] || 0) + 1;

      favoriteMaps[match.map] = (favoriteMaps[match.map] || 0) + 1;

      characterKills[match.character] =
        (characterKills[match.character] || 0) + match.kills;

      eliminationReasons[match.eliminationReason] =
        (eliminationReasons[match.eliminationReason] || 0) + 1;

      position[match.position] = (position[match.position] || 0) + 1;

      match?.weapons?.forEach((weapon) => {
        weaponKills[weapon.name] =
          (weaponKills[weapon.name] || 0) + weapon.kills;
      });
    });

    // Aggregate metrics
    // const totalKills = matches.reduce((acc, match) => acc + match.kills, 0);
    // const totalDamage = matches.reduce((acc, match) => acc + match.damage, 0);
    // const totalAssists = matches.reduce((acc, match) => acc + match.assists, 0);
    // const deathReasons = matches.reduce((acc, match) => {
    //   acc[match.eliminationReason] = (acc[match.eliminationReason] || 0) + 1;
    //   return acc;
    // }, {});

    // const favoriteMap = matches
    //   .map((match) => match.map)
    //   .reduce((acc, map) => {
    //     acc[map] = (acc[map] || 0) + 1;
    //     return acc;
    //   }, {});

    // const favoriteCharacters = matches
    //   .map((match) => match.character)
    //   .reduce((acc, character) => {
    //     acc[character] = (acc[character] || 0) + 1;
    //     return acc;
    //   }, {});

    return res.status(200).json({
      success: true,
      data: {
        totalMatches,
        totalKills,
        totalDamage,
        totalAssists,
        totalDowns,
        averageKills: totalKills / totalMatches,
        averageDamage: totalDamage / totalMatches,
        averageAssists: totalAssists / totalMatches,
        averageDowns: totalDowns / totalMatches,
        eliminationReasons,
        favoriteCharacters,
        favoriteMaps,
        characterKills,
        weaponKills,
        position
      },
      message: 'Successfully retrieve user statistics'
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve user statistics'
    });
  }
};

module.exports = getStatistics;
