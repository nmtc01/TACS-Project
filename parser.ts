const config = require('./config.json');
import Database from './model/database/database';
import Table from './model/database/table';


function main() {
    console.log("Initializing parser...");
    console.log(config);

    let tables = new Array<Table>();
    const database = new Database(tables);

    config.database.forEach((table: any) => {
        database.addTable(table.name, table.attributes);
    });

}
main();