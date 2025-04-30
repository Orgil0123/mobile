import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
        {
            // ⚠️ Set this to a number one larger than the current schema version
            toVersion: 2,
            steps: [
                // See "Migrations API" for more details
                createTable({
                    name: 'categories',
                    columns: [
                        { name: 'name', type: 'string' },
                        { name: 'parent_id', type: 'string', isOptional: true },
                    ]
                }),
                createTable({
                    name: 'spends',
                    columns: [
                        { name: 'category_id', type: 'string' },
                        { name: 'cost', type: 'number' },
                        { name: 'desc', type: 'string' },
                        { name: 'created_at', type: 'number' }
                    ]
                }),
            ],
        },
    ],
})
