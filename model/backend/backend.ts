import Table from '../database/table';
import Route from './route'
import Element from './element'
import { Operation } from './types';

export default class Backend {
    public routes: Array<Route>;
    constructor() { this.routes = new Array<Route>(); }

    addRoute(operation: Operation, resource: Table): Backend {

        const resourceName = operation.resource;
        const path = Array<string>();
        path.push(resourceName);

        switch (operation.method) {
            case "Get-delete-one":
                path.push(':id');
                this.routes.push(new Route("DELETE", path, resourceName));
                this.routes.push(new Route("GET", path, resourceName));
                break;
            case "Get-one":
                path.push(':id');
                this.routes.push(new Route("GET", path, resourceName));
                break;
            case "Get-all":
                this.routes.push(new Route("GET", path, resourceName));
                break;
            case "Add":
                this.routes.push(new Route("POST", path, resourceName, Backend.tableToElements(resource)));
                break;
            case "Update":
                path.push(':id');
                this.routes.push(new Route("PUT", path, resourceName, Backend.tableToElements(resource)));
                break;
        }

        return this;
    }

    static tableToElements(table: Table): Array<Element> {
        const elements = Array<Element>();
        table.attributes.forEach((attribute) => {
            const element = new Element(attribute.name, attribute.type, attribute.required)
            elements.push(element)
        });
        return elements;
    }

    print() {
        console.log("\n===== Backend =====\n");
        this.routes.forEach((route: Route) => {
            route.print();
            console.log('\n');
        });
    }
}

