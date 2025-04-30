import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { Ionicons } from '@expo/vector-icons'
import { Category } from '@/types'
import { FlatList } from 'react-native'
import { mainStyles } from '@/constants/Styles'
import Menu from '@/components/Menu'

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    return (
        <Container>
            <ThemedView style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText title>Ангилал</ThemedText>
                <ThemedButton>
                    <Ionicons
                        name='add'
                        size={24}
                    />
                </ThemedButton>
            </ThemedView>
            <ThemedView>
                <ThemedView style={mainStyles.headerRow}>
                    <ThemedText style={mainStyles.headerCell}>№</ThemedText>
                    <ThemedText style={mainStyles.headerCell}>Ангилал</ThemedText>
                    <ThemedText style={mainStyles.headerCell}></ThemedText>
                </ThemedView>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <ThemedView style={mainStyles.row}>
                            <ThemedText style={mainStyles.cell}>{index + 1}</ThemedText>
                            <ThemedText style={mainStyles.cell}>{item.name}</ThemedText>
                            <Menu />
                        </ThemedView>
                    )}
                />
            </ThemedView>
        </Container>
    )
}

export default Categories

