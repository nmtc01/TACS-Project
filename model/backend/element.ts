import type { ElementJSON, type_ } from './types'

export default class Element {
    constructor(public name: string, public type: type_, public required: boolean) {}
    
    static deserialize(input: ElementJSON): Element {
        return new Element(input.name, input.type, input.required);
    }

    print() {
        console.log(`\t${this.name}: ${this.type}` + `\trequired: ${this.required}`);
    }
}