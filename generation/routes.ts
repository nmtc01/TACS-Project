import Route from "../model/backend/route"
import { toUpper, toLower } from "../utils/utils"
import Element from "../model/backend/element"

export default function generateRoutes(routes: Array<Route>): string {
    let code = "";

    if (routes.length < 1) {
        return "";
    }

    code += generateRoutesHeader(routes[0].resource);
    code += "\n\n";

    routes.forEach((route) => {
        switch (route.method) {
            case "GET":
                code += generateGetRoute(route);
                break;
            case "DELETE":
                code += generateDeleteRoute(route);
                break;
            case "POST":
                code += generatePutOrPostRoute(route, 'POST');
                break;
            case "PUT":
                code += generatePutOrPostRoute(route, 'PUT');
                break;
            default:
                break;
        }
        code += '\n\n';
    })

    code += generateRoutesFooter();

    return code;
}

function generateRoutesHeader(resource: string): string {
    return `const express = require('express');
const router = express.Router();

const { ${toUpper(resource)} } = require('../models/${toLower(resource)}');`
}

function generateRoutesFooter(): string {
    return `module.exports = router;`
}

function generateGetRoute(route: Route): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    let finalPath = '/';

    if (route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    return (
        `router.get('${finalPath}', async function(req, res) {
    try {
        res.send(await ${toUpper(route.resource)}.find${variables.length > 0 ? 'One' : ''}({${variables}}));
    } catch (err) {
        console.log(err);
    }
});`
    );
}

function generateDeleteRoute(route: Route): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });
    let finalPath = '/';

    if (route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    return (
        `router.delete('${finalPath}', async function(req, res) {
    try {
        const resource = await ${toUpper(route.resource)}.deleteOne({ 'id': req.params.id });
        return res.send("Deleted successfully: " + resource);
    }
    catch (err) {
        console.log(err);
    }
});`
    );
}

function generatePutOrPostRoute(route: Route, method: 'PUT' | 'POST'): string {
    const variables: string[] = [];
    route.path.forEach((item) => {
        const variable = item.slice(1);
        if (item.charAt(0) === ":")
            variables.push(`'${variable}': req.params.${variable}`);
    });

    let finalPath = '/';

    if (route.path.length > 1) {
        finalPath = `/${route.path.slice(1).join('/')}`
    }

    if (!route.data) {
        throw new Error(`Property data is mandatory for a ${method} route!`)
    }

    const resourceDataStatements: Array<string> = route.data.map((element: Element) => {
        return `${element.name}: req.body.${element.name}`;
    })

    return (
        `router.${method.toLowerCase()}('${finalPath}', function (req, res) {
    const ${route.resource}_data = {
        ${resourceDataStatements.join(',\n\t\t')}
    };
  
    ${toUpper(route.resource)}.create(${route.resource}_data, function (err, resource) {
        if (err) {
            console.log(err);
            return res.send({ message: '500 - Server Error', errors: [] });
        }
    
        return res.send("Successfully ${method == 'POST' ? 'added' : 'updated'} new ${toUpper(route.resource)}!");
    });
});`
    );
}