import { CategoryType, SpendType } from '@/types'
import { Model } from '@nozbe/watermelondb'
import { text, relation } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
    static table = 'categories'
    static associations = {
        spends: { type: "has_many" as "has_many", foreignKey: 'category_id' },
    }
    @text('name') name!: string
    @relation('spends', 'category_id') spends!: SpendType[]
    @relation('categories', 'parent_id') parent!: CategoryType
}
