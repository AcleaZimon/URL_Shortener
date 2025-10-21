import {
    Generated,
    Insertable,
    Selectable,  
    Updateable,
    Kysely,
    SqliteDialect,
    PostgresDialect,
} from 'kysely';
import SQLite from 'better-sqlite3';
import { Pool } from 'pg';
import { Config } from './config.js'

const config: Config = new Config();

interface Database {
    links: LinksTable
}

interface LinksTable {
    id: Generated<number>
    short_code: string | void
    long_url: string
    expire_at: number | void
}

export type Links = Selectable<LinksTable>
export type NewLinks = Insertable<LinksTable>
export type LinksUpdate = Updateable<LinksTable>

let dialect: PostgresDialect | SqliteDialect;
if (config.enable_postgre) {
    dialect = new PostgresDialect({
        pool: new Pool(config.postgre_config)
    })
} else {
    dialect = new SqliteDialect({ database: new SQLite(config.sqlite_path) })
}

export const db = new Kysely<Database>({ dialect });