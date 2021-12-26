import type { AttributeJSON, type_ } from './types'

export default class Attribute {
    constructor(public name: string, public type: type_, public references?: string) {}
    
    static deserialize(input: AttributeJSON): Attribute {
        return new Attribute(input.name, input.type, input.references);
    }

    print() {
        console.log(`\t${this.name}: ${this.type}` + (this.references? `\treferences ${this.references}` : ''));
    }
}