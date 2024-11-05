import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';
import CustomButton from './custom_button';

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary  items-center flex-row space-x-4">
            <TextInput
                className="text-base text-white flex-1 font-pregular"
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                secureTextEntry={title === 'Password' && !showPassword}
                {...props}
            />
            <TouchableOpacity >
                <Image
                className = 'w-4 h-4'
                resizeMode='contain'
                source={icons.search}/>
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
