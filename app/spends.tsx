import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react'
import { CategoryType, SpendType } from '@/types'
import { Q } from '@nozbe/watermelondb'
import Container from '@/components/Container'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import ThemedButton from '@/components/ThemedButton'
import { Ionicons } from '@expo/vector-icons'
import SpendCreateModal from '@/components/SpendCreateModal'
import EnhancedSpendRow from '@/components/SpendRow'

const Spends = ({ spends }: { spends: SpendType[] }) => {
    const database = useDatabase()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [parentOptions, setParentOptions] = useState<CategoryType[]>([])
    const create = async () => {
        setShowCreateModal(true)
        const parentOptions = await database.collections.get('categories').query(Q.where('parent_id', Q.notEq(null))).fetch() as CategoryType[]
        setParentOptions(parentOptions)
    }

    return (
        <Container>
            <ThemedView style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText title>Зарлагууд</ThemedText>
                <ThemedButton onPress={create}>
                    <Ionicons
                        name='add'
                        size={24}
                    />
                </ThemedButton>
            </ThemedView>
            <ThemedView>
                <FlatList
                    data={spends}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        console.log(item)
                        if (item.category_id == undefined) {
                            return null;
                        }
                        //@ts-ignore
                        return <EnhancedSpendRow categoryId={item.category_id} spendId={item.id} />
                    }
                    }
                />
            </ThemedView>
            <SpendCreateModal visible={showCreateModal} onClose={() => { setShowCreateModal(false) }} parentOptions={parentOptions} />
        </Container>
    )
}

const enhance = compose(
    withDatabase,
    //@ts-ignore
    withObservables([], ({ database }: { database: any }) => ({
        spends: database.collections.get('spends').query(),
    })
    )
)

const EnhancedSpends = enhance(Spends)
export default EnhancedSpends

