import { Model } from '@nozbe/watermelondb'
import { text, relation } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
    static table = 'categories'
    static associations = {
        spends: { type: "has_many" as "has_many", foreignKey: 'category_id' },
    }
    @text('name') desc
    @relation('spends', 'category_id') spends
}
