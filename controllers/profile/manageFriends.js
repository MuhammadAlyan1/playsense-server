const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');
const generateNotification = require('../notification/generateNotification');
const mongoose = require('mongoose');
const manageFriends = async (req, res) => {
  const user = req.user;
  const userId = user?.id;
  const profileId = user?.profileId;

  const { friendProfileId } = req.body;

  try {
    const existingProfile = await Profile.findById(profileId);

    if (!existingProfile) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    if (existingProfile.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this profile.'
      });
    }
    if (!friendProfileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter friend profile Id.'
      });
    }

    let updatedFriendList = existingProfile.friends || [];
    let friendlistMessage = 'added friend to friendlist!';
    console.log('UPDATED FRIEND LIST: ', updatedFriendList);
    if (updatedFriendList.includes(friendProfileId)) {
      updatedFriendList = updatedFriendList.filter(
        (friendId) => friendId.toString() !== friendProfileId
      );
      friendlistMessage = 'removed friend from friend list.';
    } else {
      updatedFriendList.push(friendProfileId);
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        friends: updatedFriendList
      },
      { new: true }
    );

    generateNotification({
      senderId: profileId,
      receiverId: friendProfileId,
      message: `${existingProfile.username} added you as a friend.`,
      type: 'social'
    });

    return res.status(200).json({
      success: true,
      data: updatedProfile,
      message: `Successfully ${friendlistMessage}`
    });
  } catch (error) {
    console.error(`Failed ${friendProfileId}: `, error);
    return res.status(400).json({
      success: false,
      data: {},
      message: `Failed ${friendProfileId}`
    });
  }
};

module.exports = manageFriends;
