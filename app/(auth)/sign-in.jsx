import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/form_field'
import CustomButton from '../../components/custom_button'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/global_provider'

const SignIn = () => {
  // State for form fields
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Global context
  const { setUser, setIsLoggedIn } = useGlobalContext()

  // Form submission handler
  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await signIn(form.email, form.password)
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'Logged in successfully')
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          {/* Logo */}
          <Image
            source={images.logo}
            className='w-[115px] h-[35px]'
            resizeMode='contain'
          />

          {/* Title */}
          <Text className='text-2xl text-white mt-10 font-psemibold'>
            Log in to AORA
          </Text>

          {/* Email Field */}
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* Password Field */}
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          {/* Sign In Button */}
          <CustomButton
            title='Sign In'
            handlePress={submitForm}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          {/* Sign Up Link */}
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?{' '}
              <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary'>
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn