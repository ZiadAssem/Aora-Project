import { Text, FlatList, View, TouchableOpacity, Image, } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/search_input'
import EmptyState from '../../components/empty_state'
import { getUserPosts, searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/use_appwrite'
import VideoCard from '../../components/video_card'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from './../../context/global_provider';
import { icons } from '../../constants'
import InfoBox from '../../components/info_box'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, } = useAppwrite(() => getUserPosts(user.$id))

  const logout = () => {

  }

  return (
    <SafeAreaView className='bg-primary pb-5  h-full' >
      <FlatList
        data={posts}

        keyExtractor={(item) => item.$id}

        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}

        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>

            <View className="w-full flex-row justify-end mb-10">
              <TouchableOpacity onPress={logout}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg '
            />

            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts.length || 0}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />

            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No videos found' subtitle='Looks like there are no videos with that title' />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile