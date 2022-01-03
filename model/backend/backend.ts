import Route from './route'
import { Operation, RouteTypeJSON } from './types';

export default class Backend {
    public routes: Array<Route>;
    constructor() { this.routes = new Array<Route>(); }

    addRoute(operation: Operation): Backend {
        switch(operation.method) {
            case "Get-delete-one":
                this.routes.push(new Route("DELETE", [""], operation.resource)); // Method, path, resource
            case "Get-one":
                this.routes.push(new Route("GET", [""], operation.resource)); // Method, path, resource
                break;
            case "Get-all":
                this.routes.push(new Route("GET", [""], operation.resource)); // Method, path, resource
                break;
            case "Add":
                this.routes.push(new Route("POST", [""], operation.resource, "")); // Method, path, resource, data?? check_resource
                break;
            case "Update":
                this.routes.push(new Route("PUT", [""], operation.resource, "")); // Method, path, resource, data?? check_resource
                break;
        }
        return this;
    }

    print() {
        console.log("\n===== Backend =====\n");
        this.routes.forEach((route: Route) => {
            route.print();
            console.log('\n');
        });
    }
}

