import { Text, FlatList, View, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/search_input'
import Trending from '../../components/trending'
import EmptyState from '../../components/empty_state'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/use_appwrite'
import VideoCard from '../../components/video_card'
import { useGlobalContext } from '../../context/global_provider'

const Home = () => {
  // Fetch posts data using custom hook
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)


  // State for refresh control
  const [refreshing, setRefreshing] = useState(false)

  // Function to handle refresh action
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  // console.log(posts[0]?.$id)
  return (
    <SafeAreaView className='bg-primary pb-5 h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (

          <VideoCard video={item}
         //  userId={user.$id}
            />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            {/* Header Section */}
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  Ziad
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  className='w-9 h-10'
                  source={images.logoSmall}
                />
              </View>
            </View>
            {/* Search Input */}
            <SearchInput placeholder={'Search for a video topic'} />
            {/* Trending Section */}
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No videos found' subtitle='Be the first one to upload a video' />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home
