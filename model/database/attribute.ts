type type_ = "text" | "number" | "date";

export default class Attribute {
    constructor(private name: string, private type: type_, private references?: number) {}

    print() {
        console.log(`\t${this.name}: ${this.type}` + this.references? `\treferences ${this.references}` : '');
    }
}