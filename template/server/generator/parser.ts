const config = require('./config/config.json');
import Database from './model/database/database';
import { TableJSON } from './model/database/types';
import Backend from './model/backend/backend';
import { Operation } from './model/backend/types';
import Generator from './generator';

function main() {
    console.log("Initializing parser...");

    // Parse database
    const database = new Database();
    if (!config.resources) {
        console.warn("Missing resources key!");
        return;
    }
    config.resources.forEach((table: TableJSON) => {
        database.addTable(table);
    });

    // Parse backend
    const backend = new Backend();
    if (!config.website) {
        console.warn("Missing website key!");
        return;
    }
    const pages = config.website.pages;
    if (!pages) {
        console.warn("Missing pages key on website!");
        return;
    }

    pages.forEach((page: Operation) => {
        const operation: Operation = {
            method: page.method,
            resource: page.resource
        }

        const table = database.tables[page.resource];

        backend.addRoute(operation, table);
    });

    new Generator(database, backend);
}

main();