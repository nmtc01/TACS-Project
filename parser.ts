const config = require('./config.json');
import Database from './model/database/database';

function main() {
    console.log("Initializing parser...");
    console.log(config);

    const database = new Database();

    config.database.forEach(table => {
        database.addTable(table.name, table.attributes);
    });

    database.print();

}
main();