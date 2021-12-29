export type type_ = "text" | "number" | "date";

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
