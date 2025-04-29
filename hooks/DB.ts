import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );
    let currentDbVersion = result?.user_version ?? 0;
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
        try {
            await db.execAsync(`PRAGMA journal_mode = 'wal';
                CREATE TABLE categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    parent_id INTEGER DEFAULT NULL
                    );
                CREATE TABLE expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category_id INTEGER NOT NULL,
                    cost NUMERIC(13,0) NOT NULL,
                    desc TEXT DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT NULL
                );`);
            await db.runAsync('INSERT INTO categories (name, parent_id) VALUES (?, ?)', 'test1', 0);
        } catch (error) {
            console.log('Error creating tables:', error);
        }
        currentDbVersion = 1;
    }
    //if (currentDbVersion === 1) {
    //    await db.runAsync('INSERT INTO categories (name, parent_id) VALUES (?, ?)', 'test2', 3);
    //}
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
