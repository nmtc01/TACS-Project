export type type_ = "text" | "number" | "date" | "bool" | "list";

export type ElementJSON = {
    name: string,
    type: type_,
    required: boolean
}

export type RouteJSON = {
    name: string;
    path: string;
    resource: string;
}

export type RouteGETJSON = RouteJSON & {
    method: "GET";
}

export type RoutePOSTJSON = RouteJSON & {
    method: "POST";
    data: Array<ElementJSON>;
}

export type RoutePUTJSON = RouteJSON & {
    method: "PUT";
    data: Array<ElementJSON>;
}

export type RouteDELETEJSON = RouteJSON & {
    method: "DELETE";
}

export type RouteTypeJSON = RouteGETJSON | RoutePOSTJSON | RoutePUTJSON | RouteDELETEJSON;

export type RoutesJSON = Array<RouteTypeJSON>;

// New types

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type Operation = {
    method: "Get-one" | "Get-delete-one" | "Get-all" | "Add" | "Update";
    resource: string;
}
