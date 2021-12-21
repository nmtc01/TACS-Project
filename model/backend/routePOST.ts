import Route from './route';
import type { ElementJSON, RoutePOSTJSON } from './types';
import Element from './element';

export default class RoutePOST extends Route {
    constructor(name: string, path: string, resource: string, private data: Array<Element>){
        super(name, path, resource);
    }

    static deserialize(input: RoutePOSTJSON): RoutePOST {
        const name = input.name;
        const path = input.path;
        const resource = input.resource;
        const data = new Array<Element>();

        if (input.data) {
            input.data.forEach((elem: ElementJSON) => {
                data.push(Element.deserialize(elem))
            });
        }
        return new RoutePOST(name, path, resource, data);
    }

    print() {
        super.print();
        console.log(`Method: POST`);
        console.log(`Data:`);
        this.data.forEach((elem: Element) => {
            elem.print();
        });
    }
}
