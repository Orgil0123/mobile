import { StyleSheet, View, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const ThemedCard = ({ style, ...props }: { style?: any;[key: string]: any }) => {
    let colorScheme = useColorScheme()
    if (colorScheme == null) {
        colorScheme = 'light'
    }
    const theme = Colors[colorScheme]
    return (
        <View
            style={[{ backgroundColor: theme.cardBackground }, styles.card, style]}
            {...props}
        />
    )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 20,
    }
})
