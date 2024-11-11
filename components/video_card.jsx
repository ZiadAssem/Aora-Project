import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import { likeOrUnlike } from '../lib/appwrite';
import { useGlobalContext } from '../context/global_provider';
import { FontAwesome } from '@expo/vector-icons';

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    $id,
    number_of_likes,
    liked_by,
    creator: { username, avatar },
  },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);

  // Local state for likes
  const [isLiked, setIsLiked] = useState(
    liked_by.some((like_user) => like_user.$id === user.$id)
  );
  const [localNumberOfLikes, setLocalNumberOfLikes] = useState(number_of_likes);

  // Handler for like button press
  const handleLikeToggle = () => {
    if (isLiked) {
      // User already liked, so we "unlike"
      setIsLiked(false);
      setLocalNumberOfLikes((prev) => Math.max(prev - 1, 0));

      // Filter out current user from liked_by
      const updatedLikedBy = liked_by.filter(
        (liked_user) => liked_user.$id !== user.$id
      );

      // Call Appwrite function
      likeOrUnlike($id, updatedLikedBy, localNumberOfLikes - 1);
    } else {
      // User hasn't liked, so we "like"
      setIsLiked(true);
      setLocalNumberOfLikes((prev) => prev + 1);

      // Add current user to liked_by
      const updatedLikedBy = [...liked_by, user];

      // Call Appwrite function
      likeOrUnlike($id, updatedLikedBy, localNumberOfLikes + 1);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Header Section */}
      <View className="flex-row gap-3 items-start">
        {/* Avatar and Username Section */}
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        {/* Like Button Section */}
        <TouchableOpacity onPress={handleLikeToggle}>
          <View className="pt-2">
            {isLiked ? (
              <FontAwesome name="heart" size={30} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={30} color="grey" />
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* Video Section */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) =>
            status.didJustFinish ? setPlay(false) : null
          }
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
