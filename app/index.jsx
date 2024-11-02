import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { images } from '../constants'
import CustomButton from '../components/custom_button';


export default function App() {
    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full justify-center items-center px-4 ">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[390px] w-full h-[300px]"
                        resizeMode='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover endless possibilities with {' '}
                            <Text className='text-secondary-200'>
                                AORA
                            </Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode='contain'
                        />

                    </View>

                    <Text className='text-sm text-gray-100 mt-7 text-center  font-pregular'>
                        Where creativity meets innovation:
                        embark on a journey of endless exploration with AORA.
                    </Text>

                    <CustomButton
                        title="Continue with E-mail"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style="light" />
        </SafeAreaView>
    );
}

