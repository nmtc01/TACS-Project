import Attribute from './attribute';
import type { TableJSON, AttributeJSON } from './types'

export default class Table {
    public attributes: Array<Attribute>;

    constructor(public name: string, attributes: Array<Attribute>){ this.attributes = attributes; }

    static deserialize(input: TableJSON): Table {
        const name = input.name;
        const attributes = new Array<Attribute>();

        if (input.attributes) {
            input.attributes.forEach((att: AttributeJSON) => {
                attributes.push(Attribute.deserialize(att))
            });
        }

        return new Table(name, attributes)
    }

    print() {
        console.log(`Table ${this.name}:`)

        this.attributes.forEach((attribute: Attribute) => {
            attribute.print()
        });
    }
}
