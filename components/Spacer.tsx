import { DimensionValue, View } from 'react-native'
import React from 'react'

const Spacer = ({ width = '100%', height = 40 }: { width?: DimensionValue, height?: number }) => {
    return (
        <View
            style={{ width, height }}
        />
    );
};

export default Spacer
