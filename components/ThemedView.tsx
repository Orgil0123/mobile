import { View, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const ThemedView = ({ style, ...props }: { style?: any;[key: string]: any }) => {
    let colorScheme = useColorScheme()
    if (colorScheme == null) {
        colorScheme = 'light'
    }
    const theme = Colors[colorScheme]
    return (
        <View
            style={[{ backgroundColor: theme.background }, style]}
            {...props}
        />
    )
}

export default ThemedView
