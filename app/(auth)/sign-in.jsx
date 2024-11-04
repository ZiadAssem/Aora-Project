import { View, Text, ScrollView, Image,Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/form_field'
import CustomButton from '../../components/custom_button'
import { Link,router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  const [form, setform] = useState(
    {
      email: '',
      password: ''
    }
  )

  const submitForm = async () => {
    if( !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    };

    setIsSubmitting(true)
    try {
      const result = await signIn(form.email, form.password);

      // set it to global state

      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setIsSubmitting(false)
    }

  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView >
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>

          <Image
            source={images.logo}
            className='w-[115px] h-[35px]'
            resizeMode='contain' />

          <Text className='text-2xl text-white  mt-10 font-psemibold'>Log in to AORA</Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'

          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles='mt-7'

          />
          <CustomButton 
            title = 'Sign In'
            handlePress={submitForm}
            containerStyles='mt-7'
            isLoading={isSubmitting} 
          />

          <View className='justify-center pt-5  flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account? {' '}
              <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary '>
              Sign Up </Link>

            </Text>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn