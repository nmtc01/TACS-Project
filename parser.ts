const fse = require('fs-extra');
const config = require('./config/config.json');
import Database from './model/database/database';
import { TableJSON } from './model/database/types';
import Backend from './model/backend/backend';
import { RoutesJSON, RouteJSON } from './model/backend/types';


function main() {
    console.log("Initializing parser...");
    console.log(config);

    // Parse database
    const database = new Database();
    if (!config.database) {
        console.warn("Missing database key!");
        return;
    }
    config.database.forEach((table: TableJSON) => {
        database.addTable(table);
    });

    // Parse backend
    const backend = new Backend();
    if (!config.backend) {
        console.warn("Missing backend key!");
        return;
    }
    if (!config.backend.routes) {
        console.warn("Missing routes key!");
        return;
    }
    const routes: RoutesJSON = config.backend.routes;
    routes.forEach((route: RouteJSON) => {
        backend.addRoute(route);
    });

    database.print();
    backend.print();
}

/**
 * Makes a copy of the project template.
 */
function copyTemplate() {
    const timestamp = new Date().toLocaleString().replace(/\//g, '-').replace(':', 'h').replace(':', 'm');
    
    const sourceDirectory = `template`;
    const destinationDirectory = `output/${timestamp}`;

    try {
        fse.copySync(sourceDirectory, destinationDirectory);
    } catch (error) {
        console.error(error);
    }
}

copyTemplate();
main();