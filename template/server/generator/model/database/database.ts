import Table from './table';
import type { TableJSON } from './types'

export default class Database {
    public tables: { [key: string]: Table; };
    constructor() { this.tables = {} }

    addTable(input: TableJSON): Database {
        try {
            const table = Table.deserialize(input);
            this.tables[table.name] = table;
        } catch (error) {
            console.log("Couldn't parse json file");
        }

        return this;
    }

    print() {
        console.log("\n===== Database =====\n");
        for (let tableName in this.tables) {
            this.tables[tableName].print();
            console.log('\n');
        }
    }
}
