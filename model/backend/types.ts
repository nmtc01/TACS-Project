export type path = `/${string}`

export type element = {
    name: string,
    type: string,
    required: boolean
}

export type RouteJSON = {
    name: string;
    path: path;
    resource: string;
}

export type RouteGETJSON = RouteJSON & {
    method: "GET";
}

export type RoutePOSTJSON = RouteJSON & {
    method: "POST";
    data: element[];
}

export type RoutePUTJSON = RouteJSON & {
    method: "PUT";
    data: element[];
}

export type RouteDELETEJSON = RouteJSON & {
  method: "DELETE";
}

export type RoutesJSON = {
  routes: Array<RouteGETJSON | RoutePOSTJSON | RoutePUTJSON | RouteDELETEJSON>;
}
