import { Method } from "./types";
import Element from "./element"

export default class Route {
    constructor(public method: Method, public path: string[], public resource: string, public data?: Array<Element>) { }

    print() {
        console.log(`Method: ${this.method}`);
        console.log(`Path: ${this.path.join('/')}`);
        console.log(`Resource: ${this.resource}`);
    }
}
