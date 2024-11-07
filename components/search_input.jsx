import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';
import CustomButton from './custom_button';
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery,placeholder}) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary  items-center flex-row space-x-4">
            <TextInput
                className="text-base text-white flex-1 font-pregular"
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if(!query){
                        return Alert.alert('Missing Query ','Please input text to search in our database')
                    }

                    if(pathName.startsWith('/search')){
                        router.setParams({query})
                    }else{
                        router.push('/search/'+query)
                    }
                }
                }
            >
                <Image
                    className='w-4 h-4'
                    resizeMode='contain'
                    source={icons.search} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
