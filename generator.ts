const fs = require('fs')
const fse = require('fs-extra');
import Database from './model/database/database';
import Backend from './model/backend/backend';
import generateModel from './generation/model';
import generateRoutes, { generateAttributesRoute, generateConfigRoute, generateResourcesRoute, generateHasRoutes } from './generation/routes';
import Route from './model/backend/route';
import { toLower } from './utils/utils';

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
        for (let tableName in this.database.tables) {
            const generatedCode = generateModel(this.database.tables[tableName]);

            fs.mkdir(`${this.folderPath}/server/models`, { recursive: true }, (err: string) => {
                if (err) throw err;
            });

            fs.writeFile(`${this.folderPath}/server/models/${tableName}.js`, generatedCode, (err: string) => {
                if (err) {
                    console.error(err)
                    return;
                }
            });
        }
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

        const routeImports = Array<string>();
        const routeUses = Array<string>();

        let indexRoutes = ""
        const configCode = generateConfigRoute();
        const resourcesCode = generateResourcesRoute();
        const attributesCode = generateAttributesRoute();
        const hasMethodRouteCode = generateHasRoutes();

        indexRoutes = configCode + resourcesCode + attributesCode + hasMethodRouteCode;
        fs.appendFile(`${this.folderPath}/server/routes/index.js`, indexRoutes, function (err: string) {
            if (err) {
                console.error(err)
                return;
            }
        });

        for (const resource in routeGroups) {

            const generatedCode = generateRoutes(routeGroups[resource]);

            fs.writeFile(`${this.folderPath}/server/routes/${resource}.js`, generatedCode, (err: string) => {
                if (err) {
                    console.error(err)
                    return;
                }
            });

            const resourceName = toLower(resource);

            routeImports.push(`const ${resourceName}Router = require('./routes/${resourceName}');`)
            routeUses.push(`app.use('/${resourceName}', ${resourceName}Router);`)
        }

        const appJsPath = `${this.folderPath}/server/app.js`

        let fileData = fs.readFileSync(appJsPath).toString();
        fileData = fileData.replace(/\/\/ROUTE_IMPORTS/g, routeImports.join('\n'));
        fileData = fileData.replace(/\/\/ROUTE_USES/g, routeUses.join('\n'));

        fs.writeFile(appJsPath, fileData, function (err: string) {
            if (err) return console.log(err);
        });
    }
}