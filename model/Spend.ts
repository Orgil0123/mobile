import { Model } from '@nozbe/watermelondb'
import { field, text, date, relation, readonly } from '@nozbe/watermelondb/decorators'
export default class Spend extends Model {
    static table = 'spends'
    static associations = {
        categories: { type: 'belongs_to' as "belongs_to", key: 'category_id' },
    }
    @relation('categories', 'category_id') category
    @readonly @date('created_at') createdAt
    @text('desc') desc
    @field('cost') cost
    @text('category_id') category_id
}
