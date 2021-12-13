import Table from './table';
import Attribute from './attribute';

export default class Database {
    constructor(private tables: Array<Table>) {}

    addTable(name: string, attributes: Array<Attribute>): Database {
        this.tables.push(new Table(name, attributes).addAllAttributes(attributes));
        return this;
    }

    print() {
        console.log(" ===== Database =====\n");
        this.tables.forEach((table: any) => {
            table.print();
        });
    }
}
