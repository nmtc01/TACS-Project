import Route from './route'
import RouteGET from './routeGET';
import RoutePOST from './routePOST';
import RoutePUT from './routePUT';
import RouteDELETE from './routeDELETE';

export default class Backend {
    private routes: Array<Route>;
    constructor() { this.routes = new Array<Route>(); }

    addRoute(input: any): Backend {
        let route: Route;
        try {
            switch (input.method) {
                case "GET":
                    route = RouteGET.deserialize(input);
                    break;
                case "POST":
                    route = RoutePOST.deserialize(input);
                    break;
                case "PUT":
                    route = RoutePUT.deserialize(input);
                    break;
                case "DELETE":
                    route = RouteDELETE.deserialize(input);
                    break;
                default:
                    throw new Error("Invalid Method");
            }
            this.routes.push(route);
        }
        catch (error) {
            console.log(error);
            console.log("Couldn't parse json file");
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

