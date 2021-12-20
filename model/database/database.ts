import Table from './table';
import Attribute from './attribute';

export default class Database {
    private tables: Array<Table>;
    constructor() { this.tables = new Array<Table>(); }

    addTable(name: string, attributes: Array<Attribute>): Database {
        let att = new Array<Attribute>();
       /*  attributes.forEach(jsonAttribute => {
            if (jsonAttribute.hasOwnProperty('name') && jsonAttribute.hasOwnProperty('type') && jsonAttribute.hasOwnProperty('references')) {
                att.push(new Attribute(, jsonAttribute.type, jsonAttribute.references))
            } else {
                throw new Error("Attribute on ");
            }
        }); */
        this.tables.push(new Table(name).addAllAttributes(attributes));
        return this;
    }

    print() {
        console.log(" ===== Database =====\n");
        this.tables.forEach((table: Table) => {
            table.print();
        });
    }
}
