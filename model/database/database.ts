const Table = require('./table');
const Attribute = require('./attribute');

module.exports = class Database {
    tables: Array<InstanceType<typeof Table>>;
    
    constructor() {
        this.tables = new Array<InstanceType<typeof Table>>();
        return new Database();
    }

    addTable(name: string, attributes: Array<InstanceType<typeof Attribute>>): Database {
        this.tables.push(new Table(name).addAllAttributes(attributes));
        return this;
    }

    print() {
        console.log(" ===== Database =====\n")
        this.tables.forEach((table:any) => {
            table.print();
        });
    }
}
