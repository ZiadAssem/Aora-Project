import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/custom_button';
import { useGlobalContext } from '../context/global_provider';

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    // Redirect to home if user is logged in and not loading
    if (!isLoading && isLoggedIn) return <Redirect href='/home' />;

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View className="w-full min-h justify-center items-center px-4">
                    {/* Logo Image */}
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    {/* Cards Image */}
                    <Image
                        source={images.cards}
                        className="max-w-[390px] w-full h-[300px]"
                        resizeMode='contain'
                    />
                    {/* Title Section */}
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
                    {/* Subtitle Text */}
                    <Text className='text-sm text-gray-100 mt-7 text-center font-pregular'>
                        Where creativity meets innovation:
                        embark on a journey of endless exploration with AORA.
                    </Text>
                    {/* Continue Button */}
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
