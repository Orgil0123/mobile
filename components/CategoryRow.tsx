import React, { useState } from 'react'
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react'
import { CategoryType } from '@/types'
import ThemedView from './ThemedView'
import ThemedText from './ThemedText'
import Menu from './Menu'
import { mainStyles } from '@/constants/Styles'
import { Q } from '@nozbe/watermelondb'
import CategoryUpdateModal from './CategoryUpdateModal'

const CategoryRow = ({ parent, category }: { parent: CategoryType | null, category: CategoryType }) => {
    const database = useDatabase()
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [parentOptions, setParentOptions] = useState<CategoryType[]>([])
    const edit = async () => {
        setShowUpdateModal(true)
        const parentOptions = await database.collections.get('categories').query(Q.where('parent_id', Q.eq(null))).fetch() as CategoryType[]
        setParentOptions(parentOptions)
    }
    const destroy = async (catId: string) => {
        try {
            await database.write(async () => {
                const category = await database.collections.get('categories').find(catId)
                if (category) {
                    await category.destroyPermanently()
                } else {
                    console.error(`Category with ID ${catId} not found.`)
                }
            })
        } catch (error) {
            console.error(`Failed to delete category with ID ${catId}:`, error)
        }
    }
    return (
        <>
            <ThemedView style={mainStyles.row}>
                <ThemedText style={mainStyles.cell}>{parent?.name}</ThemedText>
                <ThemedText style={mainStyles.cell}>{category.name}</ThemedText>
                <Menu edit={edit} destroy={destroy} cat={category.id} />
            </ThemedView>
            <CategoryUpdateModal visible={showUpdateModal} onClose={() => { setShowUpdateModal(false) }} parentOptions={parentOptions} categoryId={category.id} />
        </>
    )
}
const enhanceRow = compose(
    withDatabase,
    //@ts-ignore
    withObservables(['categoryId', 'parentId'], ({ categoryId, parentId, database }: { database: any }) => {
        if (parentId == undefined) {
            return {
                category: database.get('categories').findAndObserve(categoryId),
            }
        } else {
            return {
                category: database.get('categories').findAndObserve(categoryId),
                parent: database.get('categories').findAndObserve(parentId)
            }
        }
    }
    )
)
const EnhancedCategoryRow = enhanceRow(CategoryRow)
export default EnhancedCategoryRow 
