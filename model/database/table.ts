import Attribute from './attribute';
import type { TableJSON, AttributeJSON } from './types'

export default class Table {
    public attributes: Array<Attribute>;

    constructor(public name: string, attributes: Array<Attribute>){ this.attributes = attributes; }

    static deserialize(input: TableJSON): Table {
        let name = input.name;
        let attributes = new Array<Attribute>();

        input.attributes.forEach((att: AttributeJSON) => {
            attributes.push(Attribute.deserialize(att))
        });

        return new Table(name, attributes)
    }

    addAttribute(attribute: Attribute): Table {
        this.attributes.push(attribute);
        return this;
    }

    addAllAttributes(attributes: Array<Attribute>): Table {
        this.attributes.push(...attributes);
        return this;
    }

    print() {
        console.log(`Table ${this.name}:`)

        this.attributes.forEach((attribute: Attribute) => {
            attribute.print()
        });
    }
}
