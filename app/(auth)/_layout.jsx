import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar' 

const AuthLayout = () => {
  return (
    <>
      {/* Stack Navigator for Authentication Screens */}
      <Stack>
        {/* Sign In Screen */}
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        {/* Sign Up Screen */}
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false
          }}
        />
      </Stack>

      {/* Status Bar Configuration */}
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout