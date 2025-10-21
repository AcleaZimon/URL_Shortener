import { db } from './database.js';

export async function init_db(): Promise<void> {
    console.log("Checking the database...");
    await db.schema.createTable('links').ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('short_code', 'text', (col) => col.unique())
        .addColumn('long_url', 'text', (col) => col.notNull())
        .addColumn('expire_at', 'integer').execute();
    console.log("Database OKAY.");
}