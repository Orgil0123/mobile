import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: 'categories',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'parent_id', type: 'string', isOptional: true },
            ]
        }),
        tableSchema({
            name: 'spends',
            columns: [
                { name: 'category_id', type: 'string' },
                { name: 'cost', type: 'number' },
                { name: 'desc', type: 'string' },
                { name: 'created_at', type: 'number' }
            ]
        }),
    ]
})
