import { Text, FlatList, View, Image, RefreshControl } from 'react-native'
import React, {useState}from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/search_input'
import Trending from '../../components/trending'
import EmptyState from '../../components/empty_state'

const Home = () => {


  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)

    // recall videos to check if any new videos appear

    setRefreshing(false) 
    
  }

  return (
    <SafeAreaView className='bg-primary pb-5  h-full'>
      <FlatList
        data={[
          { id: 1, title: 'First Item' },
          { id: 2, title: 'Second Item' },
          { id: 3, title: 'Third Item' },
        ]}
       
        keyExtractor={(item) => item.$id}

        renderItem={({ item }) => (
          <Text className='text-3xl text-white '>
            {item.title}
          </Text>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 px-4  '>
            <View className='justify-between items-start  flex-row mb-6'>
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
            <SearchInput placeholder={'Search for a video topic'} />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }] ?? []} />
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