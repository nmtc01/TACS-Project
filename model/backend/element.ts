import type { type_ } from './types'

export default class Element {
    constructor(public name: string, public type: type_, public required: boolean) {}

    print() {
        console.log(`\t${this.name}: ${this.type}` + `\trequired: ${this.required}`);
    }
}