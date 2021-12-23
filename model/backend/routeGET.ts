import Route from './route';
import type { RouteGETJSON } from './types'

export default class RouteGET extends Route {
    constructor(name: string, path: string, resource: string){
        super(name, path, resource);
    }

    static deserialize(input: RouteGETJSON): RouteGET {
        const name = input.name;
        const path = input.path;
        const resource = input.resource;
        return new RouteGET(name, path, resource);
    }

    print() {
        super.print();
        console.log(`Method: GET`);
    }
}
