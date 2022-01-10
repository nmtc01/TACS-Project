export interface Resource {
    name: string;
}

export type Attribute = {
    name: string;
    type: "text" | "number" | "date" | "bool" | "list";
    required?: boolean;
    references?: string;
}