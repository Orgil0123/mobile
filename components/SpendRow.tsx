import React, { useState } from 'react'
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react'
import { CategoryType, SpendType } from '@/types'
import ThemedView from './ThemedView'
import ThemedText from './ThemedText'
import Menu from './Menu'
import { mainStyles } from '@/constants/Styles'
import { Q } from '@nozbe/watermelondb'
import SpendUpdateModal from './SpendUpdateModal'

function formatDateToCustomString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


const SpendRow = ({ spend, category }: { spend: SpendType, category: CategoryType }) => {
    const database = useDatabase()
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [parentOptions, setParentOptions] = useState<CategoryType[]>([])
    const edit = async () => {
        setShowUpdateModal(true)
        const parentOptions = await database.collections.get('categories').query(Q.where('parent_id', Q.notEq(null))).fetch() as CategoryType[]
        setParentOptions(parentOptions)
    }
    const destroy = async (spendId: string) => {
        try {
            await database.write(async () => {
                const category = await database.collections.get('spends').find(spendId)
                if (category) {
                    await category.destroyPermanently()
                } else {
                    console.error(`Category with ID ${spendId} not found.`)
                }
            })
        } catch (error) {
            console.error(`Failed to delete category with ID ${spendId}:`, error)
        }
    }
    return (
        <>
            <ThemedView style={mainStyles.row}>
                <ThemedView style={mainStyles.cell}>
                    <ThemedText title>{spend.cost.toLocaleString('en-US')}₮</ThemedText>
                    <ThemedText>{category.name}</ThemedText>
                </ThemedView>
                <ThemedView style={mainStyles.cell}>
                    <ThemedText>{spend.desc}</ThemedText>
                    <ThemedText>{formatDateToCustomString(spend.createdAt)}</ThemedText>
                </ThemedView>
                <Menu edit={edit} destroy={destroy} cat={spend.id} />
            </ThemedView>
            <SpendUpdateModal visible={showUpdateModal} onClose={() => { setShowUpdateModal(false) }} parentOptions={parentOptions} categoryId={spend.id} />
        </>
    )
}
const enhanceRow = compose(
    withDatabase,
    //@ts-ignore
    withObservables(['categoryId', 'spendId'], ({ categoryId, spendId, database }: { database: any }) => (
        {
            category: database.get('categories').findAndObserve(categoryId),
            spend: database.get('spends').findAndObserve(spendId)
        }
    ))
)
const EnhancedSpendRow = enhanceRow(SpendRow)
export default EnhancedSpendRow 
