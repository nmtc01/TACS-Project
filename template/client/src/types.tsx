export interface FullResource {
    name: string;
    attributes: Array<Attribute>;
    editable?: boolean;
}

export interface Resource {
    name: string;
}

type AttributeType = "text" | "number" | "date" | "bool";

export type Attribute = {
    name: string;
    type?: AttributeType,
    required?: boolean;
    references?: string;
    editable?: boolean;
}

export interface InsertOrUpdate {
    type: "insert" | "update";
    resource: Resource; 
    _id?: string;
}

export type MethodType = "Get-one" | "Delete" | "Get-all" | "Add" | "Update";

export type Operation = {
    method: MethodType;
    resource: string;
}

export type RouteType = {
    path: string,
    exact: boolean,
    name: string,
    component: React.LazyExoticComponent<(resource: Resource) => JSX.Element>,
}

export type ResourceParams = {
    id: string
}