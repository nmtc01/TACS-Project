const config = require('./config/config.json');
import Database from './model/database/database';
import { TableJSON } from './model/database/types';


function main() {
    console.log("Initializing parser...");
    console.log(config);

    const database = new Database();

    config.database.forEach((table: TableJSON) => {
        database.addTable(table);
    });
    console.log("TYPEOf")
    database.tables.forEach(element => {
        element.attributes.forEach(att => {
            
        })
    });
    database.print();

}
main();