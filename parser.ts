const fse = require('fs-extra');
const config = require('./config/config.json');
import Database from './model/database/database';
import { TableJSON } from './model/database/types';
import Backend from './model/backend/backend';
import { RoutesJSON, RouteTypeJSON } from './model/backend/types';
import Generator from './generator';


function main() {
    console.log("Initializing parser...");

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
    routes.forEach((route: RouteTypeJSON) => {
        backend.addRoute(route);
    });

    new Generator(database, backend);
}

/**
 * Makes a copy of the project template.
 */


//copyTemplate();
main();