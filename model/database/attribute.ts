import type { AttributeJSON, type_ } from './types'

export default class Attribute {
    constructor(public name: string, public type: type_, public required=false, public references?: string) {}

    static deserialize(input: AttributeJSON): Attribute {
        if (input.references && input.type) 
            throw new Error("Error in attribute - type and references at the same time");
        return new Attribute(input.name, input.type, input.required ? input.required : false, input.references);
    }

    print() {
        console.log(`\t${this.name}: ${this.type? this.type : ''} ${this.references? `\treferences ${this.references}` : ''}`);
    }
}