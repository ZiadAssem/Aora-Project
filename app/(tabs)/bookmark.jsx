import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-white text-xl font-psemibold'>Coming Soon!</Text>
      </View>
    </SafeAreaView>
  )
}

export default Bookmark