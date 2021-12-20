import { Route } from './route'
import type { RouteJSON } from './types'

export default class Backend {
    public routes: Array<Route>;

    constructor() { this.routes = new Array<Route>(); }

    addRoute(input: RouteJSON): Backend {
        let route: Route; 
        try {
            //table = Route.deserialize(input); TODO
            this.routes.push(route);
        } catch (error) {
            console.log("Couldn't parse json file");
        }
        
        return this;
    }
}

