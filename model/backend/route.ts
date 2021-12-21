export default abstract class Route {
    constructor(private name: string, private path: string, private resource: string){}

    print() {
        console.log(`Route: ${this.name}`);
        console.log(`Path: ${this.path}`);
        console.log(`Resource: ${this.resource}`);
    }
}
