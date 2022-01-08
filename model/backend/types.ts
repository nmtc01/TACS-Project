export type type_ = "text" | "number" | "date" | "bool" | "list";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type Operation = {
    method: "Get-one" | "Get-delete-one" | "Get-all" | "Add" | "Update";
    resource: string;
}
