export interface Resource {
    name: string;
}

export type Attribute = {
    name: string;
    type: "text" | "number" | "date" | "bool";
    required?: boolean;
    references?: string;
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