import Attribute from './attribute';

export default class Table {
    constructor(private name: string, private attributes: Array<Attribute>){}

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
        this.attributes.forEach(attribute => {
            attribute.print()
        });
    }
}
