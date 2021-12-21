import Table from './table';
import type { TableJSON } from './types'


export default class Database {
    public tables: Array<Table>;
    constructor() { this.tables = new Array<Table>(); }

    addTable(input: TableJSON): Database {
        try {
            const table = Table.deserialize(input);
            this.tables.push(table);
        } catch (error) {
            console.log("Couldn't parse json file");
        }
        
        return this;
    }

    print() {
        console.log("\n===== Database =====\n");
        this.tables.forEach((table: Table) => {
            table.print();
            console.log('\n');
        });
    }
}
