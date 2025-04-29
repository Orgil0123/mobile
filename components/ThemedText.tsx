import { Text, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const ThemedText = ({ style, title = false, ...props }: { style?: any, title?: boolean;[key: string]: any }) => {
    let colorScheme = useColorScheme()
    if (colorScheme == null) {
        colorScheme = 'light'
    }
    const theme = Colors[colorScheme]

    const textColor = title ? theme.title : theme.text
    const textSize = title ? 24 : 12
    const textBold = title ? 600 : 400
    return (
        <Text
            style={[{ color: textColor, fontSize: textSize, fontWeight: textBold }, style]}
            {...props}
        />
    )
}

export default ThemedText
