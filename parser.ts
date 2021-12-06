const config = require('./config.json');
const Database = require('./model/database/database')

function main() {
    console.log("Initializing parser...")
    console.log(config)


    const database = new Database()

    config.database.forEach((table: any) => {
        database.addTable(table.name, table.attributes)
    });

}
main();