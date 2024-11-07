import { Text, FlatList, View, } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/search_input'
import EmptyState from '../../components/empty_state'
import {searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/use_appwrite'
import VideoCard from '../../components/video_card'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

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
          <View className='my-6 px-4  '>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>
            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} placeholder={'Search for a video topic'} />
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

export default Search