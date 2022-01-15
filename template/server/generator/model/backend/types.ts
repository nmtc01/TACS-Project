export type type_ = "text" | "number" | "date" | "bool" | "list";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type MethodType = "Get-one" | "Delete" | "Get-all" | "Add" | "Update";

export type Operation = {
    method: MethodType;
    resource: string;
}
