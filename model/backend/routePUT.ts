import Route from './route';
import type { ElementJSON, RoutePUTJSON } from './types';
import Element from './element';

export default class RoutePUT extends Route {
    constructor(name: string, path: string[], resource: string, private data: Array<Element>){
        super(name, path, resource);
    }

    static deserialize(input: RoutePUTJSON): RoutePUT {
        const name = input.name;
        const path = input.path.split('/');
        const resource = input.resource;
        const data = new Array<Element>();

        if (input.data) {
            input.data.forEach((elem: ElementJSON) => {
                data.push(Element.deserialize(elem))
            });
        }
        return new RoutePUT(name, path, resource, data);
    }

    print() {
        super.print();
        console.log(`Method: PUT`);
        console.log(`Data:`);
        this.data.forEach((elem: Element) => {
            elem.print();
        });
    }
}
