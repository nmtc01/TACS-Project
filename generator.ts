const fs = require('fs')
const fse = require('fs-extra');
import Database from './model/database/database';
import Backend from './model/backend/backend';
import generateModel from './model/backend/templates/model.template';
import generateRoutes from './model/backend/templates/routes.template';

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
        // TODO
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
        // TODO - generateRoutes receber todas as rotas
        this.backend.routes.forEach((route) => {
            generateRoutes(route);
        })
    }
}