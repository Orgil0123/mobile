import { Pressable, StyleSheet, View } from 'react-native'
import React, { forwardRef } from 'react'
import Colors from '@/constants/Colors'

const ThemedButton = forwardRef(({ style, ...props }: { style?: any;[key: string]: any }, ref) => {
    return (
        <Pressable
            ref={ref as React.LegacyRef<View>}
            style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
            {...props}
        />
    )
})
const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: Colors.primary,
    },
    pressed: {
        opacity: 0.5,
    },
})

export default ThemedButton
