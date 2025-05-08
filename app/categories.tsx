import React, { useState } from 'react'
import Container from '@/components/Container'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import { Ionicons } from '@expo/vector-icons'
import { FlatList } from 'react-native'
import { mainStyles } from '@/constants/Styles'
import Menu from '@/components/Menu'
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react'
import { CategoryType } from '@/types'
import CategoryCreateModal from '@/components/CategoryCreateModal'
import { Q } from '@nozbe/watermelondb'
import EnhancedCategoryRow from '@/components/CategoryRow'


const Categories = ({ categories }: { categories: CategoryType[] }) => {
    const database = useDatabase()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [parentOptions, setParentOptions] = useState<CategoryType[]>([])
    const create = async () => {
        setShowCreateModal(true)
        const parentOptions = await database.collections.get('categories').query(Q.where('parent_id', Q.eq(null))).fetch() as CategoryType[]
        setParentOptions(parentOptions)
    }

    return (
        <Container>
            <ThemedView style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText title>Ангилал</ThemedText>
                <ThemedButton onPress={create}>
                    <Ionicons
                        name='add'
                        size={24}
                    />
                </ThemedButton>
            </ThemedView>
            <ThemedView>
                <ThemedView style={mainStyles.headerRow}>
                    <ThemedText style={mainStyles.headerCell}>Ерөнхий ангилал</ThemedText>
                    <ThemedText style={mainStyles.headerCell}>Ангилал</ThemedText>
                    <ThemedText style={mainStyles.headerCell}></ThemedText>
                </ThemedView>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    //@ts-ignore
                    renderItem={({ item }) => <EnhancedCategoryRow categoryId={item.id} parentId={item.parent_id} />}
                />
            </ThemedView>
            <CategoryCreateModal visible={showCreateModal} onClose={() => { setShowCreateModal(false) }} parentOptions={parentOptions} />
        </Container>
    )
}
const enhance = compose(
    withDatabase,
    //@ts-ignore
    withObservables([], ({ database }: { database: any }) => ({
        categories: database.collections.get('categories').query(),
    })
    )
)

const EnhancedCategories = enhance(Categories)
export default EnhancedCategories


