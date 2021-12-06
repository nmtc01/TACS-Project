type type_ = "text" | "number" | "date";

class Attribute {
    name: string;
    type: type_;
    references: any;

    print() {
        console.log(`\t${this.name}: ${this.type}` + this.references? `\treferences ${this.references}` : '');
    }
}

export default Attribute;