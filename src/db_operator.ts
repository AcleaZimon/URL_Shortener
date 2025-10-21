import { db, Links, LinksUpdate, NewLinks } from "./database.js";
import { init_db } from "./init_db.js";
let base62 = require("base62/lib/ascii");

export class Operator {
    // constructor() {
    //     this.delete_expired();
    //     setInterval(this.delete_expired, 120000);
    // }

    async create_link(link: NewLinks): Promise<string> {
        const new_link: Links = await db.insertInto('links').values(link)
            .returningAll().executeTakeFirstOrThrow();
        console.log('Created a new link.');
        return this.update_code(new_link.id);
    }

    private async update_code(id: number): Promise<string> {
        const updated_with: LinksUpdate = { short_code: base62.encode(id) };
        await db.updateTable('links').set(updated_with).where('id', '=', id)
            .execute();
        return updated_with.short_code as string;
    }

    // async delete_expired(): Promise<void> {
    //     const now: Date = new Date();
    //     await db.deleteFrom('links').where('expire_at', '<=', now.getTime()).returningAll()
    //         .executeTakeFirst();
    //     console.log('Delete operation was performed.');
    // }

    async find_link(code: string): Promise<string | void> {
        const id: number = base62.decode(code);
        const link: Links | undefined = await db.selectFrom('links')
            .where('id', '=', id).selectAll().executeTakeFirst();
        console.log('Search links (by short code) operation was performed.');
        return link?.long_url;
    }

    async find_by_url(long_url: string): Promise<string | void> {
        const link = await db.selectFrom('links').where(
            'long_url', '=', long_url).selectAll().execute();
        console.log('Search links (by url) operation was performed.');
        if (link.length > 0) {
            return link[0]!.short_code;
        }
    }
}

init_db();
export const operator: Operator = new Operator();