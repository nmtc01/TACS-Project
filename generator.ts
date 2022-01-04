const fs = require('fs')
const fse = require('fs-extra');
import Database from './model/database/database';
import Backend from './model/backend/backend';
import generateModel from './generation/model';
import generateRoutes from './generation/routes';
import Route from './model/backend/route';

export default class Generator {
    private folderPath: string;

    constructor(private database: Database, private backend: Backend) {
        this.folderPath = this.createFolderPath();
        database.print();
        backend.print();

        this.copyTemplate();
        this.generateCode();
    }

    createFolderPath() {
        const timestamp = new Date().toLocaleString().replace(/\//g, '-').replace(':', 'h').replace(':', 'm');
        return `output/${timestamp}`;
    }

    copyTemplate() {
        const sourceDirectory = `template`;

        try {
            fse.copySync(sourceDirectory, this.folderPath);
        } catch (error) {
            console.error(error);
        }
    }

    generateCode() {
        this.generateModels();
        this.generateRoutes();
    }

    generateModels() {
        this.database.tables.forEach((table) => {
            const generatedCode = generateModel(table);
            
            fs.mkdir(`${this.folderPath}/server/models`, { recursive: true }, (err: string) => {
                if (err) throw err;
              });

            fs.writeFile(`${this.folderPath}/server/models/${table.name}.js`, generatedCode, (err: string) => {
                if (err) {
                    console.error(err)
                    return;
                }
            });
        })
    }

    generateRoutes() {

        interface RouteMap {
            [key: string]: Array<Route>
        }

        const routeGroups: RouteMap = {};
        
        this.backend.routes.forEach((route: Route) => {
            const resource = route.resource;
            if (!routeGroups[resource])
                routeGroups[resource] = [];
            routeGroups[resource].push(route);
        });

        for (const resource in routeGroups) {

            const generatedCode = generateRoutes(routeGroups[resource]);
              
            fs.writeFile(`${this.folderPath}/server/routes/${resource}.js`, generatedCode, (err: string) => {
                if (err) {
                    console.error(err)
                    return;
                }
            });
        }
    }
}