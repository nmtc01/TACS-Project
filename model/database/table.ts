const Attribute = require('./attribute');

class Table {
    name: string;
    attributes: Array<InstanceType<typeof Attribute>>;

    constructor(name: string){
        return new Table(name);
    }

    addAttribute(attribute: Attribute): Table {
        this.attributes.push(attribute);
        return this;
    }

    addAllAttributes(attributes: Array<InstanceType<typeof Attribute>>): Table {
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

export default Table;