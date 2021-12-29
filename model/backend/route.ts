export default abstract class Route {
    constructor(public name: string, public path: string[], public resource: string){}

    print() {
        console.log(`Route: ${this.name}`);
        console.log(`Path: ${this.path.join('/')}`);
        console.log(`Resource: ${this.resource}`);
    }
}
