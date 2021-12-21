import Route from './route';
import type { RouteDELETEJSON } from './types'

export default class RouteDELETE extends Route {
    constructor(name: string, path: string, resource: string){
        super(name, path, resource);
    }

    static deserialize(input: RouteDELETEJSON): RouteDELETE {
        const name = input.name;
        const path = input.path;
        const resource = input.resource;
        return new RouteDELETE(name, path, resource);
    }

    print() {
        super.print();
        console.log(`Method: DELETE`);
    }
}
